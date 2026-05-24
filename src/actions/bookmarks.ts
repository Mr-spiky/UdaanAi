"use server";

import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export interface BookmarkData {
  type: "scheme" | "job" | "internship";
  externalId: string;
  name: string;
  data?: Record<string, any>;
}

export async function addBookmark(bookmark: BookmarkData) {
  const session = await getSession();
  if (!session?.userId) throw new Error("Not authenticated");

  const result = await prisma.bookmark.upsert({
    where: {
      userId_type_externalId: {
        userId: session.userId,
        type: bookmark.type,
        externalId: bookmark.externalId,
      },
    },
    create: {
      userId: session.userId,
      type: bookmark.type,
      externalId: bookmark.externalId,
      name: bookmark.name,
      data: JSON.stringify(bookmark.data || {}),
    },
    update: {
      name: bookmark.name,
      data: JSON.stringify(bookmark.data || {}),
    },
  });

  revalidatePath("/dashboard");
  return result;
}

export async function removeBookmark(type: string, externalId: string) {
  const session = await getSession();
  if (!session?.userId) throw new Error("Not authenticated");

  await prisma.bookmark.deleteMany({
    where: { userId: session.userId, type, externalId },
  });

  revalidatePath("/dashboard");
}

export async function getBookmarks(type?: string) {
  const session = await getSession();
  if (!session?.userId) return [];

  const bookmarks = await prisma.bookmark.findMany({
    where: {
      userId: session.userId,
      ...(type ? { type } : {}),
    },
    orderBy: { createdAt: "desc" },
  });

  return bookmarks.map((b) => ({
    ...b,
    data: (() => {
      try { return JSON.parse(b.data); } catch { return {}; }
    })(),
  }));
}

export async function isBookmarked(type: string, externalId: string) {
  const session = await getSession();
  if (!session?.userId) return false;

  const found = await prisma.bookmark.findUnique({
    where: {
      userId_type_externalId: {
        userId: session.userId,
        type,
        externalId,
      },
    },
  });

  return !!found;
}
