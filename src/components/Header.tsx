"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, ArrowLeft } from "lucide-react";

export default function Header() {
  const [query, setQuery] = useState("");
  const [isWideScreen, setIsWideScreen] = useState<boolean>(false);
  const [isSearchVisible, setIsSearchVisible] = useState<boolean>(false);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const checkScreenWidth = () => {
      setIsWideScreen(window.innerWidth >= 768);
    };

    // 検索ページの場合は検索フォームを表示
    if (pathname === "/search") {
      setIsSearchVisible(true);
    } else {
      setIsSearchVisible(false);
    }

    checkScreenWidth();
    window.addEventListener("resize", checkScreenWidth);
    return () => window.removeEventListener("resize", checkScreenWidth);
  }, [pathname, searchParams]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <header className="bg-blue-600 text-white py-4 fixed top-0 left-0 right-0 z-10">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {!isWideScreen && isSearchVisible ? (
            <div className="flex items-center flex-1 gap-2">
              <Button
                variant="ghost"
                onClick={() => setIsSearchVisible(false)}
                className="p-4"
              >
                <ArrowLeft className="h-6 w-6" />
                <span className="sr-only">戻る</span>
              </Button>
              <form onSubmit={handleSearch} className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                  <Input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="本を検索..."
                    className="text-black w-full pl-10"
                    autoFocus
                  />
                </div>
              </form>
            </div>
          ) : (
            <>
              <Link href="/" className="text-2xl font-bold">
                Reading Recorder
              </Link>
              {!isWideScreen && (
                <Button
                  variant="ghost"
                  onClick={() => setIsSearchVisible(true)}
                  className="p-4"
                >
                  <Search className="h-6 w-6" />
                  <span className="sr-only">検索</span>
                </Button>
              )}
            </>
          )}
          {isWideScreen && (
            <form onSubmit={handleSearch} className="flex-1 max-w-md ml-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                <Input
                  ref={searchInputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="本を検索..."
                  className="text-black pl-10 w-full"
                />
              </div>
            </form>
          )}
        </div>
      </div>
    </header>
  );
}
