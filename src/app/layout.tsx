import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Udaan AI — Helping India's Students Rise",
  description:
    "Udaan AI is your AI-powered mentor for career guidance, government schemes, scholarships, jobs, and internships. Built for Indian students, freshers, and job seekers.",
  keywords: [
    "government schemes India",
    "scholarships for students",
    "career guidance AI",
    "jobs for freshers",
    "internships India",
    "PMKVY",
    "NSP scholarship",
    "AI mentor India",
  ],
  authors: [{ name: "Udaan AI" }],
  openGraph: {
    title: "Udaan AI — Helping India's Students Rise",
    description: "Your AI mentor for career guidance, government schemes, and opportunity discovery.",
    type: "website",
    locale: "en_IN",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${geistMono.variable} antialiased font-sans`}>
        {children}
      </body>
    </html>
  );
}
