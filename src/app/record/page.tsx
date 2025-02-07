"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Image from "next/image";

const getBookDetails = async (id: string): Promise<SearchResult> => {
  const response = await fetch(`/api/books/${id}`);
  if (!response.ok) {
    throw new Error("本の詳細の取得に失敗しました");
  }
  return response.json();
};

export default function RecordPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const bookId = searchParams.get("id");
  const [book, setBook] = useState<SearchResult | null>(null);
  const [status, setStatus] = useState("");
  const [rating, setRating] = useState("");
  const [review, setReview] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!bookId) return;

    getBookDetails(bookId)
      .then((book) => {
        setBook(book);
      })
      .catch((err) => {
        setError("本の詳細の取得に失敗しました");
        console.error(err);
      });
  }, [bookId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (!book) {
        throw new Error("本の詳細が取得できません");
      }

      // localStorageから既存の記録を取得
      const existingRecords = localStorage.getItem("bookRecords");
      const records = existingRecords ? JSON.parse(existingRecords) : [];

      // 記録データを作成
      const record: RecordedBook = {
        id: self.crypto.randomUUID(),
        title: book?.title,
        authors: book?.authors,
        thumbnail: book?.thumbnail,
        price: book?.price,
        publisher: book?.publisher,
        publishedDate: book?.publishedDate,
        status,
        rating,
        review,
        createdAt: new Date().toISOString(),
      };

      // 記録データを追加
      records.push(record);

      // localStorageに保存
      localStorage.setItem("bookRecords", JSON.stringify(records));

      router.push("/");
    } catch (error) {
      console.error("エラー:", error);
      setError("記録の送信に失敗しました");
    }
  };

  if (error) return <div className="text-red-500">{error}</div>;
  if (!book) return <div>読み込み中...</div>;

  return (
    <div className="container mx-auto px-4 py-8 pt-24">
      <h1 className="text-3xl font-bold mb-8">読書記録</h1>
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">{book.title}</h2>
        <div className="flex gap-6">
          <Image
            src={book.thumbnail || "/placeholder.svg"}
            alt={book.title}
            className="w-32 h-48 object-cover"
            width={128}
            height={192}
          />
          <div className="space-y-2">
            <p className="text-gray-600">{book.authors?.join(", ") || "-"}</p>
            <p className="text-gray-600">
              {book.price === "-" ? book.price : `${book.price}円`}
            </p>
            <p className="text-gray-600">{book.publisher}</p>
            <p className="text-gray-600">{book.publishedDate}</p>
          </div>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="status"
            className="block text-sm font-medium text-gray-700"
          >
            読書状況
          </label>
          <Select onValueChange={setStatus}>
            <SelectTrigger id="status">
              <SelectValue placeholder="状況を選択" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="読書中">読書中</SelectItem>
              <SelectItem value="読了">読了</SelectItem>
              <SelectItem value="読みたい">読みたい</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <label
            htmlFor="rating"
            className="block text-sm font-medium text-gray-700"
          >
            評価 (5段階評価)
          </label>
          <Select onValueChange={setRating}>
            <SelectTrigger id="rating">
              <SelectValue placeholder="評価を選択" />
            </SelectTrigger>
            <SelectContent>
              {[1, 2, 3, 4, 5].map((value) => (
                <SelectItem key={value} value={value.toString()}>
                  {value}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <label
            htmlFor="review"
            className="block text-sm font-medium text-gray-700"
          >
            レビュー
          </label>
          <Textarea
            id="review"
            value={review}
            onChange={(e) => setReview(e.target.value)}
            placeholder="ここにレビューを書いてください..."
            rows={4}
          />
        </div>
        <Button type="submit">記録を保存</Button>
      </form>
    </div>
  );
}
