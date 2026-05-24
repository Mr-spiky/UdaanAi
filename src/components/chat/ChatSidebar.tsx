"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AuthDialog } from "@/components/auth/AuthDialog";
import { deleteConversation } from "@/actions/conversations";
import { signOut } from "@/actions";
import {
  Plus, MessageSquare, ChevronLeft, ChevronRight,
  Trash2, User, LogOut, Settings, Landmark, Briefcase,
  BookOpen, ExternalLink
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Conversation {
  id: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
}

interface ChatSidebarProps {
  user: { id: string; email: string };
  conversations: Conversation[];
  activeConversationId: string;
  profile: { name?: string | null; state?: string | null; education?: string | null; category?: string | null } | null;
  isOpen: boolean;
  onToggle: () => void;
  onNewChat: () => void;
  onSelectConversation: (id: string) => void;
}

const QUICK_LINKS = [
  { icon: Landmark, label: "Browse Schemes", href: "/schemes" },
  { icon: Briefcase, label: "Jobs & Internships", href: "/jobs" },
  { icon: BookOpen, label: "My Dashboard", href: "/dashboard" },
];

export function ChatSidebar({
  user,
  conversations,
  activeConversationId,
  profile,
  isOpen,
  onToggle,
  onNewChat,
  onSelectConversation,
}: ChatSidebarProps) {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setDeletingId(id);
    try {
      await deleteConversation(id);
      if (id === activeConversationId) {
        router.push("/chat");
      }
    } finally {
      setDeletingId(null);
    }
  };

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <>
      {/* Sidebar */}
      <div
        className={cn(
          "flex flex-col border-r border-border/50 bg-sidebar transition-all duration-300 ease-in-out overflow-hidden",
          isOpen ? "w-64" : "w-0"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border/40">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center flex-shrink-0">
              <span className="text-primary-foreground font-bold text-xs">U</span>
            </div>
            <span className="font-bold text-sm">
              <span className="gradient-text">Udaan</span>{" "}
              <span className="text-sidebar-foreground/60">AI</span>
            </span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggle}
            className="h-7 w-7 text-sidebar-foreground/50 hover:text-sidebar-foreground"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
        </div>

        {/* New Chat Button */}
        <div className="p-3">
          <Button
            onClick={onNewChat}
            className="w-full justify-start gap-2 bg-primary/10 text-primary hover:bg-primary/20 border border-primary/20 h-9"
            variant="ghost"
          >
            <Plus className="h-4 w-4" />
            <span className="text-sm font-medium">New Chat</span>
          </Button>
        </div>

        {/* Quick Links */}
        <div className="px-3 pb-2">
          {QUICK_LINKS.map((link) => (
            <button
              key={link.href}
              onClick={() => router.push(link.href)}
              className="w-full flex items-center gap-2.5 px-2 py-1.5 rounded-lg text-sidebar-foreground/60 hover:text-sidebar-foreground hover:bg-sidebar-accent transition-colors text-sm"
            >
              <link.icon className="h-3.5 w-3.5" />
              {link.label}
              <ExternalLink className="h-3 w-3 ml-auto opacity-0 group-hover:opacity-100" />
            </button>
          ))}
        </div>

        {/* Conversations */}
        <div className="flex-1 overflow-hidden">
          <div className="px-3 pb-1">
            <span className="text-xs font-medium text-sidebar-foreground/40 uppercase tracking-wider">
              Recent Chats
            </span>
          </div>
          <ScrollArea className="flex-1 h-[calc(100%-28px)]">
            <div className="px-2 pb-2 space-y-0.5">
              {conversations.length === 0 ? (
                <div className="px-3 py-6 text-center">
                  <MessageSquare className="h-8 w-8 text-sidebar-foreground/20 mx-auto mb-2" />
                  <p className="text-xs text-sidebar-foreground/40">No conversations yet</p>
                </div>
              ) : (
                conversations.map((conv) => (
                  <div
                    key={conv.id}
                    onClick={() => onSelectConversation(conv.id)}
                    className={cn(
                      "group flex items-center gap-2 px-2 py-2 rounded-lg cursor-pointer transition-all text-sm",
                      conv.id === activeConversationId
                        ? "bg-sidebar-accent text-sidebar-foreground"
                        : "text-sidebar-foreground/60 hover:text-sidebar-foreground hover:bg-sidebar-accent/50"
                    )}
                  >
                    <MessageSquare className="h-3.5 w-3.5 flex-shrink-0" />
                    <span className="flex-1 truncate text-xs">{conv.title}</span>
                    <button
                      onClick={(e) => handleDelete(e, conv.id)}
                      disabled={deletingId === conv.id}
                      className="opacity-0 group-hover:opacity-100 p-0.5 rounded hover:text-destructive transition-all"
                    >
                      <Trash2 className="h-3 w-3" />
                    </button>
                  </div>
                ))
              )}
            </div>
          </ScrollArea>
        </div>

        {/* User footer */}
        <div className="border-t border-border/40 p-3">
          {profile?.name ? (
            <div className="flex items-center gap-2 mb-2 px-2">
              <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                <span className="text-primary text-xs font-bold">{profile.name[0]}</span>
              </div>
              <div className="min-w-0">
                <p className="text-xs font-medium text-sidebar-foreground truncate">{profile.name}</p>
                <p className="text-[10px] text-sidebar-foreground/40 truncate">{profile.state || profile.education || ""}</p>
              </div>
            </div>
          ) : null}
          <div className="flex gap-1">
            <button
              onClick={() => router.push("/profile")}
              className="flex-1 flex items-center gap-1.5 px-2 py-1.5 rounded-lg text-xs text-sidebar-foreground/50 hover:text-sidebar-foreground hover:bg-sidebar-accent transition-colors"
            >
              <Settings className="h-3.5 w-3.5" />
              Profile
            </button>
            <button
              onClick={handleSignOut}
              className="flex-1 flex items-center gap-1.5 px-2 py-1.5 rounded-lg text-xs text-sidebar-foreground/50 hover:text-destructive hover:bg-destructive/10 transition-colors"
            >
              <LogOut className="h-3.5 w-3.5" />
              Sign Out
            </button>
          </div>
        </div>
      </div>

      {/* Collapsed toggle button */}
      {!isOpen && (
        <button
          onClick={onToggle}
          className="absolute left-0 top-4 z-10 p-2 rounded-r-lg bg-sidebar border border-l-0 border-border/50 text-sidebar-foreground/50 hover:text-sidebar-foreground transition-colors"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      )}
    </>
  );
}
