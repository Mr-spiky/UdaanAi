"use server";

import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function getDocuments() {
  const session = await getSession();
  if (!session?.userId) return [];

  return prisma.document.findMany({
    where: { userId: session.userId },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      name: true,
      mimeType: true,
      sizeBytes: true,
      createdAt: true,
    },
  });
}

export async function getDocument(id: string) {
  const session = await getSession();
  if (!session?.userId) throw new Error("Not authenticated");

  const doc = await prisma.document.findUnique({
    where: { id, userId: session.userId },
  });

  if (!doc) throw new Error("Document not found");
  return doc;
}

export async function deleteDocument(id: string) {
  const session = await getSession();
  if (!session?.userId) throw new Error("Not authenticated");

  await prisma.document.delete({
    where: { id, userId: session.userId },
  });

  revalidatePath("/dashboard");
}

export async function getDocumentStats() {
  const session = await getSession();
  if (!session?.userId) return { count: 0, totalBytes: 0 };

  const docs = await prisma.document.findMany({
    where: { userId: session.userId },
    select: { sizeBytes: true },
  });

  return {
    count: docs.length,
    totalBytes: docs.reduce((sum, d) => sum + (d.sizeBytes || 0), 0),
  };
}
