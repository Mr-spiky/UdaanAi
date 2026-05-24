# 🦅 Udaan AI

> **"Helping India's students rise with AI-powered guidance."**

Udaan AI is a **multilingual AI-powered mentor platform** built for Indian students, freshers, and job seekers. It helps users discover government schemes, plan careers, find jobs/internships, and study smarter — all through a natural conversational interface powered by **Gemma 4 (Google AI)**.

---

## ✨ Features

| Feature | Description |
|---|---|
| 🏛️ **Government Scheme Advisor** | Discover scholarships, grants, skill programs tailored to your category, state & education |
| 🎓 **AI Career Mentor** | Personalized learning roadmaps, skill recommendations, career path planning |
| 💼 **Jobs & Internships** | 8 job sectors, 8 govt recruitment boards, 14 portals — all in one place |
| 📄 **Document Analysis** | Upload PDF marksheets, notes, govt documents — AI explains & creates quizzes |
| 🔖 **Smart Bookmarks** | Save schemes and opportunities to your personal dashboard |
| 🧠 **Adaptive AI** | Auto-detects query type and switches between standard/search/thinking modes |
| 👤 **Personalized Profile** | 5-step setup for hyper-personalized scheme & career matching |

---

## 🚀 Getting Started

### 1. Clone & Install

```bash
git clone https://github.com/yourusername/udaan-ai.git
cd udaan-ai
npm install
```

### 2. Set up Environment Variables

```bash
cp .env.example .env
```

Then edit `.env` and fill in:

```env
# Database
DATABASE_URL="file:./dev.db"

# JWT Secret (any strong random string)
JWT_SECRET="your-strong-secret"

# Google AI Studio API Key — FREE at https://aistudio.google.com/
GOOGLE_AI_API_KEY="your-google-ai-api-key"
```

### 3. Set up the Database

```bash
npx prisma migrate dev --name init
```

### 4. Run the Development Server

```bash
npm run dev
```

Open **http://localhost:3000** and you're ready! 🎉

---

## 🏗️ Architecture

```
udaan-ai/
├── src/
│   ├── app/
│   │   ├── page.tsx              # Landing page (redirects to /chat if logged in)
│   │   ├── chat/page.tsx         # Main chat interface (protected)
│   │   ├── profile/page.tsx      # 5-step profile setup
│   │   ├── dashboard/            # User dashboard (saved items, docs, history)
│   │   ├── schemes/page.tsx      # Browse all government schemes
│   │   ├── jobs/page.tsx         # Jobs, internships, recruitment boards
│   │   └── api/
│   │       ├── chat/route.ts     # Gemma 4 streaming chat endpoint
│   │       └── upload/route.ts   # PDF/text document upload & extraction
│   ├── components/
│   │   ├── chat/                 # ChatGPT-style interface components
│   │   ├── landing/              # Landing page components
│   │   ├── auth/                 # Sign in / Sign up dialogs
│   │   └── ui/                   # Shadcn/Radix UI base components
│   ├── lib/
│   │   ├── gemma.ts              # Google AI (Gemma 4) provider + mode detection
│   │   ├── auth.ts               # JWT session management
│   │   ├── prisma.ts             # Prisma client singleton
│   │   ├── knowledge/
│   │   │   ├── schemes.ts        # 20+ government schemes database
│   │   │   └── jobs.ts           # Job categories, portals, recruitment boards
│   │   ├── prompts/
│   │   │   └── mentor.ts         # India-specific AI mentor system prompt
│   │   └── contexts/
│   │       └── chat-context.tsx  # Chat state + document context provider
│   └── actions/                  # Next.js Server Actions
│       ├── index.ts              # Auth (signIn, signUp, signOut, getUser)
│       ├── conversations.ts      # Conversation CRUD
│       ├── profile.ts            # User profile management
│       ├── bookmarks.ts          # Save/unsave schemes & jobs
│       └── documents.ts          # Uploaded document management
├── prisma/
│   └── schema.prisma             # Database schema (User, Profile, Conversation, Document, Bookmark)
└── .env.example                  # Environment variables template
```

---

## 🧠 AI Architecture

Udaan AI uses **Gemma 4** via Google AI Studio with three intelligent modes:

| Mode | Trigger | Capability |
|---|---|---|
| **Standard** | General Q&A | Fast responses for factual questions |
| **Search** | "deadline", "vacancy", "latest", "2025" | Google Search grounding for real-time data |
| **Thinking** | "roadmap", "eligibility", "should I", "career path" | Deep reasoning for complex career planning |

The system prompt is dynamically built with:
- User's personalized profile (name, state, category, education, income)
- Matched government schemes from the knowledge base
- Relevant job categories and portals
- Uploaded document content (if any)

---

## 🗄️ Database Schema

```prisma
model User          # Email + password authentication
model UserProfile   # State, education, category, income, interests, goals
model Conversation  # Chat sessions with full message history (JSON)
model Document      # Uploaded PDFs with extracted text
model Bookmark      # Saved schemes, jobs, internships
```

---

## 📋 Government Schemes Included

| Category | Schemes |
|---|---|
| 🎓 Scholarships | NSP Central Sector, Post-Matric SC/OBC, PMSS, Begum Hazrat Mahal, Ishan Uday |
| ⚡ Skill Development | PMKVY, Skill India Digital, NAPS, NATS Apprenticeship |
| 💼 Employment | NCS Portal, PMEGP |
| 🚀 Startup | Startup India, PM MUDRA Yojana |
| 📚 Education | SWAYAM Free Courses, Eklavya Schools |
| 👩 Women | Udyam Sakhi, PM Jan Dhan Yojana |
| 🏠 Housing | PM Awaas Yojana |
| 🌾 Rural | MGNREGS |

---

## 🚀 Deployment (Vercel)

### 1. Switch to PostgreSQL

Update `.env`:
```env
DATABASE_URL="postgresql://user:password@host:5432/udaan_ai"
```

Run migration:
```bash
npx prisma migrate deploy
```

### 2. Deploy

```bash
npx vercel --prod
```

Set all environment variables in Vercel dashboard:
- `DATABASE_URL`
- `JWT_SECRET`
- `GOOGLE_AI_API_KEY`

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | Next.js 15 (App Router, Server Actions, Turbopack) |
| **AI** | Gemma 4 via `@ai-sdk/google` + Vercel AI SDK |
| **Database** | SQLite (dev) / PostgreSQL (prod) via Prisma ORM |
| **Auth** | JWT with `jose` + HTTP-only cookies |
| **UI** | Tailwind CSS v4 + Radix UI + custom glass/saffron design system |
| **PDF Parsing** | `pdf-parse` for document text extraction |
| **Streaming** | Vercel AI SDK `streamText` → `toDataStreamResponse()` |

---

## 🇮🇳 Made for India

Udaan AI is built with deep respect for the challenges faced by millions of Indian students who lack access to quality mentorship. The platform is:

- **Free** — No credit card, no premium plan
- **Accessible** — Works on any device, any connection
- **Honest** — Always cites official sources, never fabricates data
- **Inclusive** — Supports users from all states, categories, and education levels

> *"Udaan" (उड़ान) means "flight" — we help India's students take flight toward their dreams.* 🦅

---

## 📄 License

MIT License — free to use, modify, and distribute.

---

<p align="center">Made with ❤️ for India's students · 🇮🇳 Jai Hind</p>
