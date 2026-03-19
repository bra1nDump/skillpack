import { IBM_Plex_Mono, Lato } from "next/font/google";

import { AppLayout } from "@/components/app-layout";

import type { Metadata } from "next";

import "./globals.css";

const lato = Lato({
  variable: "--font-lato",
  subsets: ["latin"],
  weight: ["400", "700", "900"],
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "SkillPack — Skills for Claude Code",
  description:
    "The skill marketplace for Claude Code. Community-rated, retention-tracked, and ranked.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${lato.variable} ${ibmPlexMono.variable} antialiased`}
      >
        <AppLayout>{children}</AppLayout>
      </body>
    </html>
  );
}
