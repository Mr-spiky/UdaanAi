"use client";

import { useState } from "react";
import { JOB_CATEGORIES, GOVT_RECRUITMENT_BOARDS, JOB_PORTALS, type JobCategory } from "@/lib/knowledge/jobs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import {
  ArrowLeft, Briefcase, Search, ExternalLink,
  Building2, GraduationCap, IndianRupee, ChevronDown,
  ChevronUp, MessageSquare, Landmark
} from "lucide-react";
import { cn } from "@/lib/utils";

const PORTAL_TYPE_COLORS = {
  government: "info",
  private: "default",
  internship: "success",
  freelance: "warning",
} as const;

const TABS = [
  { id: "categories", label: "Job Categories", icon: Briefcase },
  { id: "government", label: "Govt Recruitment", icon: Landmark },
  { id: "portals", label: "Job Portals", icon: ExternalLink },
] as const;

export default function JobsPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"categories" | "government" | "portals">("categories");
  const [search, setSearch] = useState("");
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  const filteredCategories = JOB_CATEGORIES.filter((cat) => {
    const q = search.toLowerCase();
    return (
      !q ||
      cat.title.toLowerCase().includes(q) ||
      cat.roles.some((r) => r.toLowerCase().includes(q)) ||
      cat.tags.some((t) => t.includes(q))
    );
  });

  const filteredBoards = GOVT_RECRUITMENT_BOARDS.filter((board) => {
    const q = search.toLowerCase();
    return (
      !q ||
      board.name.toLowerCase().includes(q) ||
      board.acronym.toLowerCase().includes(q) ||
      board.examTypes.some((e) => e.toLowerCase().includes(q))
    );
  });

  const filteredPortals = JOB_PORTALS.filter((portal) => {
    const q = search.toLowerCase();
    return (
      !q ||
      portal.name.toLowerCase().includes(q) ||
      portal.type.includes(q) ||
      portal.description.toLowerCase().includes(q)
    );
  });

  const handleAskAI = (context: string) => {
    router.push(`/chat?prompt=${encodeURIComponent(context)}`);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-20 border-b border-border/40 glass-card">
        <div className="max-w-5xl mx-auto px-4 py-4">
          <div className="flex items-center gap-3 mb-4">
            <Button variant="ghost" size="icon" onClick={() => router.push("/chat")} className="h-8 w-8">
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="text-lg font-bold flex items-center gap-2">
                <Briefcase className="h-5 w-5 text-primary" />
                Jobs & Internships
              </h1>
              <p className="text-xs text-muted-foreground">
                {JOB_CATEGORIES.length} job sectors · {GOVT_RECRUITMENT_BOARDS.length} recruitment boards · {JOB_PORTALS.length} portals
              </p>
            </div>
          </div>

          {/* Search */}
          <div className="relative mb-3">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search jobs, exams, portals..."
              className="w-full pl-9 pr-4 py-2.5 bg-input border border-border rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-primary placeholder:text-muted-foreground"
            />
          </div>

          {/* Tabs */}
          <div className="flex gap-1 p-1 bg-secondary/50 rounded-xl w-fit">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all",
                  activeTab === tab.id
                    ? "bg-card text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <tab.icon className="h-3.5 w-3.5" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-6">

        {/* JOB CATEGORIES */}
        {activeTab === "categories" && (
          <div className="space-y-3">
            {filteredCategories.map((cat) => (
              <div
                key={cat.id}
                className="rounded-xl border border-border/40 bg-card overflow-hidden"
              >
                {/* Category Header */}
                <button
                  onClick={() => setExpandedCategory(expandedCategory === cat.id ? null : cat.id)}
                  className="w-full flex items-center gap-4 p-4 hover:bg-secondary/40 transition-colors text-left"
                >
                  <span className="text-3xl">{cat.icon}</span>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-sm">{cat.title}</h3>
                    <p className="text-xs text-muted-foreground mt-0.5 truncate">{cat.description}</p>
                    <div className="flex items-center gap-3 mt-1.5">
                      <span className="text-[10px] text-green-400 flex items-center gap-1">
                        <IndianRupee className="h-2.5 w-2.5" />
                        {cat.salaryRange}
                      </span>
                      <div className="flex gap-1">
                        {cat.tags.slice(0, 3).map((tag) => (
                          <span key={tag} className="text-[9px] px-1.5 py-0.5 rounded bg-secondary text-muted-foreground">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  {expandedCategory === cat.id ? (
                    <ChevronUp className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                  )}
                </button>

                {/* Expanded */}
                {expandedCategory === cat.id && (
                  <div className="border-t border-border/40 p-4 space-y-4">
                    {/* Roles */}
                    <div>
                      <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium mb-2">Job Roles</p>
                      <div className="flex flex-wrap gap-2">
                        {cat.roles.map((role) => (
                          <span key={role} className="text-xs px-2.5 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
                            {role}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Qualifications */}
                    <div>
                      <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium mb-2">
                        <GraduationCap className="h-3 w-3 inline mr-1" />Qualifications
                      </p>
                      <ul className="space-y-1">
                        {cat.qualifications.map((q) => (
                          <li key={q} className="text-xs text-foreground/80 flex items-start gap-1.5">
                            <span className="text-primary mt-0.5">•</span> {q}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Portals */}
                    <div>
                      <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium mb-2">Where to Apply</p>
                      <div className="flex flex-wrap gap-2">
                        {cat.portals.slice(0, 4).map((portal) => (
                          <a
                            key={portal.name}
                            href={portal.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-lg border border-border bg-secondary hover:border-primary/40 hover:text-primary transition-all"
                          >
                            <ExternalLink className="h-3 w-3" />
                            {portal.name.split(" (")[0].split(".")[0]}
                          </a>
                        ))}
                      </div>
                    </div>

                    {/* Ask AI Button */}
                    <Button
                      size="sm"
                      variant="outline"
                      className="w-full border-primary/30 text-primary hover:bg-primary/10"
                      onClick={() => handleAskAI(`I'm interested in ${cat.title}. What should I do to get a job in this field? What skills should I learn and where should I apply?`)}
                    >
                      <MessageSquare className="h-3.5 w-3.5 mr-1.5" />
                      Ask Udaan AI for career guidance in {cat.title}
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* GOVT RECRUITMENT */}
        {activeTab === "government" && (
          <div className="space-y-3">
            {filteredBoards.map((board) => (
              <div key={board.id} className="p-4 rounded-xl border border-border/40 bg-card">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-base font-bold text-primary">{board.acronym}</span>
                      <span className="text-sm text-muted-foreground">—</span>
                      <span className="text-sm font-medium">{board.name}</span>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">{board.description}</p>
                  </div>
                  <a href={board.url} target="_blank" rel="noopener noreferrer">
                    <Button size="sm" variant="outline" className="h-7 text-xs flex-shrink-0">
                      Official Site <ExternalLink className="h-3 w-3 ml-1" />
                    </Button>
                  </a>
                </div>

                <div className="mb-3">
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium mb-1.5">Exams</p>
                  <div className="flex flex-wrap gap-1.5">
                    {board.examTypes.map((exam) => (
                      <span key={exam} className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 font-medium">
                        {exam}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <p className="text-xs text-muted-foreground">
                    <GraduationCap className="h-3 w-3 inline mr-1" />
                    {board.eligibility}
                  </p>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-7 text-xs text-primary hover:bg-primary/10"
                    onClick={() => handleAskAI(`Tell me everything about ${board.acronym} — ${board.name}. What exams does it conduct, what's the syllabus, eligibility, and how should I prepare?`)}
                  >
                    <MessageSquare className="h-3 w-3 mr-1" />
                    Ask AI
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* PORTALS */}
        {activeTab === "portals" && (
          <div>
            <div className="flex flex-wrap gap-2 mb-4">
              {(["government", "private", "internship", "freelance"] as const).map((type) => (
                <Badge key={type} variant={PORTAL_TYPE_COLORS[type] as any} className="cursor-default text-xs">
                  {type}
                </Badge>
              ))}
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              {filteredPortals.map((portal) => (
                <a
                  key={portal.name}
                  href={portal.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 p-4 rounded-xl border border-border/40 bg-card hover:border-primary/40 hover:bg-primary/5 transition-all group"
                >
                  <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0">
                    <Building2 className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-sm font-medium truncate group-hover:text-primary transition-colors">
                        {portal.name}
                      </span>
                      <ExternalLink className="h-3 w-3 text-muted-foreground flex-shrink-0" />
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">{portal.description}</p>
                    <Badge variant={PORTAL_TYPE_COLORS[portal.type] as any} className="mt-2 text-[10px] h-4">
                      {portal.type}
                    </Badge>
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
