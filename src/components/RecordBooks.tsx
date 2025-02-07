"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import placeholder from "../../public/placeholder.svg";

export default function RecordBooks({ books }: { books: RecordedBook[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {books.map((book) => (
        <Link href={`/edit/${book.id}`} key={book.id}>
          <Card className="cursor-pointer hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="line-clamp-2">{book.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <Image
                src={book.thumbnail || placeholder}
                alt={book.title}
                className="w-full h-48 object-contain mb-2"
                width={128}
                height={192}
              />
              <p className="text-sm text-gray-600">状態: {book.status}</p>
              <p className="text-sm text-gray-600">評価: {book.rating}</p>
              <p className="text-sm text-gray-600">記録日: {new Date(book.createdAt).toLocaleDateString("ja-JP")}</p>
              <p className="text-sm text-gray-600 line-clamp-2">レビュー: {book.review}</p>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}
