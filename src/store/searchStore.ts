import { create } from "zustand";

type SearchStore = {
  isSearchVisible: boolean;
  setSearchVisible: (visible: boolean) => void;
  focusSearchInput: () => void;
  searchInputRef: React.RefObject<HTMLInputElement> | null;
  setSearchInputRef: (ref: React.RefObject<HTMLInputElement>) => void;
};

export const useSearchStore = create<SearchStore>((set, get) => ({
  isSearchVisible: false,
  setSearchVisible: (visible) => set({ isSearchVisible: visible }),
  focusSearchInput: () => {
    const { searchInputRef } = get();
    searchInputRef?.current?.focus();
  },
  searchInputRef: null,
  setSearchInputRef: (ref) => set({ searchInputRef: ref }),
}));
