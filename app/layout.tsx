import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import ReactQueryProvider from "@/components/react-query-provider";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/components/theme-provider";

const geist = Geist({ subsets: ["latin"], weight: ["400", "600"] });

export const metadata: Metadata = {
  title: "Oggi",
  description:
    "Oggi is a powerful note-taking app that lets you create folders, organize notes, and collaborate with others in real time. Boost your productivity with a clean, intuitive interface.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={`${geist.className}`}>
          <ReactQueryProvider>
            <ThemeProvider
              attribute={"class"}
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              {children}
            </ThemeProvider>
          </ReactQueryProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
