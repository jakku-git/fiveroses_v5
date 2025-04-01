import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import ClientLayout from "./ClientLayout"

const inter = Inter({ 
  subsets: ["latin"],
  display: 'swap',
  preload: true,
  adjustFontFallback: true,
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: "fiveroses | Marketing Agency",
  description:
    "Full-service marketing agency offering comprehensive marketing services, innovative web development, and a startup incubator.",
  generator: "v0.dev",
  viewport: "width=device-width, initial-scale=1",
  themeColor: "#000000",
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${inter.className}`}>
      <body className="bg-black text-white">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  )
}
