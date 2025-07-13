import { Inter } from "next/font/google"
import "./globals.css"
import ReduxProvider from "../components/ReduxProvider"
import DevTools from "@/components/DevTools"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Pokemon Explorer",
  description: "Explore and discover Pokemon with detailed information",
  keywords: "pokemon, pokedex, pokemon cards, pokemon types",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script src="https://cdn.tailwindcss.com"></script>
      </head>
      <body className={inter.className}>
        <ReduxProvider>
          <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            {children}
            <DevTools />
          </div>
        </ReduxProvider>
      </body>
    </html>
  )
}
