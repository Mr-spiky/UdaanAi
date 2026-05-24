/**
 * Udaan AI — Jobs & Internships Knowledge Base
 * Curated job categories, portals, government recruitment boards,
 * and internship platforms for Indian students and job seekers.
 */

export interface JobCategory {
  id: string;
  title: string;
  icon: string;
  description: string;
  roles: string[];
  portals: JobPortal[];
  salaryRange: string;       // entry level in India
  qualifications: string[];
  tags: string[];
}

export interface JobPortal {
  name: string;
  url: string;
  type: "government" | "private" | "internship" | "freelance";
  description: string;
}

export interface GovtRecruitmentBoard {
  id: string;
  name: string;
  acronym: string;
  description: string;
  url: string;
  state?: string;  // undefined = central/national
  examTypes: string[];
  eligibility: string;
}

// ─────────────────────────────────────────
// Job Portals
// ─────────────────────────────────────────
export const JOB_PORTALS: JobPortal[] = [
  { name: "NCS Portal (National Career Service)", url: "https://ncs.gov.in", type: "government", description: "Government's official job portal with 5 lakh+ listings" },
  { name: "Internshala", url: "https://internshala.com", type: "internship", description: "India's #1 platform for internships and fresher jobs" },
  { name: "LinkedIn", url: "https://linkedin.com/jobs", type: "private", description: "Professional network with jobs from top companies" },
  { name: "Naukri.com", url: "https://naukri.com", type: "private", description: "India's largest job portal with all industries" },
  { name: "Indeed India", url: "https://indeed.co.in", type: "private", description: "Global job search engine with India listings" },
  { name: "Unstop (D2C)", url: "https://unstop.com", type: "internship", description: "Competitions, hackathons, internships for students" },
  { name: "Fresherworld", url: "https://fresherworld.com", type: "private", description: "Jobs specifically for freshers (0-2 years exp)" },
  { name: "Shine.com", url: "https://shine.com", type: "private", description: "Job portal with good government + private listings" },
  { name: "Sarkari Naukri", url: "https://sarkarinaukri.com", type: "government", description: "All government job notifications in one place" },
  { name: "Government Jobs (Employment News)", url: "https://employmentnews.gov.in", type: "government", description: "Official Employment News — weekly government job ads" },
  { name: "Freelancer.in", url: "https://freelancer.in", type: "freelance", description: "Freelance projects for coders, designers, writers" },
  { name: "Fiverr", url: "https://fiverr.com", type: "freelance", description: "Sell skills internationally — start at $5/gig" },
  { name: "Apna App", url: "https://apna.co", type: "private", description: "Jobs for blue-collar and semi-skilled workers in India" },
  { name: "Work India", url: "https://workindia.in", type: "private", description: "Local jobs for freshers, no degree required roles" },
];

// ─────────────────────────────────────────
// Government Recruitment Boards
// ─────────────────────────────────────────
export const GOVT_RECRUITMENT_BOARDS: GovtRecruitmentBoard[] = [
  {
    id: "ssc",
    name: "Staff Selection Commission",
    acronym: "SSC",
    description: "Conducts exams for Group B and C posts in central government ministries",
    url: "https://ssc.gov.in",
    examTypes: ["SSC CGL", "SSC CHSL", "SSC MTS", "SSC GD", "SSC CPO", "SSC JE"],
    eligibility: "12th pass to Graduate depending on post",
  },
  {
    id: "upsc",
    name: "Union Public Service Commission",
    acronym: "UPSC",
    description: "Conducts IAS, IPS, IFS and all Group A central government exams",
    url: "https://upsc.gov.in",
    examTypes: ["Civil Services (IAS/IPS/IFS)", "NDA", "CDS", "CAPF", "ESE", "SCRA"],
    eligibility: "Graduate for Civil Services, 12th for NDA",
  },
  {
    id: "ibps",
    name: "Institute of Banking Personnel Selection",
    acronym: "IBPS",
    description: "Conducts recruitment for all public sector banks in India",
    url: "https://ibps.in",
    examTypes: ["IBPS PO", "IBPS Clerk", "IBPS SO", "IBPS RRB PO", "IBPS RRB Clerk"],
    eligibility: "Graduate (any stream), age 20-30 years",
  },
  {
    id: "sbi",
    name: "State Bank of India",
    acronym: "SBI",
    description: "India's largest public sector bank — conducts its own recruitment",
    url: "https://sbi.co.in/careers",
    examTypes: ["SBI PO", "SBI Clerk", "SBI SO"],
    eligibility: "Graduate, age 21-30 years",
  },
  {
    id: "rrb",
    name: "Railway Recruitment Board",
    acronym: "RRB",
    description: "Recruits for Indian Railways — one of the largest employers in India",
    url: "https://indianrailways.gov.in",
    examTypes: ["RRB NTPC", "RRB Group D", "RRB JE", "RRB ALP", "RRB Paramedical"],
    eligibility: "10th pass to Graduate/Diploma depending on post",
  },
  {
    id: "rbi",
    name: "Reserve Bank of India",
    acronym: "RBI",
    description: "India's central bank — recruits Grade B officers and assistants",
    url: "https://rbi.org.in",
    examTypes: ["RBI Grade B", "RBI Assistant", "RBI Office Attendant"],
    eligibility: "Graduate/Postgraduate, varies by role",
  },
  {
    id: "defence",
    name: "Indian Armed Forces",
    acronym: "Army/Navy/Air Force",
    description: "Recruitment into Indian Army, Navy, and Air Force",
    url: "https://joinindianarmy.nic.in",
    examTypes: ["NDA", "CDS", "Agniveer", "Technical Entry Scheme", "10+2 Entry"],
    eligibility: "10th/12th pass, age 17-25 years typically",
  },
  {
    id: "teaching",
    name: "Teaching Recruitment (CTET/State TETs)",
    acronym: "CTET / TET",
    description: "Central and State Teacher Eligibility Tests for government school teachers",
    url: "https://ctet.nic.in",
    examTypes: ["CTET Paper 1", "CTET Paper 2", "State TETs", "KVS", "NVS", "DSSSB"],
    eligibility: "Graduation + B.Ed for secondary; 12th + D.El.Ed for primary",
  },
];

// ─────────────────────────────────────────
// Job Categories
// ─────────────────────────────────────────
export const JOB_CATEGORIES: JobCategory[] = [
  {
    id: "software",
    title: "Software Development & IT",
    icon: "💻",
    description: "Highest-paying sector for freshers in India. Remote-friendly roles available.",
    roles: ["Software Engineer", "Web Developer", "Mobile App Developer", "Data Analyst", "QA Engineer", "DevOps Engineer", "UI/UX Designer"],
    portals: JOB_PORTALS.filter(p => ["LinkedIn", "Naukri.com", "Internshala", "Unstop (D2C)"].includes(p.name)),
    salaryRange: "₹3–12 LPA (fresher), ₹15–50 LPA (3-5 years)",
    qualifications: ["B.Tech/BE (CS, IT, ECE)", "BCA/BSc CS", "MCA", "Relevant certifications (AWS, Google, Meta)"],
    tags: ["remote", "high-salary", "growing", "skills-based"],
  },
  {
    id: "banking",
    title: "Banking & Finance",
    icon: "🏦",
    description: "Stable government bank jobs with pension, transfers, and promotions.",
    roles: ["Bank PO", "Bank Clerk", "Financial Analyst", "Credit Officer", "RBI Grade B", "NABARD Officer"],
    portals: JOB_PORTALS.filter(p => p.type === "government"),
    salaryRange: "₹2.5–6 LPA (clerk), ₹7–14 LPA (PO)",
    qualifications: ["Any Graduate (for Clerk/PO)", "Finance/MBA preferred for SO roles"],
    tags: ["government", "stable", "pension", "transfers"],
  },
  {
    id: "government",
    title: "Government / Sarkari Naukri",
    icon: "🏛️",
    description: "Most sought-after jobs in India. Job security, pension, respect, perks.",
    roles: ["IAS Officer", "IPS Officer", "SSC CGL", "SSC CHSL", "LDC", "Tax Inspector", "Auditor"],
    portals: JOB_PORTALS.filter(p => p.type === "government"),
    salaryRange: "₹18,000–₹2,50,000/month (7th Pay Commission)",
    qualifications: ["12th pass (SSC MTS/GD)", "Graduate (SSC CGL, Civil Services)"],
    tags: ["government", "stable", "pension", "status", "competitive"],
  },
  {
    id: "teaching",
    title: "Teaching & Education",
    icon: "📖",
    description: "Rewarding career with government teaching jobs offering great work-life balance.",
    roles: ["Primary Teacher", "TGT", "PGT", "College Lecturer", "Professor", "Coaching Faculty"],
    portals: JOB_PORTALS.filter(p => ["NCS Portal (National Career Service)", "Sarkari Naukri"].includes(p.name)),
    salaryRange: "₹18,000–₹70,000/month (government school)",
    qualifications: ["12th + D.El.Ed (Primary)", "Graduate + B.Ed (Secondary)", "Postgrad + NET (College)"],
    tags: ["government", "stable", "noble", "vacation", "pension"],
  },
  {
    id: "healthcare",
    title: "Healthcare & Paramedical",
    icon: "🏥",
    description: "High-demand sector with government hospital recruitment and private hospital openings.",
    roles: ["Staff Nurse", "Lab Technician", "Pharmacist", "ANM", "ASHA Worker", "Radiographer", "Doctor (MBBS)"],
    portals: JOB_PORTALS.filter(p => ["NCS Portal (National Career Service)", "Sarkari Naukri", "Naukri.com"].includes(p.name)),
    salaryRange: "₹12,000–₹80,000/month depending on role",
    qualifications: ["ANM/GNM diploma (Nurse)", "BSc Nursing", "MBBS (Doctor)", "DMLT (Lab Tech)"],
    tags: ["healthcare", "government", "noble", "stable"],
  },
  {
    id: "defence",
    title: "Defence & Police",
    icon: "🪖",
    description: "Serve the nation. Army, Navy, Air Force, BSF, CRPF, and State Police.",
    roles: ["Army Soldier", "Navy Sailor", "Air Force Airman", "Agniveer", "Police Constable", "Sub-Inspector"],
    portals: JOB_PORTALS.filter(p => p.type === "government"),
    salaryRange: "₹21,700–₹69,100/month (7th Pay Commission)",
    qualifications: ["10th/12th pass (Soldier/Constable)", "Graduate (SI/Officer entry)"],
    tags: ["government", "defence", "physical-fitness", "pension"],
  },
  {
    id: "design",
    title: "Design & Creative",
    icon: "🎨",
    description: "Creative roles in UI/UX, graphic design, video editing, content creation.",
    roles: ["UI/UX Designer", "Graphic Designer", "Video Editor", "Content Creator", "Social Media Manager"],
    portals: JOB_PORTALS.filter(p => ["LinkedIn", "Internshala", "Freelancer.in", "Fiverr"].includes(p.name)),
    salaryRange: "₹2.5–8 LPA (fresher), higher as freelance",
    qualifications: ["Any degree with portfolio", "Diploma in Design", "Self-taught (portfolio matters most)"],
    tags: ["creative", "remote", "freelance", "portfolio"],
  },
  {
    id: "agriculture",
    title: "Agriculture & Rural Development",
    icon: "🌾",
    description: "NABARD, FCI, CWC, Agriculture Officer — stable government jobs in rural sector.",
    roles: ["Agriculture Officer", "FCI Manager", "NABARD Grade A/B", "Village Development Officer", "Horticulture Officer"],
    portals: JOB_PORTALS.filter(p => p.type === "government"),
    salaryRange: "₹25,000–₹80,000/month",
    qualifications: ["BSc Agriculture (most roles)", "Graduate (FCI JE, VDO)"],
    tags: ["agriculture", "government", "rural", "NABARD", "FCI"],
  },
];

/**
 * Get job category by ID
 */
export function getJobCategory(id: string) {
  return JOB_CATEGORIES.find((c) => c.id === id);
}

/**
 * Search across jobs and portals
 */
export function searchJobs(query: string): JobCategory[] {
  const q = query.toLowerCase();
  return JOB_CATEGORIES.filter(
    (cat) =>
      cat.title.toLowerCase().includes(q) ||
      cat.description.toLowerCase().includes(q) ||
      cat.roles.some((r) => r.toLowerCase().includes(q)) ||
      cat.tags.some((t) => t.includes(q))
  );
}

/**
 * Get jobs context for AI prompt
 */
export function getJobsContextForAI(query?: string): string {
  const categories = query ? searchJobs(query) : JOB_CATEGORIES.slice(0, 5);

  return `## Job Categories & Portals in India
${categories.map((c) => `
### ${c.icon} ${c.title}
- Roles: ${c.roles.slice(0, 4).join(", ")}
- Salary: ${c.salaryRange}
- Qualifications: ${c.qualifications[0]}
- Apply at: ${c.portals[0]?.url || "ncs.gov.in"}
`).join("\n")}

## Government Recruitment Boards
${GOVT_RECRUITMENT_BOARDS.slice(0, 4).map((b) => `
### ${b.acronym} — ${b.name}
- Exams: ${b.examTypes.slice(0, 3).join(", ")}
- Eligibility: ${b.eligibility}
- Website: ${b.url}
`).join("\n")}`;
}
