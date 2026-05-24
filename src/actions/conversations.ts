"use server";

import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function createConversation(title?: string) {
  const session = await getSession();
  if (!session?.userId) throw new Error("Not authenticated");

  const conversation = await prisma.conversation.create({
    data: {
      userId: session.userId,
      title: title || "New Conversation",
      messages: "[]",
    },
  });

  revalidatePath("/chat");
  return conversation;
}

export async function getConversations() {
  const session = await getSession();
  if (!session?.userId) return [];

  return prisma.conversation.findMany({
    where: { userId: session.userId },
    orderBy: { updatedAt: "desc" },
    select: {
      id: true,
      title: true,
      createdAt: true,
      updatedAt: true,
    },
  });
}

export async function getConversation(id: string) {
  const session = await getSession();
  if (!session?.userId) throw new Error("Not authenticated");

  const conversation = await prisma.conversation.findUnique({
    where: { id, userId: session.userId },
  });

  if (!conversation) throw new Error("Conversation not found");

  return {
    ...conversation,
    messages: JSON.parse(conversation.messages),
  };
}

export async function deleteConversation(id: string) {
  const session = await getSession();
  if (!session?.userId) throw new Error("Not authenticated");

  await prisma.conversation.delete({
    where: { id, userId: session.userId },
  });

  revalidatePath("/chat");
}

export async function renameConversation(id: string, title: string) {
  const session = await getSession();
  if (!session?.userId) throw new Error("Not authenticated");

  await prisma.conversation.update({
    where: { id, userId: session.userId },
    data: { title: title.slice(0, 100) },
  });

  revalidatePath("/chat");
}
