import { readFile } from "fs/promises";
import { join } from "path";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ num: string }> }
) {
  try {
    const { num } = await params;
    const filename = `chapter-${num}.pdf`;
    const filepath = join(process.cwd(), "public", "uploads", "pdfs", filename);

    const fileBuffer = await readFile(filepath);

    return new Response(fileBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="Chapter-${num}.pdf"`,
        "Cache-Control": "no-cache",
      },
    });
  } catch (error) {
    console.error("Download error:", error);
    return new Response("PDF not found", { status: 404 });
  }
}
