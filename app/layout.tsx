// app/layout.tsx — Root layout (replaces the repeated HTML shell in every EJS file)
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TORN - Digital Comics",
  description: "Read the latest TORN comic releases online",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#0b0c0d] text-gray-200 font-sans min-h-screen flex flex-col">
        {children}
      </body>
    </html>
  );
}
