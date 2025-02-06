import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: { params: { id: string } }): Promise<NextResponse> {
  const id = params.id;

  try {
    const response = await fetch(`https://www.googleapis.com/books/v1/volumes/${id}`);
    const data = await response.json();

    if (!data || data.error) {
      return NextResponse.json(
        { error: "本が見つかりませんでした" },
        { status: 404 },
      );
    }

    const formattedData: SearchResult = {
      id: data.id,
      title: data.volumeInfo.title,
      authors: data.volumeInfo.authors || ["-"],
      thumbnail: data.volumeInfo.imageLinks?.thumbnail || "/placeholder.svg",
      price: data.saleInfo.listPrice?.amount || "-",
      publishedDate: data.volumeInfo.publishedDate || "-",
      publisher: data.volumeInfo.publisher || "-",
    };

    return NextResponse.json(formattedData);
  } catch (error) {
    console.error("APIエラー:", error);
    return NextResponse.json(
      { error: "本の詳細の取得に失敗しました" },
      { status: 500 }
    );
  }
}
