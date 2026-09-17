import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TypeFluentAI — Learn English by Writing",
  description:
    "A local AI-powered English writing coach that helps you improve through active practice instead of passive correction.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
