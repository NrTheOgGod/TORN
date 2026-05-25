// app/not-found.tsx — Custom 404 page (replaces Express 404 handler)
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="flex-grow flex flex-col items-center justify-center px-6 py-24 text-center">
        <h1 className="text-6xl font-mono font-bold text-white mb-4">404</h1>
        <p className="text-neutral-400 text-lg mb-8">Page Not Found</p>
        <Link
          href="/"
          className="bg-red-600 text-white px-8 py-3 rounded text-sm font-bold tracking-widest hover:bg-red-700 transition uppercase"
        >
          Go Home
        </Link>
      </main>
      <Footer />
    </>
  );
}
