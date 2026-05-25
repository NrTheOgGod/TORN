// lib/db.ts — Placeholder data (no database connected)
// Replace this with your actual data source when ready.

export interface Chapter {
  _id: string;
  mangaId: string;
  chapterNumber: number;
  title?: string;
  pages: string[];
  downloadUrl?: string;
  pdfUrl?: string;
  releaseDate: Date;
}

export interface Manga {
  _id: string;
  title: string;
  description?: string;
  coverImage?: string;
  author?: string;
  artist?: string;
  createdAt: Date;
}

// Sample data — replace with real DB queries when you connect a database
const chapters: Chapter[] = [
  {
    _id: "1",
    mangaId: "manga-1",
    chapterNumber: 1,
    title: "The Beginning",
    pages: [
      "/images/torn/chapters/chapter1/ch1_1.jpg",
      "/images/torn/chapters/chapter1/ch1_2.jpg",
      "/images/torn/chapters/chapter1/ch1_3.jpg",
      "/images/torn/chapters/chapter1/ch1_4.jpg",
    ],
    downloadUrl: "/api/download/ch/1",
    pdfUrl: "/uploads/pdfs/chapter-1.pdf",
    releaseDate: new Date("2026-01-15"),
  },
];

const mangas: Manga[] = [
  {
    _id: "manga-1",
    title: "TORN",
    description: "An epic manga series",
    coverImage: "/images/torn/chapters/chapter1/ch1_cover.jpg",
    author: "Author Name",
    artist: "Artist Name",
    createdAt: new Date("2026-01-01"),
  },
];

export function getChapters(): Chapter[] {
  return [...chapters].sort((a, b) => a.chapterNumber - b.chapterNumber);
}

export function getLatestChapter(): Chapter | null {
  if (chapters.length === 0) return null;
  return [...chapters].sort(
    (a, b) => b.releaseDate.getTime() - a.releaseDate.getTime()
  )[0];
}

export function getChapterByNumber(num: number): Chapter | null {
  return chapters.find((ch) => ch.chapterNumber === num) ?? null;
}

export function getMangas(): Manga[] {
  return [...mangas];
}

export function getMangaById(id: string): Manga | null {
  return mangas.find((m) => m._id === id) ?? null;
}
