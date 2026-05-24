"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Scheme } from "@/lib/knowledge/schemes";
import {
  Landmark, ExternalLink, Bookmark, BookmarkCheck,
  ChevronDown, ChevronUp, IndianRupee, Clock, Users
} from "lucide-react";
import { cn } from "@/lib/utils";

const CATEGORY_COLORS: Record<Scheme["category"], { badge: string; icon: string; bg: string }> = {
  scholarship: { badge: "info", icon: "🎓", bg: "bg-blue-500/10 border-blue-500/20" },
  skill:        { badge: "success", icon: "⚡", bg: "bg-green-500/10 border-green-500/20" },
  employment:   { badge: "warning", icon: "💼", bg: "bg-amber-500/10 border-amber-500/20" },
  startup:      { badge: "default", icon: "🚀", bg: "bg-primary/10 border-primary/20" },
  education:    { badge: "info", icon: "📚", bg: "bg-blue-500/10 border-blue-500/20" },
  women:        { badge: "warning", icon: "👩", bg: "bg-pink-500/10 border-pink-500/20" },
  rural:        { badge: "success", icon: "🌾", bg: "bg-green-500/10 border-green-500/20" },
  housing:      { badge: "outline", icon: "🏠", bg: "bg-secondary border-border" },
  health:       { badge: "destructive", icon: "🏥", bg: "bg-red-500/10 border-red-500/20" },
};

interface SchemeCardProps {
  scheme: Scheme;
  compact?: boolean;
  onBookmark?: (scheme: Scheme, isBookmarked: boolean) => void;
  isBookmarked?: boolean;
}

export function SchemeCard({ scheme, compact = false, onBookmark, isBookmarked = false }: SchemeCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [bookmarked, setBookmarked] = useState(isBookmarked);
  const style = CATEGORY_COLORS[scheme.category] || CATEGORY_COLORS.education;

  const handleBookmark = (e: React.MouseEvent) => {
    e.stopPropagation();
    const next = !bookmarked;
    setBookmarked(next);
    onBookmark?.(scheme, next);
  };

  return (
    <div
      className={cn(
        "rounded-xl border transition-all duration-200 overflow-hidden",
        style.bg,
        "hover:scale-[1.01] cursor-pointer"
      )}
      onClick={() => !compact && setExpanded((v) => !v)}
    >
      {/* Header */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3 flex-1 min-w-0">
            <span className="text-2xl flex-shrink-0 mt-0.5">{style.icon}</span>
            <div className="min-w-0">
              <h3 className="font-semibold text-sm text-foreground leading-snug mb-1">
                {scheme.name}
              </h3>
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <Landmark className="h-3 w-3 flex-shrink-0" />
                {scheme.ministry}
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-1.5 flex-shrink-0">
            {onBookmark && (
              <button
                onClick={handleBookmark}
                className={cn(
                  "p-1.5 rounded-lg transition-all",
                  bookmarked
                    ? "text-primary bg-primary/20"
                    : "text-muted-foreground hover:text-primary hover:bg-primary/10"
                )}
                title={bookmarked ? "Remove bookmark" : "Save scheme"}
              >
                {bookmarked ? (
                  <BookmarkCheck className="h-4 w-4" />
                ) : (
                  <Bookmark className="h-4 w-4" />
                )}
              </button>
            )}
            {!compact && (
              <button
                className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground transition-colors"
                onClick={(e) => { e.stopPropagation(); setExpanded((v) => !v); }}
              >
                {expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </button>
            )}
          </div>
        </div>

        {/* Key info row */}
        <div className="flex flex-wrap gap-2 mt-3">
          <Badge variant={style.badge as any} className="text-[10px]">
            {scheme.category}
          </Badge>
          {scheme.amount && (
            <span className="inline-flex items-center gap-1 text-[10px] text-green-400 bg-green-500/10 border border-green-500/20 px-2 py-0.5 rounded-full font-medium">
              <IndianRupee className="h-2.5 w-2.5" />
              {scheme.amount}
            </span>
          )}
          <span className="inline-flex items-center gap-1 text-[10px] text-muted-foreground bg-secondary border border-border px-2 py-0.5 rounded-full">
            <Clock className="h-2.5 w-2.5" />
            {scheme.deadline}
          </span>
        </div>
      </div>

      {/* Expanded details */}
      {(expanded || compact) && (
        <div className="px-4 pb-4 space-y-3 border-t border-border/30 pt-3">
          {/* Benefits */}
          <div>
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium mb-1">Benefits</p>
            <p className="text-xs text-foreground/80 leading-relaxed">{scheme.benefits}</p>
          </div>

          {/* Eligibility */}
          <div>
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium mb-1.5">
              <Users className="h-2.5 w-2.5 inline mr-1" />Eligibility
            </p>
            <div className="flex flex-wrap gap-1.5">
              {scheme.eligibility.category?.map((c) => (
                <span key={c} className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
                  {c}
                </span>
              ))}
              {scheme.eligibility.education?.map((e) => (
                <span key={e} className="text-[10px] px-2 py-0.5 rounded-full bg-secondary text-muted-foreground border border-border">
                  {e}
                </span>
              ))}
              {scheme.eligibility.income && (
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-secondary text-muted-foreground border border-border">
                  {scheme.eligibility.income}
                </span>
              )}
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1">
            {scheme.tags.slice(0, 5).map((tag) => (
              <span key={tag} className="text-[9px] px-1.5 py-0.5 rounded text-muted-foreground/60 bg-secondary/50">
                #{tag}
              </span>
            ))}
          </div>

          {/* Apply button */}
          <a
            href={scheme.portal}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="w-full"
          >
            <Button
              size="sm"
              className="w-full h-8 text-xs bg-primary/80 hover:bg-primary gap-1.5"
            >
              Apply Now
              <ExternalLink className="h-3 w-3" />
            </Button>
          </a>
        </div>
      )}
    </div>
  );
}
