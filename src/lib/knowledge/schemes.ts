/**
 * Udaan AI — Government Schemes Knowledge Base
 * Curated list of major Indian government schemes for students, youth, and job seekers.
 * Data is structured for AI context injection and UI rendering.
 */

export interface Scheme {
  id: string;
  name: string;
  ministry: string;
  category: "scholarship" | "skill" | "employment" | "startup" | "education" | "women" | "rural" | "housing" | "health";
  beneficiaries: string[];  // who it targets
  eligibility: {
    education?: string[];
    category?: string[];     // SC/ST/OBC/EWS/General
    income?: string;         // income limit
    age?: string;
    states?: string[];       // if state-specific, otherwise empty = all India
    other?: string[];
  };
  benefits: string;          // what the scheme provides
  amount?: string;           // monetary benefit if any
  applicationProcess: string;
  portal: string;            // official apply URL
  deadline: string;          // "Ongoing" or specific date
  tags: string[];
}

export const GOVERNMENT_SCHEMES: Scheme[] = [
  // ═══════════════════════════════════════════
  // SCHOLARSHIP SCHEMES
  // ═══════════════════════════════════════════
  {
    id: "nsp-central-sector",
    name: "Central Sector Scholarship Scheme for College & University Students",
    ministry: "Ministry of Education",
    category: "scholarship",
    beneficiaries: ["12th pass students", "College students", "Merit students"],
    eligibility: {
      education: ["12th passed", "Pursuing undergraduate"],
      income: "Family income below ₹8 lakh per annum",
      other: ["Top 20 percentile in Class 12 board exams", "Not availing any other scholarship"],
    },
    benefits: "₹10,000/year for first 3 years of undergraduate studies, ₹20,000/year for 4th and 5th year (professional courses)",
    amount: "₹10,000 – ₹20,000 per year",
    applicationProcess: "Apply online at National Scholarships Portal (scholarships.gov.in) after Class 12 results",
    portal: "https://scholarships.gov.in",
    deadline: "October–November each year (post board results)",
    tags: ["scholarship", "merit", "college", "undergraduate"],
  },
  {
    id: "nsp-post-matric-sc",
    name: "Post Matric Scholarship for SC Students",
    ministry: "Ministry of Social Justice & Empowerment",
    category: "scholarship",
    beneficiaries: ["SC students", "Post-10th students"],
    eligibility: {
      education: ["10th passed", "Pursuing 11th onwards"],
      category: ["SC"],
      income: "Family income below ₹2.5 lakh per annum",
    },
    benefits: "Covers tuition fees, maintenance allowance, book allowance, and study tour charges",
    amount: "Up to ₹12,000/year maintenance + full tuition fee",
    applicationProcess: "Apply via National Scholarships Portal with caste certificate and income certificate",
    portal: "https://scholarships.gov.in",
    deadline: "October each year",
    tags: ["scholarship", "SC", "post-matric", "social justice"],
  },
  {
    id: "nsp-post-matric-obc",
    name: "Post Matric Scholarship for OBC Students",
    ministry: "Ministry of Social Justice & Empowerment",
    category: "scholarship",
    beneficiaries: ["OBC students"],
    eligibility: {
      education: ["10th passed"],
      category: ["OBC"],
      income: "Family income below ₹1 lakh per annum",
    },
    benefits: "Maintenance allowance + reimbursement of tuition fees",
    amount: "₹300 – ₹1,500/month maintenance allowance",
    applicationProcess: "Apply via scholarships.gov.in with OBC certificate and income proof",
    portal: "https://scholarships.gov.in",
    deadline: "October–November each year",
    tags: ["scholarship", "OBC", "post-matric"],
  },
  {
    id: "pmss",
    name: "Prime Minister's Scholarship Scheme (PMSS)",
    ministry: "Ministry of Home Affairs / Ministry of Defence",
    category: "scholarship",
    beneficiaries: ["Children of ex-servicemen", "Children of police personnel"],
    eligibility: {
      education: ["12th passed", "Pursuing professional degree"],
      other: ["Child/widow of ex-Army/Navy/Air Force/Police personnel", "Minimum 60% marks in qualifying exam"],
    },
    benefits: "₹2,000–₹2,500/month for up to 5 years of professional education",
    amount: "₹2,000/month (girls), ₹2,500/month (boys)",
    applicationProcess: "Apply via Kendriya Sainik Board (ksb.gov.in) portal",
    portal: "https://ksb.gov.in",
    deadline: "October each year",
    tags: ["scholarship", "defence", "professional", "ex-servicemen"],
  },
  {
    id: "begum-hazrat-mahal",
    name: "Begum Hazrat Mahal National Scholarship",
    ministry: "Maulana Azad Education Foundation",
    category: "scholarship",
    beneficiaries: ["Minority girl students"],
    eligibility: {
      education: ["Class 9 to 12"],
      category: ["Muslim", "Christian", "Sikh", "Buddhist", "Parsi", "Jain"],
      income: "Family income below ₹2 lakh per annum",
      other: ["Girls only", "Minimum 50% marks"],
    },
    benefits: "₹5,000 (class 9-10), ₹6,000 (class 11-12)",
    amount: "₹5,000 – ₹6,000",
    applicationProcess: "Apply via scholarships.gov.in — Maulana Azad Foundation portal",
    portal: "https://maef.nic.in",
    deadline: "October–November each year",
    tags: ["scholarship", "minority", "girl", "school"],
  },
  {
    id: "ishan-uday",
    name: "Ishan Uday — Special Scholarship Scheme for North East",
    ministry: "University Grants Commission (UGC)",
    category: "scholarship",
    beneficiaries: ["Students from North East India"],
    eligibility: {
      education: ["Undergraduate college students"],
      states: ["Arunachal Pradesh", "Assam", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Sikkim", "Tripura"],
      income: "Family income below ₹4.5 lakh per annum",
    },
    benefits: "₹5,400/month for general courses, ₹7,800/month for technical/medical courses",
    amount: "₹5,400 – ₹7,800/month",
    applicationProcess: "Apply via UGC portal or National Scholarships Portal",
    portal: "https://scholarships.gov.in",
    deadline: "December each year",
    tags: ["scholarship", "north-east", "undergraduate", "UGC"],
  },

  // ═══════════════════════════════════════════
  // SKILL DEVELOPMENT SCHEMES
  // ═══════════════════════════════════════════
  {
    id: "pmkvy",
    name: "Pradhan Mantri Kaushal Vikas Yojana (PMKVY)",
    ministry: "Ministry of Skill Development & Entrepreneurship",
    category: "skill",
    beneficiaries: ["Youth", "School dropouts", "Unemployed"],
    eligibility: {
      age: "15–45 years",
      other: ["Indian citizen", "No minimum education required for most courses"],
    },
    benefits: "Free skill training in 200+ job roles across IT, electronics, healthcare, construction, etc. + certification + placement assistance + monetary reward up to ₹8,000",
    amount: "Free training + ₹8,000 reward on certification",
    applicationProcess: "Register at pmkvyofficial.org or visit nearest Skill India training center",
    portal: "https://pmkvyofficial.org",
    deadline: "Ongoing",
    tags: ["skill", "training", "youth", "free", "placement"],
  },
  {
    id: "skill-india-digital",
    name: "Skill India Digital Hub",
    ministry: "Ministry of Skill Development & Entrepreneurship",
    category: "skill",
    beneficiaries: ["Youth", "Students", "Job seekers"],
    eligibility: {
      other: ["Any Indian citizen", "No minimum qualification"],
    },
    benefits: "Free online courses in AI, coding, digital marketing, cloud computing, cybersecurity, and 500+ skills",
    applicationProcess: "Register at skillindiadigital.gov.in — fully online",
    portal: "https://skillindiadigital.gov.in",
    deadline: "Ongoing",
    tags: ["skill", "online", "free", "digital", "AI", "coding"],
  },
  {
    id: "naps",
    name: "National Apprenticeship Promotion Scheme (NAPS)",
    ministry: "Ministry of Skill Development & Entrepreneurship",
    category: "skill",
    beneficiaries: ["Students", "Graduates", "Diploma holders"],
    eligibility: {
      education: ["8th pass minimum"],
      age: "14–35 years",
    },
    benefits: "Earn while you learn — apprenticeship stipend (government shares 25% of ₹1,500 minimum stipend) with industry companies",
    amount: "Minimum ₹1,500–₹9,000/month stipend",
    applicationProcess: "Apply via apprenticeshipindia.org — find openings and apply to companies",
    portal: "https://apprenticeshipindia.org",
    deadline: "Ongoing",
    tags: ["apprenticeship", "earn", "learn", "industry"],
  },
  {
    id: "nats",
    name: "National Apprenticeship Training Scheme (NATS)",
    ministry: "Ministry of Education / AICTE",
    category: "skill",
    beneficiaries: ["Engineering graduates", "Diploma holders", "Technical graduates"],
    eligibility: {
      education: ["B.Tech / BE", "Diploma in Engineering", "BSc graduates"],
    },
    benefits: "1-year paid apprenticeship with PSUs and private companies. Government pays 50% of stipend (max ₹4,984/month)",
    amount: "₹9,000–₹12,000/month (government + company combined)",
    applicationProcess: "Register at nats.education.gov.in, upload resume and apply to available trainings",
    portal: "https://nats.education.gov.in",
    deadline: "Ongoing",
    tags: ["apprenticeship", "engineering", "technical", "PSU"],
  },

  // ═══════════════════════════════════════════
  // EMPLOYMENT SCHEMES
  // ═══════════════════════════════════════════
  {
    id: "ncs-portal",
    name: "National Career Service (NCS) Portal",
    ministry: "Ministry of Labour & Employment",
    category: "employment",
    beneficiaries: ["Job seekers", "Freshers", "Experienced professionals"],
    eligibility: {
      other: ["Any Indian citizen looking for employment"],
    },
    benefits: "Access to 5 lakh+ job listings, free resume builder, career counselling, job fairs, skill courses",
    applicationProcess: "Register free at ncs.gov.in, create your profile and apply to jobs",
    portal: "https://ncs.gov.in",
    deadline: "Ongoing",
    tags: ["jobs", "employment", "career", "free", "job-fair"],
  },
  {
    id: "pmegp",
    name: "Prime Minister's Employment Generation Programme (PMEGP)",
    ministry: "Ministry of MSME",
    category: "employment",
    beneficiaries: ["Entrepreneurs", "Youth", "Self-employed"],
    eligibility: {
      age: "18+ years",
      education: ["8th pass for projects above ₹10 lakh"],
      other: ["New business (not existing)"],
    },
    benefits: "Subsidy on bank loans for starting a new business: 15–35% of project cost (up to ₹50 lakh for manufacturing, ₹20 lakh for services)",
    amount: "15%–35% government subsidy on project cost",
    applicationProcess: "Apply via kviconline.gov.in or nearest KVIC/KVIB office",
    portal: "https://kviconline.gov.in/pmegp",
    deadline: "Ongoing",
    tags: ["entrepreneurship", "startup", "self-employment", "loan", "subsidy"],
  },

  // ═══════════════════════════════════════════
  // STARTUP & ENTREPRENEURSHIP
  // ═══════════════════════════════════════════
  {
    id: "startup-india",
    name: "Startup India Initiative",
    ministry: "Ministry of Commerce & Industry",
    category: "startup",
    beneficiaries: ["Entrepreneurs", "Innovators", "Tech startups"],
    eligibility: {
      other: ["DPIIT-recognized startup", "Less than 10 years old", "Annual turnover below ₹100 crore"],
    },
    benefits: "Tax exemptions, funding access, mentorship, incubation support, patent fee rebate, government tender exemption",
    applicationProcess: "Register at startupindia.gov.in and apply for DPIIT recognition",
    portal: "https://startupindia.gov.in",
    deadline: "Ongoing",
    tags: ["startup", "entrepreneurship", "tax", "funding"],
  },
  {
    id: "mudra-yojana",
    name: "PM MUDRA Yojana",
    ministry: "Ministry of Finance",
    category: "startup",
    beneficiaries: ["Small business owners", "Micro entrepreneurs", "Street vendors"],
    eligibility: {
      other: ["Non-agricultural micro/small enterprise", "No collateral required"],
    },
    benefits: "Collateral-free business loans: Shishu (up to ₹50,000), Kishor (₹50,000–₹5 lakh), Tarun (₹5 lakh–₹10 lakh)",
    amount: "Up to ₹10 lakh loan without collateral",
    applicationProcess: "Apply via any bank, NBFC, or MFI. Also available via UdyaMitra portal",
    portal: "https://mudra.org.in",
    deadline: "Ongoing",
    tags: ["loan", "business", "micro", "small", "startup"],
  },

  // ═══════════════════════════════════════════
  // EDUCATION SCHEMES
  // ═══════════════════════════════════════════
  {
    id: "swayam",
    name: "SWAYAM (Free Online Courses)",
    ministry: "Ministry of Education",
    category: "education",
    beneficiaries: ["Students", "Working professionals", "Lifelong learners"],
    eligibility: {
      other: ["Any Indian — no minimum qualification required for most courses"],
    },
    benefits: "Free access to 1000+ certified online courses from IITs, IIMs, central universities. Credit transfer possible for students.",
    applicationProcess: "Register at swayam.gov.in — completely free",
    portal: "https://swayam.gov.in",
    deadline: "Ongoing — new courses every semester",
    tags: ["online", "free", "courses", "IIT", "IIM", "certificate"],
  },
  {
    id: "eklavya",
    name: "Eklavya Model Residential Schools",
    ministry: "Ministry of Tribal Affairs",
    category: "education",
    beneficiaries: ["ST children", "Tribal students"],
    eligibility: {
      category: ["ST"],
      education: ["Class 6 to 12"],
      states: ["All states with tribal population"],
    },
    benefits: "Free residential quality schooling for tribal children from Class 6–12 with all facilities",
    applicationProcess: "Apply through state tribal welfare department or nearest EMRS school",
    portal: "https://emrs.tribal.gov.in",
    deadline: "April–May each year (admission cycle)",
    tags: ["tribal", "ST", "residential", "school", "free"],
  },

  // ═══════════════════════════════════════════
  // WOMEN-SPECIFIC SCHEMES
  // ═══════════════════════════════════════════
  {
    id: "udyam-sakhi",
    name: "Udyam Sakhi Portal — Women Entrepreneurship",
    ministry: "Ministry of MSME",
    category: "women",
    beneficiaries: ["Women entrepreneurs"],
    eligibility: {
      other: ["Women 18+ years", "Starting or running a micro/small business"],
    },
    benefits: "Free business mentorship, networking, training, and access to government schemes for women entrepreneurs",
    applicationProcess: "Register at udyamsakhi.org",
    portal: "https://udyamsakhi.org",
    deadline: "Ongoing",
    tags: ["women", "entrepreneurship", "mentor", "business"],
  },
  {
    id: "pmjdy",
    name: "Pradhan Mantri Jan Dhan Yojana (PMJDY)",
    ministry: "Ministry of Finance",
    category: "women",
    beneficiaries: ["Unbanked citizens", "Rural poor", "Women"],
    eligibility: {
      other: ["Any Indian citizen without a bank account (10 years+)"],
    },
    benefits: "Zero balance bank account + RuPay debit card + ₹2 lakh accident insurance + ₹30,000 life insurance + overdraft facility up to ₹10,000",
    applicationProcess: "Visit any bank branch with Aadhaar + ID proof",
    portal: "https://pmjdy.gov.in",
    deadline: "Ongoing",
    tags: ["banking", "financial-inclusion", "rural", "women"],
  },

  // ═══════════════════════════════════════════
  // RURAL & HOUSING
  // ═══════════════════════════════════════════
  {
    id: "pm-awaas",
    name: "Pradhan Mantri Awaas Yojana (PMAY)",
    ministry: "Ministry of Housing & Urban Affairs",
    category: "housing",
    beneficiaries: ["EWS", "LIG", "MIG families", "Rural poor"],
    eligibility: {
      income: "EWS: below ₹3 lakh, LIG: ₹3–6 lakh, MIG-I: ₹6–12 lakh, MIG-II: ₹12–18 lakh",
      other: ["First-time home buyer", "No pucca house in India"],
    },
    benefits: "Interest subsidy of 3–6.5% on home loans up to ₹6 lakh. Direct subsidy up to ₹2.67 lakh for EWS/LIG",
    amount: "Subsidy: ₹1.5–₹2.67 lakh",
    applicationProcess: "Apply via pmaymis.gov.in or nearest bank/housing finance company",
    portal: "https://pmaymis.gov.in",
    deadline: "Ongoing (check current status)",
    tags: ["housing", "home", "loan", "subsidy", "rural", "urban"],
  },
  {
    id: "mgnregs",
    name: "Mahatma Gandhi NREGS (MGNREGS)",
    ministry: "Ministry of Rural Development",
    category: "rural",
    beneficiaries: ["Rural households", "Unskilled rural workers"],
    eligibility: {
      other: ["Any rural adult willing to do unskilled manual work", "Job card from Gram Panchayat"],
    },
    benefits: "100 days of guaranteed wage employment per year. Wage varies by state (₹200–₹350/day). Work must be provided within 5 km of residence.",
    amount: "₹200–₹350/day for 100 days",
    applicationProcess: "Apply for Job Card at Gram Panchayat office. Then demand work in writing.",
    portal: "https://nrega.nic.in",
    deadline: "Ongoing",
    tags: ["rural", "employment", "guaranteed", "wage", "manual"],
  },
];

/**
 * Get schemes by category
 */
export function getSchemesByCategory(category: Scheme["category"]): Scheme[] {
  return GOVERNMENT_SCHEMES.filter((s) => s.category === category);
}

/**
 * Get schemes matching a user profile
 */
export function getRelevantSchemes(profile: {
  education?: string | null;
  category?: string | null;
  annualIncome?: number | null;
  state?: string | null;
}): Scheme[] {
  return GOVERNMENT_SCHEMES.filter((scheme) => {
    const el = scheme.eligibility;

    // Filter by category (SC/ST/OBC/General)
    if (el.category && profile.category) {
      if (!el.category.includes(profile.category)) return false;
    }

    // Filter by state (if scheme is state-specific)
    if (el.states && el.states.length > 0 && profile.state) {
      if (!el.states.includes(profile.state)) return false;
    }

    return true;
  });
}

/**
 * Search schemes by keyword
 */
export function searchSchemes(query: string): Scheme[] {
  const q = query.toLowerCase();
  return GOVERNMENT_SCHEMES.filter(
    (s) =>
      s.name.toLowerCase().includes(q) ||
      s.tags.some((t) => t.includes(q)) ||
      s.benefits.toLowerCase().includes(q) ||
      s.ministry.toLowerCase().includes(q)
  );
}

/**
 * Get schemes context string for AI prompt injection
 */
export function getSchemesContextForAI(schemes: Scheme[]): string {
  if (schemes.length === 0) return "";

  return `## Relevant Government Schemes
${schemes
  .slice(0, 10) // limit to 10 to stay within context
  .map(
    (s) => `
### ${s.name}
- Ministry: ${s.ministry}
- Benefits: ${s.benefits}
- Amount: ${s.amount || "Non-monetary"}
- Eligibility: ${Object.entries(s.eligibility)
      .filter(([, v]) => v)
      .map(([k, v]) => `${k}: ${Array.isArray(v) ? v.join(", ") : v}`)
      .join(" | ")}
- Apply at: ${s.portal}
- Deadline: ${s.deadline}
`
  )
  .join("\n")}`;
}
