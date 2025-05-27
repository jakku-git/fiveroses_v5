import type React from "react"
import { Inter } from "next/font/google"
import "./globals.css"
import ClientLayout from "./ClientLayout"
import { metadata } from "./metadata"
import ViewportHandler from "./components/ViewportHandler"

const inter = Inter({ 
  subsets: ["latin"],
  display: 'swap',
  preload: true,
  adjustFontFallback: true,
  variable: '--font-inter',
})

export { metadata }

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${inter.className}`}>
      <body className="bg-black text-white">
        <ViewportHandler />
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  )
}
