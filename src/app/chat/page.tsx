import { getUser } from "@/actions";
import { getConversations, createConversation } from "@/actions/conversations";
import { getProfile } from "@/actions/profile";
import { redirect } from "next/navigation";
import { ChatLayout } from "@/components/chat/ChatLayout";

export default async function ChatPage({
  searchParams,
}: {
  searchParams: Promise<{ id?: string }>;
}) {
  const user = await getUser();
  if (!user) redirect("/");

  const params = await searchParams;
  const conversations = await getConversations();
  const profile = await getProfile();

  // If a conversation ID is requested, use it; otherwise use the most recent
  let activeConversationId = params.id;

  if (!activeConversationId && conversations.length > 0) {
    activeConversationId = conversations[0].id;
  }

  // If no conversations exist, create a new one
  if (!activeConversationId) {
    const newConv = await createConversation("New Conversation");
    activeConversationId = newConv.id;
  }

  return (
    <ChatLayout
      user={user}
      conversations={conversations}
      activeConversationId={activeConversationId}
      profile={profile}
    />
  );
}
