import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter, Cormorant_Garamond } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import ClientLayout from "./ClientLayout"
import GlobalErrorHandler from "./error-boundary"

const inter = Inter({ 
  subsets: ["latin"],
  display: 'swap',
  adjustFontFallback: true,
  variable: '--font-inter',
})

const cormorantGaramond = Cormorant_Garamond({
  weight: ['400', '500', '600'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-cormorant-garamond',
})

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
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
    <html lang="en" className={`${inter.variable} ${inter.className} ${cormorantGaramond.variable}`}>
      <body className="bg-black text-white">
        <GlobalErrorHandler />
        <ClientLayout>{children}</ClientLayout>
        <Analytics />
      </body>
    </html>
  )
}
