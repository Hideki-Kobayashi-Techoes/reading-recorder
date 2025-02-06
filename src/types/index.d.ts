type RecordedBook = {
  id: string;
  title: string;
  authors: string[];
  thumbnail: string;
  status: string;
  rating: string;
  review: string;
};

type SearchResult = {
  id: string;
  title: string;
  authors: string[];
  thumbnail: string;
  description: string;
  publishedDate?: string;
  publisher: string;
};

type GoogleBookItem = {
  id: string;
  volumeInfo: {
    title: string;
    authors?: string[];
    imageLinks?: {
      thumbnail?: string;
    };
    description?: string;
    publishedDate?: string;
    publisher?: string;
  };
};