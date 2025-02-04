"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"

export default function Header() {
  const [query, setQuery] = useState("")
  const [isWideScreen, setIsWideScreen] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const checkScreenWidth = () => {
      setIsWideScreen(window.innerWidth >= 768) // md breakpoint
    }

    checkScreenWidth()
    window.addEventListener("resize", checkScreenWidth)
    return () => window.removeEventListener("resize", checkScreenWidth)
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`)
    }
  }

  return (
    <header className="bg-blue-600 text-white py-4 fixed top-0 left-0 right-0 z-10">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          Reading Recorder
        </Link>
        <nav className="flex items-center space-x-4">
          {/* 画面幅がmd以上の場合は検索フォームを表示 */}
          {isWideScreen ? (
            <form onSubmit={handleSearch} className="flex">
              <Input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="本を検索..."
                className="text-black"
              />
              <Button type="submit" variant="secondary" className="ml-2">
                <Search className="h-4 w-4" />
                <span className="sr-only">検索</span>
              </Button>
            </form>
          ) : (
            <Link href="/search">
              <Button variant="ghost">
                <Search className="h-4 w-4" />
                <span className="sr-only">検索</span>
              </Button>
            </Link>
          )}
        </nav>
      </div>
    </header>
  )
}

