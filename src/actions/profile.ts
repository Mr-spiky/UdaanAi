"use server";

import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export interface ProfileData {
  name?: string;
  age?: number;
  state?: string;
  district?: string;
  education?: string;
  stream?: string;
  category?: string;
  annualIncome?: number;
  employed?: boolean;
  interests?: string[];
  goals?: string[];
}

export async function saveProfile(data: ProfileData) {
  const session = await getSession();
  if (!session?.userId) throw new Error("Not authenticated");

  const profile = await prisma.userProfile.upsert({
    where: { userId: session.userId },
    create: {
      userId: session.userId,
      ...data,
      interests: JSON.stringify(data.interests || []),
      goals: JSON.stringify(data.goals || []),
    },
    update: {
      ...data,
      interests: JSON.stringify(data.interests || []),
      goals: JSON.stringify(data.goals || []),
    },
  });

  revalidatePath("/profile");
  revalidatePath("/dashboard");
  return profile;
}

export async function getProfile() {
  const session = await getSession();
  if (!session?.userId) return null;

  const profile = await prisma.userProfile.findUnique({
    where: { userId: session.userId },
  });

  if (!profile) return null;

  return {
    ...profile,
    interests: JSON.parse(profile.interests || "[]") as string[],
    goals: JSON.parse(profile.goals || "[]") as string[],
  };
}
