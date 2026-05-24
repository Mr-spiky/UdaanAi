import { getUser } from "@/actions";
import { redirect } from "next/navigation";
import LandingPage from "@/components/landing/LandingPage";

export default async function Home({
  searchParams,
}: {
  searchParams: { auth?: string };
}) {
  const user = await getUser();
  const params = searchParams;

  // Authenticated users go straight to chat
  if (user) {
    redirect("/chat");
  }

  // Show landing page for anonymous users
  const openAuth = params.auth === "required";
  return <LandingPage openAuth={openAuth} />;
}
