"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SchemeCard } from "@/components/chat/SchemeCard";
import { GOVERNMENT_SCHEMES } from "@/lib/knowledge/schemes";
import { deleteConversation } from "@/actions/conversations";
import { deleteDocument } from "@/actions/documents";
import { removeBookmark } from "@/actions/bookmarks";
import {
  MessageSquare, BookOpen, FileText, User, Settings,
  ArrowRight, Plus, Trash2, ExternalLink, Star,
  CheckCircle2, AlertCircle, Landmark, LogOut
} from "lucide-react";
import { signOut } from "@/actions";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface DashboardClientProps {
  user: { id: string; email: string };
  profile: any;
  conversations: any[];
  bookmarks: any[];
  documents: any[];
}

const PROFILE_FIELDS = ["name", "state", "education", "category", "annualIncome"];

export function DashboardClient({
  user,
  profile,
  conversations,
  bookmarks,
  documents,
}: DashboardClientProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"overview" | "schemes" | "docs" | "chats">("overview");
  const [localBookmarks, setLocalBookmarks] = useState(bookmarks);
  const [localDocs, setLocalDocs] = useState(documents);
  const [localConvs, setLocalConvs] = useState(conversations);

  // Profile completeness
  const filledFields = PROFILE_FIELDS.filter((f) => profile?.[f]);
  const profilePct = Math.round((filledFields.length / PROFILE_FIELDS.length) * 100);
  const profileComplete = profilePct === 100;

  // Bookmarked scheme objects
  const bookmarkedSchemes = localBookmarks
    .filter((b) => b.type === "scheme")
    .map((b) => GOVERNMENT_SCHEMES.find((s) => s.id === b.externalId))
    .filter(Boolean) as any[];

  const handleDeleteConv = async (id: string) => {
    await deleteConversation(id);
    setLocalConvs((prev) => prev.filter((c) => c.id !== id));
  };

  const handleDeleteDoc = async (id: string) => {
    await deleteDocument(id);
    setLocalDocs((prev) => prev.filter((d) => d.id !== id));
  };

  const handleRemoveBookmark = async (externalId: string) => {
    await removeBookmark("scheme", externalId);
    setLocalBookmarks((prev) => prev.filter((b) => b.externalId !== externalId));
  };

  const formatBytes = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const STATS = [
    {
      label: "Conversations",
      value: localConvs.length,
      icon: MessageSquare,
      color: "text-blue-400",
      bg: "bg-blue-400/10",
      action: () => setActiveTab("chats"),
    },
    {
      label: "Saved Schemes",
      value: localBookmarks.filter((b) => b.type === "scheme").length,
      icon: Landmark,
      color: "text-amber-400",
      bg: "bg-amber-400/10",
      action: () => setActiveTab("schemes"),
    },
    {
      label: "Documents",
      value: localDocs.length,
      icon: FileText,
      color: "text-green-400",
      bg: "bg-green-400/10",
      action: () => setActiveTab("docs"),
    },
    {
      label: "Profile",
      value: `${profilePct}%`,
      icon: User,
      color: profileComplete ? "text-primary" : "text-muted-foreground",
      bg: profileComplete ? "bg-primary/10" : "bg-secondary",
      action: () => router.push("/profile"),
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Top Nav */}
      <div className="border-b border-border/40 glass-card sticky top-0 z-20">
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
          <button
            onClick={() => router.push("/chat")}
            className="flex items-center gap-2.5 group"
          >
            <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-xs">U</span>
            </div>
            <span className="font-bold text-sm">
              <span className="gradient-text">Udaan</span>
              <span className="text-foreground/60 ml-1">AI</span>
            </span>
          </button>

          <div className="flex items-center gap-2">
            <Button
              size="sm"
              onClick={() => router.push("/chat")}
              className="h-8 bg-primary/10 text-primary hover:bg-primary/20 border border-primary/20"
              variant="ghost"
            >
              <MessageSquare className="h-3.5 w-3.5 mr-1.5" />
              New Chat
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => router.push("/profile")}
              title="Profile Settings"
            >
              <Settings className="h-4 w-4 text-muted-foreground" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={async () => { await signOut(); }}
              title="Sign Out"
            >
              <LogOut className="h-4 w-4 text-muted-foreground" />
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8">

        {/* Greeting */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-1">
            {profile?.name ? `Namaste, ${profile.name}! 🙏` : `Namaste! 🙏`}
          </h1>
          <p className="text-muted-foreground text-sm">
            {user.email} · Welcome to your Udaan AI dashboard
          </p>
        </div>

        {/* Profile completion banner */}
        {!profileComplete && (
          <div
            className="mb-6 p-4 rounded-xl border border-primary/30 bg-primary/5 flex items-center justify-between gap-4 cursor-pointer hover:bg-primary/10 transition-colors"
            onClick={() => router.push("/profile")}
          >
            <div className="flex items-center gap-3">
              <AlertCircle className="h-5 w-5 text-primary flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-foreground">
                  Complete your profile — {profilePct}% done
                </p>
                <p className="text-xs text-muted-foreground">
                  Get personalized scheme recommendations and career guidance
                </p>
              </div>
            </div>
            <Button size="sm" className="flex-shrink-0 h-8 bg-primary hover:bg-primary/90">
              Complete <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
            </Button>
          </div>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {STATS.map((stat) => (
            <button
              key={stat.label}
              onClick={stat.action}
              className="p-4 rounded-xl border border-border/40 bg-card hover:border-primary/30 hover:bg-primary/5 transition-all text-left group"
            >
              <div className={cn("w-9 h-9 rounded-lg flex items-center justify-center mb-3", stat.bg)}>
                <stat.icon className={cn("h-4.5 w-4.5", stat.color)} />
              </div>
              <p className="text-xl font-bold text-foreground">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </button>
          ))}
        </div>

        {/* Tab Nav */}
        <div className="flex gap-1 mb-6 p-1 bg-card rounded-xl border border-border/40 w-fit">
          {([
            { id: "overview", label: "Overview" },
            { id: "schemes", label: `Saved (${localBookmarks.filter(b => b.type === "scheme").length})` },
            { id: "docs", label: `Documents (${localDocs.length})` },
            { id: "chats", label: `Chats (${localConvs.length})` },
          ] as const).map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "px-4 py-1.5 rounded-lg text-sm font-medium transition-all",
                activeTab === tab.id
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}

        {/* OVERVIEW */}
        {activeTab === "overview" && (
          <div className="grid sm:grid-cols-2 gap-6">
            {/* Recent Chats */}
            <div className="rounded-xl border border-border/40 bg-card overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3 border-b border-border/40">
                <h2 className="text-sm font-semibold flex items-center gap-2">
                  <MessageSquare className="h-4 w-4 text-blue-400" /> Recent Chats
                </h2>
                <button onClick={() => router.push("/chat")} className="text-xs text-primary hover:underline">
                  New Chat →
                </button>
              </div>
              <div className="divide-y divide-border/40">
                {localConvs.slice(0, 4).map((conv) => (
                  <button
                    key={conv.id}
                    onClick={() => router.push(`/chat?id=${conv.id}`)}
                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-secondary/50 transition-colors text-left"
                  >
                    <MessageSquare className="h-3.5 w-3.5 text-muted-foreground flex-shrink-0" />
                    <span className="text-sm text-foreground truncate flex-1">{conv.title}</span>
                    <ArrowRight className="h-3.5 w-3.5 text-muted-foreground" />
                  </button>
                ))}
                {localConvs.length === 0 && (
                  <div className="px-4 py-8 text-center">
                    <p className="text-sm text-muted-foreground mb-3">No chats yet</p>
                    <Button size="sm" onClick={() => router.push("/chat")}>
                      <Plus className="h-3.5 w-3.5 mr-1" /> Start a Chat
                    </Button>
                  </div>
                )}
              </div>
            </div>

            {/* Saved Schemes preview */}
            <div className="rounded-xl border border-border/40 bg-card overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3 border-b border-border/40">
                <h2 className="text-sm font-semibold flex items-center gap-2">
                  <Landmark className="h-4 w-4 text-amber-400" /> Saved Schemes
                </h2>
                <button onClick={() => router.push("/schemes")} className="text-xs text-primary hover:underline">
                  Browse All →
                </button>
              </div>
              <div className="p-3 space-y-2">
                {bookmarkedSchemes.slice(0, 2).map((scheme) => (
                  <SchemeCard key={scheme.id} scheme={scheme} compact />
                ))}
                {bookmarkedSchemes.length === 0 && (
                  <div className="py-8 text-center">
                    <p className="text-sm text-muted-foreground mb-3">No saved schemes yet</p>
                    <Button size="sm" variant="outline" onClick={() => router.push("/schemes")}>
                      <BookOpen className="h-3.5 w-3.5 mr-1" /> Browse Schemes
                    </Button>
                  </div>
                )}
              </div>
            </div>

            {/* Profile snapshot */}
            <div className="rounded-xl border border-border/40 bg-card overflow-hidden sm:col-span-2">
              <div className="flex items-center justify-between px-4 py-3 border-b border-border/40">
                <h2 className="text-sm font-semibold flex items-center gap-2">
                  <User className="h-4 w-4 text-primary" /> Your Profile
                </h2>
                <button onClick={() => router.push("/profile")} className="text-xs text-primary hover:underline">
                  Edit →
                </button>
              </div>
              {profile ? (
                <div className="p-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { label: "Name", value: profile.name },
                    { label: "State", value: profile.state },
                    { label: "Education", value: profile.education },
                    { label: "Category", value: profile.category },
                    { label: "Stream", value: profile.stream },
                    { label: "Income", value: profile.annualIncome ? `₹${profile.annualIncome.toLocaleString("en-IN")}` : null },
                  ].map(({ label, value }) => (
                    <div key={label}>
                      <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">{label}</p>
                      <p className="text-sm font-medium text-foreground">
                        {value || <span className="text-muted-foreground text-xs italic">Not set</span>}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-8 text-center">
                  <Button onClick={() => router.push("/profile")} className="bg-primary hover:bg-primary/90">
                    Set Up Profile
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* SAVED SCHEMES */}
        {activeTab === "schemes" && (
          <div>
            {bookmarkedSchemes.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-4xl mb-4">🔖</p>
                <p className="font-semibold mb-2">No saved schemes yet</p>
                <p className="text-muted-foreground text-sm mb-6">
                  Browse government schemes and save the ones you&apos;re interested in
                </p>
                <Button onClick={() => router.push("/schemes")} className="bg-primary hover:bg-primary/90">
                  <BookOpen className="h-4 w-4 mr-2" /> Browse Schemes
                </Button>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {bookmarkedSchemes.map((scheme) => (
                  <SchemeCard
                    key={scheme.id}
                    scheme={scheme}
                    isBookmarked
                    onBookmark={(s, isBookmarked) => {
                      if (!isBookmarked) handleRemoveBookmark(s.id);
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* DOCUMENTS */}
        {activeTab === "docs" && (
          <div>
            {localDocs.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-4xl mb-4">📄</p>
                <p className="font-semibold mb-2">No documents uploaded yet</p>
                <p className="text-muted-foreground text-sm mb-6">
                  Upload PDFs or notes in chat — Udaan AI will analyze and explain them
                </p>
                <Button onClick={() => router.push("/chat")} className="bg-primary hover:bg-primary/90">
                  <MessageSquare className="h-4 w-4 mr-2" /> Go to Chat
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                {localDocs.map((doc) => (
                  <div
                    key={doc.id}
                    className="flex items-center gap-4 p-4 rounded-xl border border-border/40 bg-card hover:border-primary/30 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
                      <FileText className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{doc.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {formatBytes(doc.sizeBytes)} · {new Date(doc.createdAt).toLocaleDateString("en-IN")}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                      onClick={() => handleDeleteDoc(doc.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* CHAT HISTORY */}
        {activeTab === "chats" && (
          <div>
            <div className="flex justify-end mb-4">
              <Button
                size="sm"
                onClick={() => router.push("/chat")}
                className="bg-primary hover:bg-primary/90"
              >
                <Plus className="h-3.5 w-3.5 mr-1.5" /> New Chat
              </Button>
            </div>
            {localConvs.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-4xl mb-4">💬</p>
                <p className="text-muted-foreground">No conversations yet</p>
              </div>
            ) : (
              <div className="space-y-2">
                {localConvs.map((conv) => (
                  <div
                    key={conv.id}
                    className="flex items-center gap-3 p-4 rounded-xl border border-border/40 bg-card hover:border-primary/30 transition-colors group"
                  >
                    <MessageSquare className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                    <button
                      onClick={() => router.push(`/chat?id=${conv.id}`)}
                      className="flex-1 text-left text-sm truncate hover:text-primary transition-colors"
                    >
                      {conv.title}
                    </button>
                    <span className="text-[10px] text-muted-foreground flex-shrink-0">
                      {new Date(conv.updatedAt).toLocaleDateString("en-IN")}
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all"
                      onClick={() => handleDeleteConv(conv.id)}
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
