import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import { NextRequest, NextResponse } from "next/server";

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "50mb",
    },
  },
};

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const chapterNumber = formData.get("chapterNumber") as string;

    if (!file || !chapterNumber) {
      return NextResponse.json(
        { error: "Missing file or chapter number" },
        { status: 400 }
      );
    }

    if (!file.name.toLowerCase().endsWith(".pdf")) {
      return NextResponse.json(
        { error: "Only PDF files are allowed" },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create uploads directory if it doesn't exist
    const uploadsDir = join(process.cwd(), "public", "uploads", "pdfs");
    await mkdir(uploadsDir, { recursive: true });

    // Save file with chapter number as name
    const filename = `chapter-${chapterNumber}.pdf`;
    const filepath = join(uploadsDir, filename);

    await writeFile(filepath, buffer);

    // Return the public URL
    const pdfUrl = `/uploads/pdfs/${filename}`;

    return NextResponse.json(
      { success: true, pdfUrl, message: "PDF uploaded successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Failed to upload PDF", details: String(error) },
      { status: 500 }
    );
  }
}
