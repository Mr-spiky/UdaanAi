import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const session = await getSession();
    if (!session?.userId) {
      return new Response(JSON.stringify({ error: "Authentication required" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return new Response(JSON.stringify({ error: "No file provided" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Validate file type
    const allowedTypes = ["application/pdf", "text/plain"];
    const isAllowed = allowedTypes.includes(file.type) || file.name.endsWith(".pdf") || file.name.endsWith(".txt");
    if (!isAllowed) {
      return new Response(
        JSON.stringify({ error: "Only PDF and text files are supported" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Validate file size (max 10MB)
    const MAX_SIZE = 10 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      return new Response(
        JSON.stringify({ error: "File too large. Maximum size is 10MB." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    let extractedText = "";

    // Extract text from PDF or plain text
    if (file.type === "application/pdf" || file.name.endsWith(".pdf")) {
      try {
        const pdfParseModule = await import("pdf-parse");
        const pdfParse = (pdfParseModule.default || pdfParseModule) as unknown as (
          dataBuffer: Buffer,
          options?: any
        ) => Promise<{ text: string }>;
        const pdfData = await pdfParse(buffer);
        extractedText = pdfData.text;
      } catch (err) {
        console.error("PDF parsing error:", err);
        return new Response(
          JSON.stringify({ error: "Could not read the PDF. Make sure it's a valid, text-based PDF." }),
          { status: 400, headers: { "Content-Type": "application/json" } }
        );
      }
    } else {
      // Plain text file
      extractedText = buffer.toString("utf-8");
    }

    if (!extractedText.trim()) {
      return new Response(
        JSON.stringify({ error: "No readable text found in this file. It may be a scanned image PDF." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Save to database
    const document = await prisma.document.create({
      data: {
        userId: session.userId,
        name: file.name,
        mimeType: file.type || "application/pdf",
        sizeBytes: file.size,
        extractedText: extractedText.slice(0, 50000), // cap at 50k chars
      },
    });

    return new Response(
      JSON.stringify({
        success: true,
        documentId: document.id,
        name: document.name,
        extractedText: extractedText.slice(0, 50000),
        previewText: extractedText.slice(0, 200) + "...",
        charCount: extractedText.length,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Upload error:", error);
    return new Response(JSON.stringify({ error: "Upload failed. Please try again." }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export const maxDuration = 30;
