<div align="center">

<img src="https://img.shields.io/badge/Next.js-15.3-black?style=for-the-badge&logo=next.js" alt="Next.js" />
<img src="https://img.shields.io/badge/AI--SDK-4.3-orange?style=for-the-badge&logo=openai" alt="AI SDK" />
<img src="https://img.shields.io/badge/Prisma-6.10-3982CE?style=for-the-badge&logo=prisma" alt="Prisma" />
<img src="https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript" alt="TypeScript" />
<img src="https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=for-the-badge&logo=tailwind-css" alt="Tailwind" />

<br /><br />

```
  ██╗   ██╗██████╗  █████╗  █████╗ ███╗   ██╗     █████╗ ██╗
  ██║   ██║██╔══██╗██╔══██╗██╔══██╗████╗  ██║    ██╔══██╗██║
  ██║   ██║██║  ██║███████║███████║██╔██╗ ██║    ███████║██║
  ██║   ██║██║  ██║██╔══██║██╔══██║██║╚██╗██║    ██╔══██║██║
  ╚██████╔╝██████╔╝██║  ██║██║  ██║██║ ╚████║    ██║  ██║██║
   ╚═════╝ ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝    ╚═╝  ╚═╝╚═╝
```

# 🦅 Udaan AI

### *Give Wings to Your Dreams — सपनों को उड़ान दो*

**The AI-powered career mentor built for every Indian student — completely free.**

Discover scholarships · Plan your career · Find jobs & internships · Study smarter

<br />

[![Live Demo](https://img.shields.io/badge/🚀_Live_Demo-Visit_App-FF6B2B?style=for-the-badge)](https://udaan-ai.vercel.app)
[![GitHub Stars](https://img.shields.io/github/stars/Mr-spiky/UdaanAi?style=for-the-badge&color=gold)](https://github.com/Mr-spiky/UdaanAi/stargazers)
[![License: MIT](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

</div>

---

## 🌟 What is Udaan AI?

Millions of students in India don't get the guidance they deserve — not because they lack talent, but because the right information is buried across dozens of government portals, scattered PDFs, and outdated websites.

**Udaan AI changes that.**

It's a conversational AI mentor that knows about every major government scholarship, job portal, skill development scheme, and career pathway — and explains it all in plain language, personalized to *your* state, category, education level, and goals.

Whether you're a student in Bihar asking about post-matric scholarships, a graduate in Maharashtra looking for entry-level tech jobs, or a rural learner from a Tier-3 city wanting to know about PMKVY — **Udaan AI has your back.**

> **"Built for the 10 crore+ students who deserve a mentor, not just a search engine."**

---

## ✨ Key Features

<table>
<tr>
<td width="50%">

### 🏛️ Government Scheme Advisor
Instantly discover scholarships, grants, and welfare schemes tailored to your:
- Education level (10th → Postgrad)
- Category (SC/ST/OBC/EWS/General)
- State of residence
- Annual family income

No more missed deadlines. No more confusion.

</td>
<td width="50%">

### 🎓 AI Career Mentor
Get personalized guidance powered by large language models:
- Skill gap analysis
- Learning roadmaps
- Career pathway comparisons
- Study plans for competitive exams

</td>
</tr>
<tr>
<td width="50%">

### 💼 Jobs & Internships Explorer
Browse curated opportunities by:
- 20+ major recruiting boards (UPSC, SSC, IBPS...)
- Top internship platforms
- Government & private sector jobs
- Entry-level & fresher roles

</td>
<td width="50%">

### 📄 Document Intelligence
Upload your documents and let Udaan AI:
- Summarize mark sheets & certificates
- Analyze eligibility from PDFs
- Answer questions about uploaded content
- Support PDFs, text files, and images

</td>
</tr>
<tr>
<td width="50%">

### 🔖 Save & Dashboard
Your personalized control panel:
- Bookmark schemes you're interested in
- View uploaded document history
- Access past conversations
- Track your saved jobs & internships

</td>
<td width="50%">

### ⚡ Multi-Provider AI with Auto-Failover
Never goes down:
- Primary: Google AI Studio (Gemini 2.0 Flash)
- Backup: OpenRouter (4+ free models)
- Automatically switches if rate-limited
- Zero downtime for the user

</td>
</tr>
</table>

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | Next.js 15.3 (App Router, Server Actions) |
| **AI** | Vercel AI SDK 4.3 · Google Gemini 2.0 Flash · OpenRouter (free tier) |
| **Database** | SQLite (dev) / PostgreSQL (prod) via Prisma ORM |
| **Auth** | Custom JWT with `jose` + `bcrypt` |
| **UI** | Tailwind CSS 4 · Radix UI · Lucide Icons |
| **Language** | TypeScript 5 (strict mode) |
| **Deployment** | Vercel (recommended) |

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn
- Google AI Studio API key (free at [aistudio.google.com](https://aistudio.google.com/))
- (Optional) OpenRouter API key for failover (free at [openrouter.ai](https://openrouter.ai/))

### 1. Clone & Install

```bash
git clone https://github.com/Mr-spiky/UdaanAi.git
cd UdaanAi
npm install
```

### 2. Configure Environment

```bash
cp .env.example .env
```

Open `.env` and fill in your keys:

```env
# Database
DATABASE_URL="file:./dev.db"

# JWT Secret (change in production!)
JWT_SECRET="your-strong-random-secret"

# Google AI Studio API Key (required)
GOOGLE_AI_API_KEY="AIzaSy..."

# OpenRouter API Key (optional — for failover)
OPENROUTER_API_KEY="sk-or-v1-..."

# Preferred provider: "google" or "openrouter"
PREFERRED_PROVIDER="google"
```

### 3. Setup Database

```bash
npx prisma migrate dev --name init
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — you're live! 🎉

---

## 🗄️ Database Schema

```
User
├── UserProfile (state, education, category, income, interests)
├── Conversation[] (AI chat history with auto-titles)
├── Document[] (uploaded PDFs with extracted text)
└── Bookmark[] (saved schemes, jobs, internships)
```

All sensitive data is protected with JWT-based authentication. Passwords are hashed with bcrypt.

---

## 🧠 How the AI Works

```
User Message
     │
     ▼
┌─────────────────────────────────────────────┐
│  1. Auth check → load user profile           │
│  2. detectQueryMode() → "search" / "think"  │
│  3. getRelevantSchemes() → knowledge base   │
│  4. buildMentorSystemPrompt() → 200+ lines  │
│  5. Stream through model queue:             │
│     → openai/gpt-oss-20b:free              │
│     → nvidia/nemotron-nano-9b-v2:free       │
│     → meta-llama/llama-3.3-70b:free         │
│     → google/gemini-2.0-flash               │
│  6. Persist conversation to DB              │
└─────────────────────────────────────────────┘
     │
     ▼
  Streaming response to user
```

The system automatically cycles through AI providers if one is rate-limited — ensuring **zero downtime** even on free API tiers.

---

## 📁 Project Structure

```
udaan-ai/
├── prisma/
│   ├── schema.prisma          # Database models
│   └── migrations/            # Migration history
├── src/
│   ├── actions/               # Server Actions (CRUD operations)
│   │   ├── bookmarks.ts
│   │   ├── conversations.ts
│   │   ├── documents.ts
│   │   └── profile.ts
│   ├── app/
│   │   ├── api/
│   │   │   ├── chat/          # AI streaming endpoint
│   │   │   └── upload/        # PDF & document upload
│   │   ├── chat/              # Main chat UI
│   │   ├── dashboard/         # User dashboard
│   │   ├── jobs/              # Jobs & internships explorer
│   │   ├── profile/           # 5-step profile setup
│   │   └── schemes/           # Government schemes browser
│   ├── components/
│   │   ├── auth/              # Sign in / Sign up modal
│   │   ├── chat/              # Chat interface components
│   │   ├── landing/           # Landing page
│   │   └── ui/                # Radix UI primitives
│   ├── hooks/
│   │   └── use-auth.ts        # Authentication hook
│   └── lib/
│       ├── auth.ts            # JWT utilities
│       ├── gemma.ts           # Query mode detection
│       ├── contexts/          # React context providers
│       ├── knowledge/
│       │   ├── schemes.ts     # 500+ government schemes data
│       │   └── jobs.ts        # Jobs & recruiting boards data
│       └── prompts/
│           └── mentor.ts      # AI system prompt builder
├── .env.example               # Environment template
├── next.config.ts             # Next.js configuration
└── package.json
```

---

## 🌐 Government Schemes Coverage

Udaan AI has built-in knowledge of **500+ government schemes** across categories:

| Category | Examples |
|----------|---------|
| 📚 **Scholarships** | NSP, Post-Matric, Merit-cum-Means, Inspire, PM-YASASVI |
| 💡 **Skill Development** | PMKVY, NAPS, Skill India Mission, DDU-GKY |
| 🏦 **Loans & Finance** | Mudra Yojana, Stand-Up India, PM SVANidhi |
| 👩 **Women Empowerment** | Beti Bachao Beti Padhao, Mahila E-Haat, Sukanya Samriddhi |
| 🏥 **Healthcare** | Ayushman Bharat, PM-JAY, Janani Suraksha |
| 🌾 **Agriculture** | PM-KISAN, Kisan Credit Card, PMFBY |
| 🏠 **Housing** | PMAY, PM Awas Yojana Urban/Rural |
| 💼 **Employment** | MGNREGA, PM Rozgar Protsahan |

---

## 🔐 Environment Variables Reference

| Variable | Required | Description |
|----------|----------|-------------|
| `DATABASE_URL` | ✅ | SQLite path (dev) or PostgreSQL URL (prod) |
| `JWT_SECRET` | ✅ | Secret for signing auth tokens |
| `GOOGLE_AI_API_KEY` | ✅* | Google AI Studio key (free at aistudio.google.com) |
| `OPENROUTER_API_KEY` | ⚡ Optional | OpenRouter key for failover |
| `PREFERRED_PROVIDER` | ⚡ Optional | `"google"` or `"openrouter"` (default: `"google"`) |

*\*Either `GOOGLE_AI_API_KEY` or `OPENROUTER_API_KEY` is required.*

---

## 📦 Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Production build
npm run start        # Start production server
npm run lint         # Run ESLint

npx prisma studio    # Open Prisma DB browser
npx prisma generate  # Regenerate Prisma client
npx prisma migrate dev --name <name>   # Create new migration
```

---

## 🚀 Deploy to Vercel

The easiest way to deploy Udaan AI is with [Vercel](https://vercel.com):

1. **Fork** this repository
2. **Import** it on [vercel.com/new](https://vercel.com/new)
3. **Add Environment Variables** in the Vercel dashboard
4. **Switch** `DATABASE_URL` to a PostgreSQL connection string (Neon, Supabase, etc.)
5. **Click Deploy** 🎉

> **Note:** For production, use PostgreSQL instead of SQLite. Update `prisma/schema.prisma` to use `provider = "postgresql"`.

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Add more schemes** → edit `src/lib/knowledge/schemes.ts`
2. **Add more jobs data** → edit `src/lib/knowledge/jobs.ts`
3. **Improve UI** → components are in `src/components/`
4. **Report bugs** → open a [GitHub Issue](https://github.com/Mr-spiky/UdaanAi/issues)

```bash
# Fork the repo, then:
git checkout -b feature/your-feature-name
git commit -m "feat: add your feature"
git push origin feature/your-feature-name
# Open a Pull Request
```

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgements

- [Google AI Studio](https://aistudio.google.com/) — for the free Gemini API
- [OpenRouter](https://openrouter.ai/) — for the free model routing layer
- [Vercel AI SDK](https://sdk.vercel.ai/) — for the streaming AI utilities
- [National Scholarship Portal](https://scholarships.gov.in/) — for scheme data reference
- Every Indian student who deserves better guidance 🇮🇳

---

<div align="center">

**Made with ❤️ for India's students**

*सपनों को उड़ान दो — Give Wings to Your Dreams*

🇮🇳 **Jai Hind**

<br />

⭐ **Star this repo if Udaan AI helped you or inspired you!** ⭐

</div>
