"use client";

import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useCallback,
  useRef,
} from "react";
import { useChat as useAIChat } from "@ai-sdk/react";
import { Message } from "ai";

interface AttachedImage {
  base64: string;
  mimeType: string;
  name: string;
  previewUrl: string;
}

interface ChatContextProps {
  conversationId?: string;
  initialMessages?: Message[];
}

interface ChatContextType {
  messages: Message[];
  input: string;
  handleInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  /**
   * handleSubmit accepts optional attached images.
   * Images are sent as multipart content parts for Gemma 4 Vision.
   */
  handleSubmit: (
    e: React.FormEvent<HTMLFormElement>,
    attachedImages?: AttachedImage[]
  ) => void;
  status: string;
  isLoading: boolean;
  stop: () => void;
  error: Error | undefined;
  // Document context (PDF text injection)
  activeDocumentId: string | null;
  activeDocumentName: string | null;
  activeDocumentText: string | null;
  setActiveDocument: (
    id: string | null,
    name: string | null,
    text: string | null
  ) => void;
  clearDocument: () => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatProvider({
  children,
  conversationId,
  initialMessages = [],
}: ChatContextProps & { children: ReactNode }) {
  const [activeDocumentId, setActiveDocumentId] = useState<string | null>(null);
  const [activeDocumentName, setActiveDocumentName] = useState<string | null>(null);
  const [activeDocumentText, setActiveDocumentText] = useState<string | null>(null);

  // Pending images to attach to the next message
  const pendingImagesRef = useRef<AttachedImage[]>([]);

  const setActiveDocument = useCallback(
    (id: string | null, name: string | null, text: string | null) => {
      setActiveDocumentId(id);
      setActiveDocumentName(name);
      setActiveDocumentText(text);
    },
    []
  );

  const clearDocument = useCallback(() => {
    setActiveDocumentId(null);
    setActiveDocumentName(null);
    setActiveDocumentText(null);
  }, []);

  const {
    messages,
    input,
    handleInputChange,
    handleSubmit: aiHandleSubmit,
    status,
    stop,
    append,
    error,
    setInput,
  } = useAIChat({
    api: "/api/chat",
    initialMessages,
    body: {
      conversationId,
      documentContext: activeDocumentText,
    },
  });

  /**
   * Custom submit that builds multipart content when images are attached.
   * Text-only → standard string content (unchanged behaviour).
   * With images → content array: [text part] + [image parts] for Gemma 4 Vision.
   */
  const handleSubmit = useCallback(
    (
      e: React.FormEvent<HTMLFormElement>,
      attachedImages?: AttachedImage[]
    ) => {
      e.preventDefault();

      const options = {
        body: {
          conversationId,
          documentContext: activeDocumentText,
        },
      };

      const attachments: any[] = [];
      if (activeDocumentName) {
        attachments.push({
          name: activeDocumentName,
          contentType: "application/pdf",
          url: "",
        });
      }

      if (attachedImages && attachedImages.length > 0) {
        // Build multipart message for Gemma 4 Vision
        const contentParts: any[] = [
          { type: "text", text: input || "Please analyze this image and help me with it." },
          ...attachedImages.map((img) => ({
            type: "image",
            image: img.base64,
            mimeType: img.mimeType,
          })),
        ];

        append({
          role: "user",
          content: contentParts,
          experimental_attachments: attachments.length > 0 ? attachments : undefined,
        } as any, options);
        setInput("");
      } else if (activeDocumentName) {
        // Text message with PDF attachment
        append({
          role: "user",
          content: input,
          experimental_attachments: attachments,
        } as any, options);
        setInput("");
      } else {
        // Standard text-only submit
        aiHandleSubmit(e, options);
      }
    },
    [input, append, aiHandleSubmit, conversationId, activeDocumentText, activeDocumentName, setInput]
  );

  return (
    <ChatContext.Provider
      value={{
        messages,
        input,
        handleInputChange,
        handleSubmit,
        status,
        isLoading: status === "streaming" || status === "submitted",
        stop,
        error,
        activeDocumentId,
        activeDocumentName,
        activeDocumentText,
        setActiveDocument,
        clearDocument,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
}