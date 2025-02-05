import { NextResponse } from "next/server";



export async function GET(request: Request): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q");

  if (!query) {
    return NextResponse.json({ items: [] });
  }

  try {
    const response = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&maxResults=20`
    );
    const data = await response.json();

    if (!data.items) {
      return NextResponse.json({ items: [] });
    }

    const formattedData = data.items.map((item: GoogleBookItem): SearchResult => ({
      id: item.id,
      title: item.volumeInfo.title,
      authors: item.volumeInfo.authors || ["著者不明"],
      thumbnail: item.volumeInfo.imageLinks?.thumbnail || "/placeholder.svg",
      description: item.volumeInfo.description || "説明なし",
      publishedDate: item.volumeInfo.publishedDate,
      publisher: item.volumeInfo.publisher || "出版社不明",
    }));

    return NextResponse.json({ items: formattedData });
  } catch (error) {
    console.error("APIエラー:", error);
    return NextResponse.json(
      { error: "検索中にエラーが発生しました" },
      { status: 500 }
    );
  }
}
