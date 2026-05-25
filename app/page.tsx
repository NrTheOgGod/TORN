// app/page.tsx — Home page (replaces GET / + views/home.ejs)
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getLatestChapter, getMangaById } from "@/lib/db";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "TORN - Read Latest Releases",
};

export default async function HomePage() {
  const latestChapter = getLatestChapter();
  const manga = latestChapter ? getMangaById(latestChapter.mangaId) : null;

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
                  src={
                    manga?.coverImage ||
                    "/images/torn/chapters/chapter1/ch1_cover.jpg"
                  }
                  alt={`CH ${latestChapter.chapterNumber}: ${
                    latestChapter.title ?? ""
                  }`}
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
  className="w-full border-t border-neutral-900 bg-[#0e0f11] py-16 px-6 scroll-mt-20"
>
  <div className="w-full max-w-6xl mx-auto">
    
    {/* Master Dark Container (50% Opacity Background) */}
    <div className="border border-neutral-900 bg-[#111214]/50 rounded-xl p-8 md:p-12 shadow-2xl backdrop-blur-sm">
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">

        {/* Left Side: Bios */}
        <div className="lg:col-span-6 space-y-8">
          
          <div className="space-y-2">
            <h4 className="text-xs font-mono tracking-widest text-red-600 uppercase font-bold">
              ABOUT OUR STORY
            </h4>
            <p className="text-neutral-400 text-sm leading-relaxed">
              We welcome you to the journey of <span className="text-neutral-200 font-medium">TORN</span>. 
              The story of a struggling middle-aged man, set in a post-apocalyptic world where countless horrors await. 
              Join him on his journey as he carves his way forward.
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="text-xs font-mono tracking-widest text-red-600 uppercase font-bold">
              ABOUT OUR TEAM
            </h4>
            <p className="text-neutral-400 text-sm leading-relaxed">
              We are just a bunch of unemployed artists who, by the grace of God, randomly met on Discord. 
              As our ideas collided, we decided to create something of our own. This is just the beginning; 
              we have a lot to uncover. As the story unfolds, join us in this creative journey.
            </p>
          </div>
          
        </div>

        {/* Right Side: Roster */}
        <div className="lg:col-span-6 space-y-6 lg:border-l lg:border-neutral-800/60 lg:pl-12">
          
          {/* Subdued Compact Title */}
          <h3 className="text-xs font-mono font-bold text-neutral-400 uppercase tracking-[0.2em]">
            MEET OUR TEAM
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
            
            {/* Art Column */}
            <div className="space-y-3">
              <div className="border-l border-red-600 pl-3">
                <h4 className="text-xs font-mono font-bold text-red-500 tracking-widest uppercase">
                  ART
                </h4>
              </div>
              <div className="text-sm text-neutral-400 space-y-1.5 font-sans tracking-wide pl-3">
                <p>Charan Ankam</p>
                <p>Norvin Rodrigues</p>
                <p>Arthav Patil</p>
              </div>
            </div>

            {/* Story Column */}
            <div className="space-y-3">
              <div className="border-l border-red-600 pl-3">
                <h4 className="text-xs font-mono font-bold text-red-500 tracking-widest uppercase">
                  STORY
                </h4>
              </div>
              <div className="text-sm text-neutral-400 space-y-1.5 font-sans tracking-wide pl-3">
                <p>Samarth Parmar</p>
                <p>Prabuddha Singh</p>
                <p>Jishnu Chowdhury</p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>

  </div>
</section>
      <Footer />
    </>
  );
}