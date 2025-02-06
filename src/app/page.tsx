"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { useSearchStore } from "@/store/searchStore";
// 仮の記録された本を取得する関数（実際にはAPIを使用します）
const getRecordedBooks = async () => {
  // この関数は実際にはAPIを呼び出します
  return [
    { id: "1", title: "記録された本1", authors: ["著者1"], thumbnail: "/placeholder.svg", status: "読了" },
    { id: "2", title: "記録された本2", authors: ["著者2"], thumbnail: "/placeholder.svg", status: "読書中" },
  ]
}

export default function HomePage() {
  const { setSearchVisible, focusSearchInput } = useSearchStore();

  useEffect(() => {
    getRecordedBooks().then(setRecordedBooks);
  }, []);

  const handleSearchClick = () => {
    if (window.innerWidth >= 768) {
      focusSearchInput();
    } else {
      setSearchVisible(true);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white pt-16">
      <main className="container mx-auto px-4 py-16">
        {/* 読書記録が0件の場合LPを表示 */}
        {recordedBooks.length === 0 ? (
          <>
            <h1 className="text-4xl font-bold text-center mb-8">Reading Recorder</h1>
            <p className="text-xl text-center mb-12">簡単に本を検索し、あなたの読書の旅を記録しましょう。</p>
            <div className="space-y-8">
              <section className="text-center">
                <h2 className="text-2xl font-semibold mb-4">機能</h2>
                <ul className="list-disc list-inside text-left max-w-md mx-auto">
                  <li>Google Books APIを使用した本の検索</li>
                  <li>詳細な本の情報の表示</li>
                  <li>読んだ本の記録</li>
                  <li>読書の進捗管理</li>
                </ul>
              </section>
              <section className="text-center">
                <h2 className="text-2xl font-semibold mb-4">始めましょう</h2>
                <Button size="lg" onClick={handleSearchClick}>本を検索する</Button>
              </section>
            </div>
          </>
        ) : (
          <>
            <h1 className="text-4xl font-bold text-center mb-8">あなたの読書記録</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {recordedBooks.map((book) => (
                <Link href={`/edit/${book.id}`} key={book.id}>
                  <Card className="cursor-pointer hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle className="line-clamp-2">{book.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Image
                        src={book.thumbnail || "/placeholder.svg"}
                        alt={book.title}
                        className="w-full h-48 object-cover mb-2"
                        width={128}
                        height={192}
                      />
                      <p className="text-sm text-gray-600">{book.authors.join(", ")}</p>
                      <p className="text-sm font-semibold mt-2">状態: {book.status}</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
}

