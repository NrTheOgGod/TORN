// app/read/ch/[num]/page.tsx

import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getChapterByNumber } from "@/lib/db";

export const dynamic = "force-dynamic";

interface ReaderPageProps {
  params: Promise<{ num: string }>;
}

export async function generateMetadata({ params }: ReaderPageProps) {
  const { num } = await params;

  const chapter = getChapterByNumber(Number(num));

  if (!chapter) {
    return { title: "Chapter Not Found" };
  }

  return {
    title: `TORN - CH ${chapter.chapterNumber}: ${chapter.title ?? ""}`,
  };
}

export default async function ReaderPage({
  params,
}: ReaderPageProps) {
  const { num } = await params;

  const chapter = getChapterByNumber(Number(num));

  if (!chapter) {
    notFound();
  }

  return (
    <>
      {/* Sticky Reader Toolbar */}
      <div className="sticky top-0 z-50 w-full bg-[#111214]/90 backdrop-blur-md border-b border-neutral-900 px-6 py-4 flex justify-between items-center shadow-lg">

        {/* Back */}
        <Link
          href="/chapters"
          className="text-xs font-bold uppercase tracking-widest text-neutral-400 hover:text-white transition flex items-center gap-2"
        >
          ← Back to Chapters
        </Link>

        {/* Title */}
        <h2 className="text-xs font-mono tracking-widest uppercase text-neutral-400">
          READING:
          <span className="text-white font-sans font-bold ml-2">
            CHAPTER {chapter.chapterNumber}
            {chapter.title ? ` - ${chapter.title}` : ""}
          </span>
        </h2>

        {/* Top Download Icon */}
        {chapter.pdfUrl ? (
          <a
            href={`/api/download/pdf/${chapter.chapterNumber}`}
            download={`Chapter-${chapter.chapterNumber}.pdf`}
            title="Download PDF"
            aria-label="Download PDF"
            className="
              flex items-center justify-center
              w-10 h-10
              rounded-full
              bg-white/10
              text-white/50
              hover:bg-white/20
              hover:text-white
              transition
              backdrop-blur-sm
            "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 3v12m0 0 4-4m-4 4-4-4M5 21h14"
              />
            </svg>
          </a>
        ) : (
          <div className="w-10 h-10" />
        )}
      </div>

      {/* Reader Images */}
      <main className="flex flex-col items-center w-full max-w-[800px] mx-auto bg-black shadow-2xl flex-grow">

        {chapter.pages?.length ? (
          chapter.pages.map((pagePath, index) => (
            <Image
              key={index}
              src={pagePath}
              alt={`Page ${index + 1}`}
              width={800}
              height={1200}
              className="w-full h-auto select-none pointer-events-none mb-1"
              loading={index === 0 ? "eager" : "lazy"}
              priority={index === 0}
            />
          ))
        ) : (
          <div className="py-24 text-center text-neutral-500 font-mono">
            No scanned pages found.
          </div>
        )}

      </main>

      {/* Bottom Section */}
      <section className="w-full bg-[#111214] py-16 flex flex-col items-center border-t border-neutral-900 text-center px-6">

        <h3 className="text-2xl font-serif mb-2 text-white">
          You&apos;ve reached the end of Chapter {chapter.chapterNumber}
        </h3>

        <p className="text-sm text-neutral-500 mb-6 max-w-sm">
          Support the creators by sharing the link.
        </p>

        {chapter.pdfUrl && (
          <div className="mb-8">
            <a
              href={`/api/download/pdf/${chapter.chapterNumber}`}
              download={`Chapter-${chapter.chapterNumber}.pdf`}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded text-sm font-bold uppercase transition"
            >
              Download PDF
            </a>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-4">

          {chapter.chapterNumber > 1 && (
            <Link
              href={`/read/ch/${chapter.chapterNumber - 1}`}
              className="bg-neutral-900 border border-neutral-700 text-white px-8 py-3 rounded text-sm font-bold uppercase hover:bg-neutral-800"
            >
              ← Previous Chapter
            </Link>
          )}

          <Link
            href="/chapters"
            className="bg-white text-black px-8 py-3 rounded text-sm font-bold uppercase hover:bg-neutral-200"
          >
            Chapter Directory
          </Link>

          <Link
            href={`/read/ch/${chapter.chapterNumber + 1}`}
            className="bg-neutral-900 border border-neutral-700 text-white px-8 py-3 rounded text-sm font-bold uppercase hover:bg-neutral-800"
          >
            Next Chapter →
          </Link>

        </div>
      </section>
    </>
  );
}