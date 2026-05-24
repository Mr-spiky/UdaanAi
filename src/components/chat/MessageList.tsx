"use client";

import { Message } from "ai";
import ReactMarkdown from "react-markdown";
import { cn } from "@/lib/utils";
import { FileText } from "lucide-react";

interface MessageListProps {
  messages: Message[];
  isLoading: boolean;
}

/** Extract plain text from a message — handles both string and multi-part content */
function getMessageText(content: any): string {
  if (typeof content === "string") return content;
  if (Array.isArray(content)) {
    return content
      .filter((p: any) => p.type === "text")
      .map((p: any) => p.text as string)
      .join(" ");
  }
  return "";
}

/** Check if a message has image parts */
function getImages(content: any): { url: string; alt: string }[] {
  if (!Array.isArray(content)) return [];
  return content
    .filter((p: any) => p.type === "image" || p.type === "image_url")
    .map((p: any, i) => ({
      url: p.image ? `data:${p.mimeType};base64,${p.image}` : p.image_url?.url ?? "",
      alt: `Attached image ${i + 1}`,
    }));
}

export function MessageList({ messages, isLoading }: MessageListProps) {
  return (
    <div className="space-y-6">
      {messages.map((message) => {
        const text = getMessageText(message.content);
        const images = getImages(message.content);
        const hasAttachment = Array.isArray(message.content) && message.content.length > 1;

        return (
          <div
            key={message.id}
            className={cn(
              "flex gap-3 message-enter",
              message.role === "user" ? "justify-end" : "justify-start"
            )}
          >
            {/* AI Avatar */}
            {message.role === "assistant" && (
              <div className="w-8 h-8 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-base">🦅</span>
              </div>
            )}

            {/* Bubble */}
            <div
              className={cn(
                "max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed space-y-2",
                message.role === "user"
                  ? "bg-primary text-primary-foreground rounded-br-sm"
                  : "bg-card border border-border/60 text-foreground rounded-bl-sm"
              )}
            >
              {/* Image attachments */}
              {images.length > 0 && (
                <div className="flex gap-2 flex-wrap mb-1">
                  {images.map((img, i) => (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      key={i}
                      src={img.url}
                      alt={img.alt}
                      className="h-24 w-24 object-cover rounded-lg border border-white/20"
                    />
                  ))}
                </div>
              )}

              {/* PDF / document indicator for user messages */}
              {message.role === "user" && hasAttachment && images.length === 0 && (
                <div className="flex items-center gap-1.5 text-xs text-primary-foreground/70 bg-white/10 px-2.5 py-1 rounded-lg w-fit">
                  <FileText className="h-3 w-3" />
                  <span>Document attached</span>
                </div>
              )}

              {/* Text content */}
              {text && (
                message.role === "user" ? (
                  <p className="whitespace-pre-wrap">{text}</p>
                ) : (
                  <div className="prose prose-invert prose-sm max-w-none prose-p:leading-relaxed prose-headings:font-semibold prose-headings:text-foreground prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-strong:text-foreground prose-code:text-primary prose-code:bg-primary/10 prose-code:px-1 prose-code:rounded prose-pre:bg-secondary prose-pre:border prose-pre:border-border/40 prose-ul:my-2 prose-li:my-0.5 prose-blockquote:border-primary/40 prose-blockquote:text-muted-foreground">
                    <ReactMarkdown>{text}</ReactMarkdown>
                  </div>
                )
              )}
            </div>

            {/* User Avatar */}
            {message.role === "user" && (
              <div className="w-8 h-8 rounded-xl bg-secondary border border-border/60 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs font-bold text-muted-foreground">You</span>
              </div>
            )}
          </div>
        );
      })}

      {/* Loading indicator */}
      {isLoading && (
        <div className="flex gap-3 justify-start message-enter">
          <div className="w-8 h-8 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
            <span className="text-base">🦅</span>
          </div>
          <div className="bg-card border border-border/60 rounded-2xl rounded-bl-sm px-4 py-3">
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-primary typing-dot" />
              <div className="w-1.5 h-1.5 rounded-full bg-primary typing-dot" />
              <div className="w-1.5 h-1.5 rounded-full bg-primary typing-dot" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}