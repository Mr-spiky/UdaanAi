"use client";

import { useState, useMemo, useEffect } from "react";
import { GOVERNMENT_SCHEMES, type Scheme } from "@/lib/knowledge/schemes";
import { SchemeCard } from "@/components/chat/SchemeCard";
import { addBookmark, removeBookmark, getBookmarks } from "@/actions/bookmarks";
import { Button } from "@/components/ui/button";
import { Search, Filter, ArrowLeft, BookOpen } from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

const CATEGORIES: { label: string; value: Scheme["category"] | "all"; icon: string }[] = [
  { label: "All", value: "all", icon: "🌐" },
  { label: "Scholarships", value: "scholarship", icon: "🎓" },
  { label: "Skill Dev", value: "skill", icon: "⚡" },
  { label: "Employment", value: "employment", icon: "💼" },
  { label: "Startup", value: "startup", icon: "🚀" },
  { label: "Education", value: "education", icon: "📚" },
  { label: "Women", value: "women", icon: "👩" },
  { label: "Rural", value: "rural", icon: "🌾" },
  { label: "Housing", value: "housing", icon: "🏠" },
];

export default function SchemesPage() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<Scheme["category"] | "all">("all");
  const [bookmarkedIds, setBookmarkedIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    async function loadBookmarks() {
      try {
        const bookmarks = await getBookmarks("scheme");
        setBookmarkedIds(new Set(bookmarks.map((b) => b.externalId)));
      } catch (err) {
        console.error("Failed to load bookmarks", err);
      }
    }
    loadBookmarks();
  }, []);

  const filtered = useMemo(() => {
    return GOVERNMENT_SCHEMES.filter((scheme) => {
      const matchesCategory = activeCategory === "all" || scheme.category === activeCategory;
      const q = search.toLowerCase();
      const matchesSearch =
        !q ||
        scheme.name.toLowerCase().includes(q) ||
        scheme.ministry.toLowerCase().includes(q) ||
        scheme.benefits.toLowerCase().includes(q) ||
        scheme.tags.some((t) => t.includes(q));
      return matchesCategory && matchesSearch;
    });
  }, [search, activeCategory]);

  const handleBookmark = async (scheme: Scheme, isBookmarked: boolean) => {
    if (isBookmarked) {
      await addBookmark({ type: "scheme", externalId: scheme.id, name: scheme.name, data: scheme as any });
      setBookmarkedIds((prev) => {
        const next = new Set(prev);
        next.add(scheme.id);
        return next;
      });
    } else {
      await removeBookmark("scheme", scheme.id);
      setBookmarkedIds((prev) => {
        const next = new Set(prev);
        next.delete(scheme.id);
        return next;
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-20 border-b border-border/40 glass-card">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center gap-3 mb-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.push("/chat")}
              className="h-8 w-8"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="text-lg font-bold flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-primary" />
                Government Schemes
              </h1>
              <p className="text-xs text-muted-foreground">
                {GOVERNMENT_SCHEMES.length} curated schemes · Updated regularly
              </p>
            </div>
          </div>

          {/* Search */}
          <div className="relative mb-3">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search schemes by name, ministry, or benefit..."
              className="w-full pl-9 pr-4 py-2.5 bg-input border border-border rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-primary placeholder:text-muted-foreground"
            />
          </div>

          {/* Category filters */}
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setActiveCategory(cat.value as any)}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-medium whitespace-nowrap transition-all flex-shrink-0",
                  activeCategory === cat.value
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-card border-border text-muted-foreground hover:border-primary/40 hover:text-foreground"
                )}
              >
                <span>{cat.icon}</span>
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-muted-foreground">
            Showing <span className="text-foreground font-medium">{filtered.length}</span> schemes
            {activeCategory !== "all" && ` in ${activeCategory}`}
            {search && ` matching "${search}"`}
          </p>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Filter className="h-3.5 w-3.5" />
            <span>Save schemes to your Dashboard</span>
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-4xl mb-4">🔍</p>
            <p className="text-muted-foreground">No schemes found for &quot;{search}&quot;</p>
            <Button
              variant="ghost"
              size="sm"
              className="mt-3"
              onClick={() => { setSearch(""); setActiveCategory("all"); }}
            >
              Clear filters
            </Button>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((scheme) => (
              <SchemeCard
                key={scheme.id}
                scheme={scheme}
                isBookmarked={bookmarkedIds.has(scheme.id)}
                onBookmark={handleBookmark}
              />
            ))}
          </div>
        )}

        {/* Disclaimer */}
        <div className="mt-10 p-4 rounded-xl border border-border/40 bg-card text-center">
          <p className="text-xs text-muted-foreground leading-relaxed">
            ⚠️ Scheme details may change. Always verify eligibility, deadlines, and benefits from official government portals before applying.
            Visit <a href="https://myscheme.gov.in" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">myscheme.gov.in</a> for the most up-to-date information.
          </p>
        </div>
      </div>
    </div>
  );
}
