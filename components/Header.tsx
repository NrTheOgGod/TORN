// components/Header.tsx — Shared site header (replaces repeated EJS header markup)
import Link from "next/link";

interface HeaderProps {
  activeRoute?: string;
}

export default function Header({ activeRoute }: HeaderProps) {
  return (
    <header className="w-full h-20 bg-[#111214] border-b border-neutral-900 flex justify-center sticky top-0 z-50">
      <div className="w-full max-w-7xl px-6 flex items-center justify-between">
        <Link
          href="/"
          className="text-2xl font-black text-white tracking-tighter uppercase"
        >
          TO<span className="text-red-600">RN</span>
        </Link>
        <nav className="flex space-x-10 text-sm font-bold tracking-widest text-neutral-400">
          <Link
            href="/chapters"
            className={
              activeRoute === "/chapters"
                ? "text-red-500 transition"
                : "hover:text-white transition"
            }
          >
            READ CHAPTERS
          </Link>
          <Link
            href="/"
            className={
              activeRoute === "/"
                ? "text-red-500 transition"
                : "hover:text-white transition"
            }
          >
            LATEST RELEASE
          </Link>
          <Link href="/#about-us" className="hover:text-white transition">
            ABOUT US
          </Link>
        </nav>
        <div className="text-neutral-400 hover:text-white cursor-pointer transition">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707-.707m12.728 0l-.707.707M6.343 6.343l-.707-.707M14 12a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
        </div>
      </div>
    </header>
  );
}
