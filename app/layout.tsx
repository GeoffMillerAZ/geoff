import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Sidebar } from "@/components/sidebar"
import { MobileNav } from "@/components/mobile-nav"

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-sans"
})

export const metadata: Metadata = {
  title: "Geoffrey Miller | Cloud Architect",
  description: "Infrastructure Director & Principal Cloud Architect - 20+ years building high-performance engineering teams.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`} suppressHydrationWarning>
        <div className="synthwave-grid min-h-screen">
          <MobileNav />
          <Sidebar />
          <main className="lg:pl-64 pt-16 lg:pt-0 min-h-screen">
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}
