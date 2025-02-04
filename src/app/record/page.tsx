"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Image from "next/image";

// 仮の本の詳細を取得する関数（実際にはAPIを使用します）
const getBookDetails = async (id: string) => {
  // この関数は実際にはAPIを呼び出します
  return {
    id,
    title: "選択された本",
    authors: ["著者"],
    thumbnail: "/placeholder.svg",
  };
};

export default function RecordPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const bookId = searchParams.get("id");
  const [book, setBook] = useState<SearchResult | null>(null);
  const [status, setStatus] = useState("");
  const [rating, setRating] = useState("");
  const [review, setReview] = useState("");

  useEffect(() => {
    if (bookId) {
      getBookDetails(bookId).then((book) => setBook(book));
    }
  }, [bookId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: 記録の送信を実装する
    console.log("記録を送信:", { bookId, status, rating, review });
    // 記録後、ホームページにリダイレクト
    router.push("/");
  };

  if (!book) return <div>読み込み中...</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">読書記録</h1>
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">{book.title}</h2>
        <p className="text-gray-600 mb-2">{book.authors.join(", ")}</p>
        <Image
          src={book.thumbnail || "/placeholder.svg"}
          alt={book.title}
          className="w-32 h-48 object-cover"
          width={128}
          height={192}
        />
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
              <SelectItem value="reading">読書中</SelectItem>
              <SelectItem value="completed">読了</SelectItem>
              <SelectItem value="plan">読みたい</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <label
            htmlFor="rating"
            className="block text-sm font-medium text-gray-700"
          >
            評価
          </label>
          <Select onValueChange={setRating}>
            <SelectTrigger id="rating">
              <SelectValue placeholder="評価を選択" />
            </SelectTrigger>
            <SelectContent>
              {[1, 2, 3, 4, 5].map((value) => (
                <SelectItem key={value} value={value.toString()}>
                  {value} 星
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
