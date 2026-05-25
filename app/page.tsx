// app/page.tsx — Home page (replaces GET / + views/home.ejs)
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getLatestChapter } from "@/lib/db";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "TORN - Read Latest Releases",
};

export default async function HomePage() {
  const latestChapter = getLatestChapter();

  return (
    <>
      <Header activeRoute="/" />

      <main className="w-full max-w-7xl mx-auto px-6 py-16 flex-grow flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full">
          <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
            <h1 className="text-5xl md:text-7xl font-serif font-light uppercase tracking-tight text-white leading-tight">
              READ OUR <br />
              <span className="text-red-600 font-bold block mt-2">LATEST</span>
              RELEASES
            </h1>
          </div>

          <div className="lg:col-span-6 flex justify-center lg:justify-end">
            {latestChapter ? (
              <div className="relative w-full max-w-[480px] aspect-[3/4] bg-neutral-900 rounded border border-neutral-800 overflow-hidden group shadow-2xl">
                <Image
                  src="/uploads/covers/hero-cover.jpg"
                  alt={`CH ${latestChapter.chapterNumber}: ${latestChapter.title ?? ""}`}
                  fill
                  className="object-cover group-hover:scale-105 transition duration-700"
                  priority
                />
                <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black via-black/70 to-transparent p-6 pt-20">
                  <p className="text-white font-serif text-xl tracking-wide">
                    CH {latestChapter.chapterNumber}: {latestChapter.title}
                  </p>
                  <Link
                    href={`/read/ch/${latestChapter.chapterNumber}`}
                    className="inline-block mt-3 text-xs uppercase tracking-widest font-bold border-b border-red-500 text-red-500 pb-1 hover:text-white hover:border-white transition"
                  >
                    Read Chapter Now →
                  </Link>
                </div>
              </div>
            ) : (
              <div className="w-full max-w-[480px] text-neutral-500 border border-dashed border-neutral-800 rounded px-12 py-24 text-center">
                No recent chapters published.
              </div>
            )}
          </div>
        </div>
      </main>

      {/* About Us Section */}
      <section
        id="about-us"
        className="w-full border-t border-neutral-900 bg-[#0e0f11] py-20 px-6 scroll-mt-20"
      >
        <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          <div className="lg:col-span-4 space-y-4 lg:sticky lg:top-24">
            <h4 className="text-xs font-mono tracking-widest text-red-600 uppercase font-bold">
              // WHO WE ARE
            </h4>
            <h2 className="text-4xl md:text-5xl font-serif font-light text-white uppercase tracking-tight leading-tight">
              BEHIND THE <br />
              <span className="font-bold text-white">TORN</span> STORIES
            </h2>
            <p className="text-neutral-400 text-sm leading-relaxed pt-2">
              We are an independent collective of artists, writers, and developer
              enthusiasts dedicated to building a premium, raw digital comic
              reading pipeline experience.
            </p>
          </div>

          <div className="lg:col-span-8 space-y-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="border border-neutral-800 bg-[#111214]/50 p-6 rounded space-y-3">
                <div className="w-8 h-8 rounded bg-red-600/10 flex items-center justify-center text-red-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                    />
                  </svg>
                </div>
                <h3 className="text-base font-serif font-bold text-white tracking-wide">
                  Original Narrative Craft
                </h3>
                <p className="text-xs text-neutral-500 leading-relaxed">
                  Pushing creative boundaries to craft gripping universes, heavy
                  ink styling, and sequential artwork across multi-chapter
                  timelines.
                </p>
              </div>

              <div className="border border-neutral-800 bg-[#111214]/50 p-6 rounded space-y-3">
                <div className="w-8 h-8 rounded bg-red-600/10 flex items-center justify-center text-red-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <h3 className="text-base font-serif font-bold text-white tracking-wide">
                  High Performance Pipeline
                </h3>
                <p className="text-xs text-neutral-500 leading-relaxed">
                  Engineered with asset lazy-loading parameters to ensure
                  uninterrupted downward-strip scrolling with absolute peak
                  performance optimization.
                </p>
              </div>
            </div>

            <div className="border-t border-neutral-900 pt-8 grid grid-cols-3 gap-4 text-center sm:text-left">
              <div>
                <p className="text-3xl md:text-4xl font-mono font-bold text-white tracking-tight">
                  03
                </p>
                <p className="text-[10px] font-mono tracking-widest text-neutral-600 uppercase mt-1">
                  Active Series
                </p>
              </div>
              <div>
                <p className="text-3xl md:text-4xl font-mono font-bold text-red-600 tracking-tight">
                  25K+
                </p>
                <p className="text-[10px] font-mono tracking-widest text-neutral-600 uppercase mt-1">
                  Monthly Readers
                </p>
              </div>
              <div>
                <p className="text-3xl md:text-4xl font-mono font-bold text-white tracking-tight">
                  100%
                </p>
                <p className="text-[10px] font-mono tracking-widest text-neutral-600 uppercase mt-1">
                  Creator Owned
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
