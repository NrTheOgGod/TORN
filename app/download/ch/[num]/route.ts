// app/download/ch/[num]/route.ts — Download handler (replaces GET /download/ch/:num)
import { NextResponse } from "next/server";
import { getChapterByNumber } from "@/lib/db";
import { readFile } from "fs/promises";
import path from "path";

interface RouteContext {
  params: Promise<{ num: string }>;
}

export async function GET(_request: Request, context: RouteContext) {
  const { num } = await context.params;
  const chapter = getChapterByNumber(Number(num));

  if (!chapter || !chapter.downloadUrl) {
    return new NextResponse("Download unavailable", { status: 404 });
  }

  // Resolve the file from the public directory
  const filePath = path.join(process.cwd(), "public", chapter.downloadUrl);

  try {
    const fileBuffer = await readFile(filePath);
    const filename = `TORN_Ch_${chapter.chapterNumber}.zip`;

    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/zip",
        "Content-Disposition": `attachment; filename="${filename}"`,
        "Content-Length": String(fileBuffer.length),
      },
    });
  } catch {
    return new NextResponse("Error processing download", { status: 500 });
  }
}
