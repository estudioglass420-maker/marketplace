import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "MiMarket",
  description: "Tienda online",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body>
        {children}

        <a
          href="https://wa.me/523327151113"
          target="_blank"
          className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white w-16 h-16 rounded-full flex items-center justify-center text-3xl shadow-2xl"
        >
          💬
        </a>
      </body>
    </html>
  )
}