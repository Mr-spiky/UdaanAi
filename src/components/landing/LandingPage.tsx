"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { AuthDialog } from "@/components/auth/AuthDialog";
import {
  BookOpen, Briefcase, GraduationCap, Landmark, MessageSquare,
  ArrowRight, Sparkles, Users, Star, ChevronRight, FileText,
  MapPin, IndianRupee, Trophy
} from "lucide-react";

const EXAMPLE_PROMPTS = [
  "What scholarships can I get after 12th with OBC category?",
  "I'm a BCA graduate from Bihar. What jobs should I look for?",
  "Explain PMKVY scheme and how to apply",
  "Create a 6-month learning roadmap for becoming a web developer",
  "What government schemes are available for SC students in Maharashtra?",
  "I want to start a small business. What loans or grants are available?",
];

const FEATURES = [
  {
    icon: Landmark,
    title: "Government Scheme Advisor",
    description: "Discover scholarships, grants, and benefits tailored to your education, category, and state. No more missing deadlines.",
    color: "text-amber-400",
    bg: "bg-amber-400/10",
    border: "border-amber-400/20",
  },
  {
    icon: GraduationCap,
    title: "AI Career Mentor",
    description: "Get personalized learning roadmaps, skill recommendations, and career paths based on your background and interests.",
    color: "text-blue-400",
    bg: "bg-blue-400/10",
    border: "border-blue-400/20",
  },
  {
    icon: Briefcase,
    title: "Jobs & Internships",
    description: "Find entry-level jobs, internships, and government opportunities that match your qualifications.",
    color: "text-green-400",
    bg: "bg-green-400/10",
    border: "border-green-400/20",
  },
  {
    icon: FileText,
    title: "Study Assistant",
    description: "Upload your notes or PDFs. Udaan AI summarizes, explains, and creates quizzes — making studying smarter.",
    color: "text-purple-400",
    bg: "bg-purple-400/10",
    border: "border-purple-400/20",
  },
];

const STATS = [
  { icon: BookOpen, value: "500+", label: "Government Schemes", color: "text-amber-400" },
  { icon: Users, value: "10Cr+", label: "Students Can Benefit", color: "text-blue-400" },
  { icon: MapPin, value: "28+", label: "States Covered", color: "text-green-400" },
  { icon: IndianRupee, value: "₹0", label: "Always Free", color: "text-purple-400" },
];

interface LandingPageProps {
  openAuth?: boolean;
}

export default function LandingPage({ openAuth }: LandingPageProps) {
  const router = useRouter();
  const [authOpen, setAuthOpen] = useState(openAuth || false);
  const [authMode, setAuthMode] = useState<"signin" | "signup">("signup");

  const handleGetStarted = () => {
    setAuthMode("signup");
    setAuthOpen(true);
  };

  const handleSignIn = () => {
    setAuthMode("signin");
    setAuthOpen(true);
  };

  const handlePromptClick = (prompt: string) => {
    setAuthMode("signup");
    setAuthOpen(true);
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 glass-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">U</span>
            </div>
            <span className="font-bold text-lg tracking-tight">
              <span className="gradient-text">Udaan</span>{" "}
              <span className="text-foreground/70">AI</span>
            </span>
          </div>

          {/* Nav actions */}
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleSignIn}
              className="text-muted-foreground hover:text-foreground"
            >
              Sign In
            </Button>
            <Button
              size="sm"
              onClick={handleGetStarted}
              className="bg-primary text-primary-foreground hover:bg-primary/90 saffron-glow"
            >
              Get Started Free
              <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-4 pt-24 pb-16">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full opacity-[0.04]"
            style={{ background: "radial-gradient(circle, #FF6B2B 0%, transparent 70%)" }} />
          <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] rounded-full opacity-[0.03]"
            style={{ background: "radial-gradient(circle, #1565C0 0%, transparent 70%)" }} />
          {/* Indian flag colors strip */}
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#FF9933] via-white/20 to-[#138808] opacity-30" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-medium mb-8 animate-fade-in-up">
            <Sparkles className="h-3.5 w-3.5" />
            Powered by Gemma AI · Made for India 🇮🇳
          </div>

          {/* Headline */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6 animate-fade-in-up animate-delay-100">
            <span className="gradient-text">सपनों को</span>
            <br />
            <span className="text-foreground">उड़ान दो</span>
          </h1>

          <p className="text-xl sm:text-2xl text-muted-foreground font-medium mb-3 animate-fade-in-up animate-delay-200">
            Give Wings to Your Dreams
          </p>

          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in-up animate-delay-300">
            Udaan AI is your personal AI mentor — helping you discover government schemes,
            plan your career, find jobs & internships, and study smarter.
            Completely <span className="text-primary font-semibold">free</span> for every Indian student.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-fade-in-up animate-delay-400">
            <Button
              size="lg"
              onClick={handleGetStarted}
              className="bg-primary text-primary-foreground hover:bg-primary/90 h-12 px-8 text-base font-semibold saffron-glow transition-all duration-300 hover:scale-105"
            >
              <MessageSquare className="mr-2 h-5 w-5" />
              Start Chatting — It&apos;s Free
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={handleSignIn}
              className="h-12 px-8 text-base border-border/60 hover:bg-secondary"
            >
              Already have an account?
            </Button>
          </div>

          {/* Example prompts */}
          <div className="animate-fade-in-up animate-delay-400">
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-4 font-medium">
              Try asking Udaan AI...
            </p>
            <div className="flex flex-wrap gap-2 justify-center max-w-3xl mx-auto">
              {EXAMPLE_PROMPTS.map((prompt, i) => (
                <button
                  key={i}
                  onClick={() => handlePromptClick(prompt)}
                  className="text-xs sm:text-sm px-3 py-2 rounded-lg border border-border/60 bg-card hover:border-primary/40 hover:bg-primary/5 hover:text-primary transition-all duration-200 text-left text-muted-foreground cursor-pointer group"
                >
                  <ChevronRight className="inline h-3 w-3 mr-1 group-hover:text-primary transition-colors" />
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 border-y border-border/40">
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-2 lg:grid-cols-4 gap-8">
          {STATS.map((stat, i) => (
            <div key={i} className="text-center">
              <stat.icon className={`h-6 w-6 mx-auto mb-3 ${stat.color}`} />
              <div className={`text-3xl font-bold mb-1 ${stat.color}`}>{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Everything you need to{" "}
              <span className="gradient-text">rise higher</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              One AI companion for all your career and education needs — no more jumping between 10 different websites.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {FEATURES.map((feature, i) => (
              <div
                key={i}
                className={`p-6 rounded-2xl border glass-card ${feature.border} hover:scale-[1.02] transition-all duration-300 group cursor-pointer`}
                onClick={handleGetStarted}
              >
                <div className={`w-12 h-12 rounded-xl ${feature.bg} flex items-center justify-center mb-4`}>
                  <feature.icon className={`h-6 w-6 ${feature.color}`} />
                </div>
                <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who it's for */}
      <section className="py-24 px-4 border-t border-border/40">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">
            Built for <span className="gradient-text">every Indian learner</span>
          </h2>
          <p className="text-muted-foreground mb-12">
            Whether you&apos;re from a metro city or a village, Udaan AI speaks your language.
          </p>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { icon: "🎓", label: "Students", desc: "10th, 12th, College & IGNOU learners" },
              { icon: "💼", label: "Job Seekers", desc: "Freshers & experienced looking for opportunities" },
              { icon: "🏘️", label: "Rural Youth", desc: "First-generation learners from Tier 2 & 3 cities" },
            ].map((item, i) => (
              <div key={i} className="p-6 rounded-xl glass-card border border-border/40 text-center">
                <div className="text-4xl mb-3">{item.icon}</div>
                <div className="font-semibold mb-1">{item.label}</div>
                <div className="text-sm text-muted-foreground">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="p-10 rounded-3xl gradient-border glass-card">
            <Trophy className="h-12 w-12 text-primary mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-4">
              Ready to start your{" "}
              <span className="gradient-text">Udaan</span>?
            </h2>
            <p className="text-muted-foreground mb-8">
              Join thousands of Indian students discovering opportunities they never knew existed.
              Free forever. No credit card.
            </p>
            <Button
              size="lg"
              onClick={handleGetStarted}
              className="bg-primary text-primary-foreground hover:bg-primary/90 h-12 px-10 text-base font-semibold saffron-glow"
            >
              Start Your Journey — Free
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40 py-8 px-4">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-xs">U</span>
            </div>
            <span className="text-sm font-medium">Udaan AI</span>
          </div>
          <p className="text-xs text-muted-foreground text-center">
            Made with ❤️ for India&apos;s students · 🇮🇳 Jai Hind
          </p>
          <p className="text-xs text-muted-foreground">
            © 2025 Udaan AI. All rights reserved.
          </p>
        </div>
      </footer>

      {/* Auth Dialog */}
      <AuthDialog
        open={authOpen}
        onOpenChange={setAuthOpen}
        defaultMode={authMode}
      />
    </div>
  );
}
