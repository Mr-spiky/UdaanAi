"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { ChatProvider } from "@/lib/contexts/chat-context";
import { ChatSidebar } from "./ChatSidebar";
import { ChatInterface } from "./ChatInterface";
import { createConversation } from "@/actions/conversations";

interface Conversation {
  id: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
}

interface Profile {
  name?: string | null;
  state?: string | null;
  education?: string | null;
  category?: string | null;
}

interface ChatLayoutProps {
  user: { id: string; email: string };
  conversations: Conversation[];
  activeConversationId: string;
  profile: Profile | null;
}

export function ChatLayout({
  user,
  conversations: initialConversations,
  activeConversationId,
  profile,
}: ChatLayoutProps) {
  const router = useRouter();
  const [conversations, setConversations] = useState(initialConversations);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleNewChat = useCallback(async () => {
    const conv = await createConversation("New Conversation");
    setConversations((prev) => [conv, ...prev]);
    router.push(`/chat?id=${conv.id}`);
  }, [router]);

  const handleConversationSelect = useCallback(
    (id: string) => {
      router.push(`/chat?id=${id}`);
    },
    [router]
  );

  return (
    <div className="h-screen w-screen flex overflow-hidden bg-background">
      {/* Sidebar */}
      <ChatSidebar
        user={user}
        conversations={conversations}
        activeConversationId={activeConversationId}
        profile={profile}
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen((v) => !v)}
        onNewChat={handleNewChat}
        onSelectConversation={handleConversationSelect}
      />

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <ChatProvider conversationId={activeConversationId}>
          <ChatInterface
            conversationId={activeConversationId}
            sidebarOpen={sidebarOpen}
            onToggleSidebar={() => setSidebarOpen((v) => !v)}
            profile={profile}
          />
        </ChatProvider>
      </div>
    </div>
  );
}
