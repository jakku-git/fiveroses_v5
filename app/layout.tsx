import type React from "react"
import type { Metadata, Viewport } from "next"
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

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#000000",
}

export const metadata: Metadata = {
  title: "fiveroses | Creative Agency",
  description:
    "Full-service marketing agency offering comprehensive marketing services, innovative web development, and a startup incubator.",
  generator: "v0.dev",
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
