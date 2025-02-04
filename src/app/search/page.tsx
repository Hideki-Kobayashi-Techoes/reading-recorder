"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import SearchForm from "@/components/SearchForm"
import SearchResults from "@/components/SearchResults"
import { useMediaQuery } from "@/hooks/use-media-query"

// 仮の検索関数（実際にはGoogle Books APIを使用します）
const searchBooks = async (query: string) => {
  // この関数は実際にはAPIを呼び出します
  return [
    { id: "1", title: "検索結果の本1", authors: ["著者1"], thumbnail: "/placeholder.svg" },
    { id: "2", title: "検索結果の本2", authors: ["著者2", "著者3"], thumbnail: "/placeholder.svg" },
  ]
}

export default function SearchPage() {
  const [searchResults, setSearchResults] = useState<SearchResult[]>([])
  // クエリパラメータを取得
  const searchParams = useSearchParams()
  // q=の値を取得、なかったら空文字を設定
  const initialQuery = searchParams.get("q") || ""
  // 768px以上の場合はワイドスクリーンとする
  const isWideScreen = useMediaQuery("(min-width: 768px)")

  useEffect(() => {
    // 初期クエリがあれば検索を実行
    if (initialQuery) {
      handleSearch(initialQuery)
    }
  }, [initialQuery])

  const handleSearch = async (query: string) => {
    const results = await searchBooks(query)
    setSearchResults(results)
  }

  return (
    <div className="container mx-auto px-4 py-8 pt-24">
      <h1 className="text-3xl font-bold mb-8">本を検索</h1>
      {/* ワイドスクリーンではなかった場合は検索フォームを表示 */}
      {!isWideScreen && <SearchForm onSearch={handleSearch} />}
      <SearchResults books={searchResults} />
    </div>
  )
}

