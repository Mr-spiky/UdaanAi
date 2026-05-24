import { getUser } from "@/actions";
import { getProfile } from "@/actions/profile";
import { getConversations } from "@/actions/conversations";
import { getBookmarks } from "@/actions/bookmarks";
import { getDocuments } from "@/actions/documents";
import { redirect } from "next/navigation";
import { DashboardClient } from "./dashboard-client";

export default async function DashboardPage() {
  const user = await getUser();
  if (!user) redirect("/");

  const [profile, conversations, bookmarks, documents] = await Promise.all([
    getProfile(),
    getConversations(),
    getBookmarks(),
    getDocuments(),
  ]);

  return (
    <DashboardClient
      user={user}
      profile={profile}
      conversations={conversations}
      bookmarks={bookmarks}
      documents={documents}
    />
  );
}
