// app/chapters/page.tsx — Chapter index (replaces GET /chapters + views/manga.ejs)
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getChapters } from "@/lib/db";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "TORN - Read All Chapters",
};

export default async function ChaptersPage() {
  const chapters = getChapters();

  return (
    <>
      <Header activeRoute="/chapters" />

      <main className="w-full max-w-7xl mx-auto px-6 py-12 flex-grow">
        <h2 className="text-3xl font-serif tracking-widest uppercase text-center text-white mb-12 border-b border-neutral-900 pb-4">
          READ ALL CHAPTERS
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {chapters.length > 0 ? (
            chapters.map((chapter) => (
              <div
                key={chapter._id}
                className="bg-[#111214] border border-neutral-800 rounded overflow-hidden flex flex-col justify-between group hover:border-neutral-700 transition"
              >
                <div className="relative w-full aspect-[3/4] bg-neutral-950 overflow-hidden">
                  <Image
                    src={
                      chapter.pages && chapter.pages.length > 0
                        ? chapter.pages[0]
                        : "/uploads/covers/hero-cover.jpg"
                    }
                    alt={`${chapter.title ?? "Chapter"} preview`}
                    fill
                    className="object-cover group-hover:scale-[1.02] transition duration-500"
                  />
                </div>
                <div className="p-5 space-y-4">
                  <div>
                    <h4 className="text-sm font-mono tracking-wider text-neutral-500 uppercase">
                      CH {chapter.chapterNumber}
                    </h4>
                    <h3 className="text-lg font-serif font-bold text-white tracking-wide mt-0.5 truncate">
                      {chapter.title || "UNTITLED"}
                    </h3>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Link
                      href={`/read/ch/${chapter.chapterNumber}`}
                      className="flex-grow text-center text-xs font-bold bg-neutral-800 text-white py-2.5 rounded tracking-widest hover:bg-white hover:text-black transition"
                    >
                      READ
                    </Link>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full py-16 text-center text-neutral-500 border border-dashed border-neutral-800 rounded">
              No records discovered in the collection space yet.
            </div>
          )}

          {/* Coming Soon placeholder card */}
          <div className="bg-[#111214]/40 border border-dashed border-neutral-800 rounded overflow-hidden flex flex-col justify-between">
            <div className="relative w-full aspect-[3/4] bg-neutral-950/20 flex flex-col items-center justify-center p-6 text-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-neutral-700 mb-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              <h4 className="text-sm font-mono tracking-wider text-neutral-600 uppercase">
                CH ..
              </h4>
              <h3 className="text-base font-serif font-bold text-neutral-500 tracking-wide mt-1">
                COMING SOON
              </h3>
            </div>
            <div className="p-5">
              <button
                disabled
                className="w-full text-center text-xs font-bold bg-neutral-900 text-neutral-700 py-2.5 rounded tracking-widest cursor-not-allowed"
              >
                LOCKED
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
