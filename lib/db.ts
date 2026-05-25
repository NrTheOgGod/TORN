// lib/db.ts — Placeholder data (no database connected)
// Replace this with your actual data source when ready.

export interface Chapter {
  _id: string;
  mangaId: string;
  chapterNumber: number;
  title?: string;
  pages: string[];
  downloadUrl?: string;
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
  // {
  //   _id: "1",
  //   mangaId: "manga-1",
  //   chapterNumber: 1,
  //   title: "The Beginning",
  //   pages: ["/uploads/chapters/ch1/page1.jpg", "/uploads/chapters/ch1/page2.jpg"],
  //   downloadUrl: "/uploads/downloads/ch1.zip",
  //   releaseDate: new Date("2026-01-15"),
  // },
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
