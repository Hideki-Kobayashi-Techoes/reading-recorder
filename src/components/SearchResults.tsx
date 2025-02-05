"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import placeholder from "../../public/placeholder.svg";

export default function SearchResults({ books }: { books: SearchResult[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {books.map((book) => (
        <Link href={`/record?id=${book.id}`} key={book.id}>
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
              <p className="text-sm text-gray-600">{book.authors.join(", ")}</p>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}
