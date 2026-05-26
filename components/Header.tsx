// components/Header.tsx — Shared site header (Fixed for mobile responsiveness)
import Link from "next/link";

interface HeaderProps {
  activeRoute?: string;
}

export default function Header({ activeRoute }: HeaderProps) {
  return (
    // Changed h-20 to py-4 md:h-20 to allow the header to grow naturally if needed on tiny screens
    <header className="w-full py-4 md:h-20 bg-[#111214] border-b border-neutral-900 flex justify-center sticky top-0 z-50">
      <div className="w-full max-w-7xl px-4 md:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-0">
        
        {/* Logo Section */}
        <Link
          href="/"
          className="text-xl md:text-2xl font-black text-white tracking-tighter uppercase shrink-0"
        >
          TO<span className="text-red-600">RN</span>
        </Link>
        
        {/* Right side wrapper: Packs navigation and theme toggle nicely together */}
        <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-4 md:gap-10">
          
          {/* Navigation Links */}
          {/* Uses standard flex wrapping and smaller text on mobile, upgrading seamlessly on desktop */}
          <nav className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 sm:gap-x-6 md:gap-x-10 text-[11px] sm:text-xs md:text-sm font-bold tracking-widest text-neutral-400">
            <Link
              href="/chapters"
              className={
                activeRoute === "/chapters"
                  ? "text-red-500 transition whitespace-nowrap"
                  : "hover:text-white transition whitespace-nowrap"
              }
            >
              READ CHAPTERS
            </Link>
            <Link
              href="/"
              className={
                activeRoute === "/"
                  ? "text-red-500 transition whitespace-nowrap"
                  : "hover:text-white transition whitespace-nowrap"
              }
            >
              LATEST RELEASE
            </Link>
            <Link href="/#about-us" className="hover:text-white transition whitespace-nowrap">
              ABOUT US
            </Link>
          </nav>
          
          {/* Theme Toggle Icon */}
          <div className="text-neutral-400 hover:text-white cursor-pointer transition shrink-0 ml-auto sm:ml-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 md:h-6 md:w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                pathLength={360}
                d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707-.707m12.728 0l-.707.707M6.343 6.343l-.707-.707M14 12a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          </div>
        </div>

      </div>
    </header>
  );
}