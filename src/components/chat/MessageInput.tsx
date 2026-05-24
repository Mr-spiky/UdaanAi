"use client";

import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { useChat } from "@/lib/contexts/chat-context";
import {
  Send,
  Square,
  Paperclip,
  X,
  FileText,
  Loader2,
  ImageIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface AttachedImage {
  base64: string;
  mimeType: string;
  name: string;
  previewUrl: string;
}

interface MessageInputProps {
  input: string;
  onInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSubmit: (
    e: React.FormEvent<HTMLFormElement>,
    attachedImages?: AttachedImage[]
  ) => void;
  isLoading: boolean;
  onStop: () => void;
}

export function MessageInput({
  input,
  onInputChange,
  onSubmit,
  isLoading,
  onStop,
}: MessageInputProps) {
  const { activeDocumentName, setActiveDocument, clearDocument } = useChat();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [attachedImages, setAttachedImages] = useState<AttachedImage[]>([]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if ((input.trim() || attachedImages.length > 0) && !isLoading) {
        const form = e.currentTarget.closest("form");
        if (form) form.requestSubmit();
      }
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onInputChange(e);
    const el = e.target;
    el.style.height = "auto";
    el.style.height = Math.min(el.scrollHeight, 200) + "px";
  };

  // ── PDF / document upload → extract text via /api/upload ───────────────
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setUploadError(null);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        setUploadError(data.error || "Upload failed");
        return;
      }

      setActiveDocument(
        data.documentId,
        data.name,
        data.extractedText || data.previewText
      );
    } catch {
      setUploadError("Upload failed. Please try again.");
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  // ── Image upload → base64 encode for Gemma 4 vision ──────────────────
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    // Max 3 images at a time (Gemma 4 context limit)
    const remaining = 3 - attachedImages.length;
    const toProcess = files.slice(0, remaining);

    const converted = await Promise.all(
      toProcess.map(
        (file) =>
          new Promise<AttachedImage>((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => {
              const dataUrl = reader.result as string;
              // dataUrl = "data:image/jpeg;base64,XXXX"
              const [meta, base64] = dataUrl.split(",");
              const mimeType = meta.split(":")[1].split(";")[0];
              resolve({
                base64,
                mimeType,
                name: file.name,
                previewUrl: dataUrl,
              });
            };
            reader.onerror = reject;
            reader.readAsDataURL(file);
          })
      )
    );

    setAttachedImages((prev) => [...prev, ...converted]);
    if (imageInputRef.current) imageInputRef.current.value = "";
  };

  const removeImage = (index: number) => {
    setAttachedImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    onSubmit(e, attachedImages.length > 0 ? attachedImages : undefined);
    // Clear attached images after send
    setAttachedImages([]);
  };

  const canSend = (input.trim() || attachedImages.length > 0) && !isLoading;

  return (
    <div className="space-y-2">
      {/* Active document badge */}
      {activeDocumentName && (
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-primary/10 border border-primary/20 text-sm">
          <FileText className="h-3.5 w-3.5 text-primary" />
          <span className="text-primary text-xs font-medium flex-1 truncate">
            {activeDocumentName}
          </span>
          <button
            onClick={clearDocument}
            className="text-primary/60 hover:text-primary transition-colors"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      )}

      {/* Attached image previews */}
      {attachedImages.length > 0 && (
        <div className="flex gap-2 flex-wrap">
          {attachedImages.map((img, i) => (
            <div key={i} className="relative group">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={img.previewUrl}
                alt={img.name}
                className="h-16 w-16 object-cover rounded-lg border border-border"
              />
              <button
                type="button"
                onClick={() => removeImage(i)}
                className="absolute -top-1.5 -right-1.5 bg-destructive text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Upload error */}
      {uploadError && (
        <div className="text-xs text-destructive px-2">{uploadError}</div>
      )}

      {/* Input box */}
      <form onSubmit={handleFormSubmit} className="relative">
        <div className="flex items-end gap-2 p-2 rounded-xl border border-border/60 bg-card focus-within:border-primary/40 transition-colors">
          {/* PDF upload button */}
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="flex-shrink-0 p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors disabled:opacity-50 mb-0.5"
            title="Upload PDF or document"
          >
            {uploading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Paperclip className="h-4 w-4" />
            )}
          </button>

          {/* Image upload button — Gemma 4 Vision */}
          <button
            type="button"
            onClick={() => imageInputRef.current?.click()}
            disabled={attachedImages.length >= 3}
            className="flex-shrink-0 p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors disabled:opacity-50 mb-0.5"
            title="Upload image (marksheet, ID card, question paper)"
          >
            <ImageIcon className="h-4 w-4" />
          </button>

          {/* Hidden file inputs */}
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.txt"
            onChange={handleFileUpload}
            className="hidden"
          />
          <input
            ref={imageInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            multiple
            onChange={handleImageUpload}
            className="hidden"
          />

          {/* Textarea */}
          <textarea
            ref={textareaRef}
            value={input}
            onChange={handleInput}
            onKeyDown={handleKeyDown}
            placeholder="Ask about schemes, career, jobs… upload a PDF or image 📷"
            rows={1}
            className={cn(
              "flex-1 resize-none bg-transparent text-sm text-foreground placeholder:text-muted-foreground",
              "focus:outline-none min-h-[36px] max-h-[200px] py-2 leading-relaxed"
            )}
            disabled={isLoading}
          />

          {/* Send / Stop button */}
          {isLoading ? (
            <Button
              type="button"
              size="icon"
              onClick={onStop}
              className="h-8 w-8 flex-shrink-0 bg-destructive hover:bg-destructive/90 rounded-lg mb-0.5"
            >
              <Square className="h-3.5 w-3.5" />
            </Button>
          ) : (
            <Button
              type="submit"
              size="icon"
              disabled={!canSend}
              className="h-8 w-8 flex-shrink-0 bg-primary hover:bg-primary/90 rounded-lg mb-0.5 disabled:opacity-40"
            >
              <Send className="h-3.5 w-3.5" />
            </Button>
          )}
        </div>
      </form>

      {/* Hint: image support */}
      {attachedImages.length === 0 && !activeDocumentName && (
        <p className="text-[10px] text-muted-foreground/50 text-center">
          📷 You can upload images (marksheets, ID cards, question papers) — Gemma 4 can read them
        </p>
      )}
    </div>
  );
}