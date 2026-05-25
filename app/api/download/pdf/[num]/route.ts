import { NextRequest, NextResponse } from "next/server";
import { readFile } from "fs/promises";
import { join } from "path";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ num: string }> }
) {
  try {
    const { num } = await params;
    const filename = `chapter-${num}.pdf`;
    const filepath = join(process.cwd(), "public", "uploads", "pdfs", filename);

    try {
      const file = await readFile(filepath);

      return new NextResponse(file, {
        headers: {
          "Content-Type": "application/pdf",
          "Content-Disposition": `attachment; filename="Chapter-${num}.pdf"`,
        },
      });
    } catch {
      return NextResponse.json(
        { error: "PDF not found for this chapter" },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error("Download error:", error);
    return NextResponse.json(
      { error: "Failed to download PDF" },
      { status: 500 }
    );
  }
}
