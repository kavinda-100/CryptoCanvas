import "@/styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import { ThemeProvider } from "@/providers/ThemeProvider";

import { type Metadata } from "next";
import { Geist } from "next/font/google";
import { Header } from "@/components/Header";
import WebThreeProvider from "@/providers/WebThreeProvider";

export const metadata: Metadata = {
  title: "CryptoCanvas",
  description: "A decentralized NFT art platform on Ethereum.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${geist.variable}`}
      suppressHydrationWarning={true}
    >
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <WebThreeProvider>
            <main className="mx-auto min-h-screen max-w-[2000px] px-4 sm:px-6 lg:px-8">
              <Header />
              {children}
            </main>
          </WebThreeProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
