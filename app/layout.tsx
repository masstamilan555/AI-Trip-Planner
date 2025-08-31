import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { ConvexClientProvider } from "./ConvexClientProvider";

// app/layout.tsx (or your RootLayout file)
export const metadata: Metadata = {
  title: "Mass Trip Planner",
  description: "Make travel plans with friends, family, or colleagues.",
  themeColor: "#22c55e", // green (Tailwind emerald-500)
  icons: {
    icon: "/favicon.ico",            // default favicon
    shortcut: "/favicon.ico",        // pinned shortcuts (Windows)
    apple: "/apple-touch-icon.png",  // iOS home screen
    other: [
      { rel: "android-chrome-192x192.png", url: "/android-chrome-192x192.png" },
      { rel: "android-chrome-512x512.png", url: "/android-chrome-512x512.png" },
    ],
    // you can also provide sizes/type entries:
    // { url: '/android-chrome-192x192.png', type: 'image/png', sizes: '192x192' }
  },
};


const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    
      <html lang="en">
        <body className={outfit.className}>
          <ClerkProvider><ConvexClientProvider>{children}</ConvexClientProvider></ClerkProvider>
        </body>
      </html>
    
  );
}
