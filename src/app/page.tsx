"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useSearchStore } from "@/store/searchStore";
import RecordBooks from "@/components/RecordBooks";

const getRecordedBooks = async (): Promise<RecordedBook[]> => {
  const existingRecords: string | null = localStorage.getItem("bookRecords");
  const records: RecordedBook[] = existingRecords ? JSON.parse(existingRecords) : [];
  return records;
};

export default function HomePage() {
  const [recordedBooks, setRecordedBooks] = useState<RecordedBook[]>([]);
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
            <RecordBooks books={recordedBooks} />
          </>
        )}
      </main>
    </div>
  );
}
