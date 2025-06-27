import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Alias Gen - Create Multiple Email Aliases",
  description:
    "Generate unlimited email aliases for better privacy and organization. Perfect for avoiding spam and tracking email usage.",
  keywords: "email alias, email generator, privacy, spam protection, email organization",
  authors: [{ name: "Dimuth Nilanjana", url: "https://www.dimuthnilanjana.com" }],
  creator: "Dimuth Nilanjana",
  openGraph: {
    title: "Email Alias Generator",
    description: "Generate unlimited email aliases for better privacy and organization",
    url: "https://www.dimuthnilanjana.com",
    siteName: "AliasGen",
    type: "website",
  },
   
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
