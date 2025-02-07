"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Image from "next/image";

const getBookDetails = async (id: string) => {
  const records = JSON.parse(localStorage.getItem("bookRecords") || "[]");
  const record = records.find((record: RecordedBook) => record.id === id);
  return record;
};

export default function EditPage() {
  const { id } = useParams();
  const router = useRouter();
  const [book, setBook] = useState<RecordedBook | null>(null);
  const [status, setStatus] = useState("");
  const [rating, setRating] = useState("");
  const [review, setReview] = useState("");

  useEffect(() => {
    getBookDetails(id as string).then((bookDetails) => {
      setBook(bookDetails);
      setStatus(bookDetails.status);
      setRating(bookDetails.rating);
      setReview(bookDetails.review);
    });
  }, [id]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const records = JSON.parse(localStorage.getItem("bookRecords") || "[]");
    const recordIndex = records.findIndex(
      (record: RecordedBook) => record.id === id
    );

    if (recordIndex !== -1) {
      // 既存のレコードを更新
      records[recordIndex] = {
        ...records[recordIndex],
        status,
        rating,
        review,
        createdAt: new Date().toISOString(),
      };

      localStorage.setItem("bookRecords", JSON.stringify(records));
      router.push("/");
    }
  };

  if (!book) return <div>読み込み中...</div>;

  return (
    <div className="container mx-auto px-4 py-8 pt-24">
      <h1 className="text-3xl font-bold mb-8">読書記録の編集</h1>
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
          <Select value={status} onValueChange={setStatus}>
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
          <Select value={rating} onValueChange={setRating}>
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
        <Button type="submit">更新</Button>
      </form>
    </div>
  );
}
