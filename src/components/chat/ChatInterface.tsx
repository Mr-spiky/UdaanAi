"use client";

import { useRef, useEffect } from "react";
import { useChat } from "@/lib/contexts/chat-context";
import { MessageList } from "./MessageList";
import { MessageInput } from "./MessageInput";
import { PanelLeft, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const WELCOME_PROMPTS = [
  { icon: "🏛️", text: "What scholarships can I apply for?" },
  { icon: "💼", text: "Help me plan my career path" },
  { icon: "🎓", text: "I want to learn coding from scratch" },
  { icon: "📄", text: "Explain PMKVY scheme to me" },
];

interface ChatInterfaceProps {
  conversationId: string;
  sidebarOpen: boolean;
  onToggleSidebar: () => void;
  profile: { name?: string | null } | null;
}

export function ChatInterface({
  conversationId,
  sidebarOpen,
  onToggleSidebar,
  profile,
}: ChatInterfaceProps) {
  const { messages, handleSubmit, input, handleInputChange, isLoading, stop, error } = useChat();
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleQuickPrompt = (text: string) => {
    // Simulate input change and submit
    const syntheticEvent = {
      target: { value: text },
    } as React.ChangeEvent<HTMLTextAreaElement>;
    handleInputChange(syntheticEvent);
  };

  const isEmpty = messages.length === 0;

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="h-14 border-b border-border/40 flex items-center px-4 gap-3 flex-shrink-0">
        {!sidebarOpen && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleSidebar}
            className="h-8 w-8 text-muted-foreground"
          >
            <PanelLeft className="h-4 w-4" />
          </Button>
        )}
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded bg-primary/20 flex items-center justify-center">
            <Sparkles className="h-3 w-3 text-primary" />
          </div>
          <span className="text-sm font-medium text-foreground/80">Udaan AI Mentor</span>
        </div>
        <span className="text-xs text-muted-foreground ml-auto flex items-center gap-1">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
          Gemma 4
        </span>
      </div>

      {/* Messages or Welcome Screen */}
      <div className="flex-1 overflow-y-auto">
        {isEmpty ? (
          <div className="h-full flex flex-col items-center justify-center px-4 py-12">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-6">
              <span className="text-3xl">🦅</span>
            </div>
            <h2 className="text-2xl font-bold mb-2 text-center">
              {profile?.name ? `Namaste, ${profile.name}! 🙏` : "Namaste! 🙏"}
            </h2>
            <p className="text-muted-foreground text-center mb-10 max-w-md text-sm leading-relaxed">
              I&apos;m Udaan AI, your personal mentor. Ask me about government schemes, career guidance, jobs, internships, or upload a document to analyze.
            </p>

            {/* Quick prompt cards */}
            <div className="grid grid-cols-2 gap-3 max-w-lg w-full">
              {WELCOME_PROMPTS.map((prompt, i) => (
                <button
                  key={i}
                  onClick={() => handleQuickPrompt(prompt.text)}
                  className="flex items-center gap-3 p-3.5 rounded-xl border border-border/60 bg-card hover:border-primary/40 hover:bg-primary/5 transition-all duration-200 text-left group"
                >
                  <span className="text-xl">{prompt.icon}</span>
                  <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors leading-snug">
                    {prompt.text}
                  </span>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="max-w-3xl mx-auto px-4 py-6 space-y-4">
            <MessageList messages={messages} isLoading={isLoading} />
            {error && (
              <div className="p-4 rounded-xl border border-destructive/20 bg-destructive/5 text-destructive text-sm flex flex-col gap-2 animate-in fade-in slide-in-from-bottom-2 duration-200">
                <div className="flex items-center gap-2">
                  <span className="text-base">⚠️</span>
                  <span className="font-semibold text-foreground">API Connection Issue</span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {error.message || "An unexpected error occurred while communicating with the AI. Please verify your connection."}
                </p>
                {(error.message?.includes("GOOGLE_AI_API_KEY") || error.message?.includes("API key")) && (
                  <div className="mt-2 text-xs border-t border-border/40 pt-2 flex flex-col gap-1.5 text-foreground/80">
                    <span className="font-medium text-primary">To resolve this error:</span>
                    <span>1. Open the <code className="bg-secondary text-foreground px-1.5 py-0.5 rounded text-[10px] font-mono">.env</code> file in the project root directory.</span>
                    <span>2. Get a free API Key instantly from <a href="https://aistudio.google.com/" target="_blank" rel="noreferrer" className="underline font-semibold text-primary hover:text-primary/80">Google AI Studio</a>.</span>
                    <span>3. Paste your key in: <code className="bg-secondary text-foreground px-1.5 py-0.5 rounded text-[10px] font-mono">GOOGLE_AI_API_KEY=&quot;your_api_key_here&quot;</code>.</span>
                    <span>4. Save the file and reload the chat page!</span>
                  </div>
                )}
              </div>
            )}
            <div ref={bottomRef} />
          </div>
        )}
      </div>

      {/* Input */}
      <div className="border-t border-border/40 p-4 flex-shrink-0">
        <div className="max-w-3xl mx-auto">
          <MessageInput
            input={input}
            onInputChange={handleInputChange}
            onSubmit={(e, images) => handleSubmit(e, images)}
            isLoading={isLoading}
            onStop={stop}
          />
          <p className="text-center text-[10px] text-muted-foreground mt-2">
            Udaan AI can make mistakes. Always verify from official government portals.
          </p>
        </div>
      </div>
    </div>
  );
}
