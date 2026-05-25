import { useState } from "react";

interface PDFUploadProps {
  chapterNumber: number;
  onUploadSuccess?: (pdfUrl: string) => void;
}

export default function PDFUpload({
  chapterNumber,
  onUploadSuccess,
}: PDFUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.name.toLowerCase().endsWith(".pdf")) {
      setError("Please select a PDF file");
      return;
    }

    setIsUploading(true);
    setError(null);
    setSuccess(false);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("chapterNumber", chapterNumber.toString());

      const response = await fetch("/api/upload/chapter", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Upload failed");
      }

      setSuccess(true);
      onUploadSuccess?.(data.pdfUrl);
      setTimeout(() => {
        setSuccess(false);
        // Reset file input
        event.target.value = "";
      }, 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <label className="flex items-center gap-2 cursor-pointer">
        <input
          type="file"
          accept=".pdf"
          onChange={handleFileChange}
          disabled={isUploading}
          className="hidden"
        />
        <span className="bg-neutral-700 hover:bg-neutral-600 disabled:bg-neutral-800 text-white px-4 py-2 rounded text-sm font-bold tracking-wider transition uppercase">
          {isUploading ? "Uploading..." : "Upload PDF"}
        </span>
      </label>
      {error && <p className="text-red-500 text-xs">{error}</p>}
      {success && (
        <p className="text-green-500 text-xs">PDF uploaded successfully!</p>
      )}
    </div>
  );
}
