'use client';

import { useState } from 'react';
import { getChapters } from '@/lib/db';

export default function AdminUploadPage() {
  const [selectedChapter, setSelectedChapter] = useState<string>('');
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const chapters = getChapters();

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !selectedChapter) {
      setError('Please select both a chapter and a PDF file');
      return;
    }

    if (!file.name.toLowerCase().endsWith('.pdf')) {
      setError('Please select a PDF file');
      return;
    }

    setIsUploading(true);
    setError(null);
    setSuccess(false);

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('chapterNumber', selectedChapter);

      const response = await fetch('/api/upload/chapter', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Upload failed');
      }

      setSuccess(true);
      setSelectedChapter('');
      event.target.value = '';
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-serif tracking-widest uppercase text-white mb-8 text-center">
        Upload Chapter PDF
      </h1>

      <div className="bg-[#111214] border border-neutral-800 rounded p-8 space-y-6">
        <div>
          <label className="block text-sm font-bold text-neutral-300 mb-3 uppercase tracking-widest">
            Select Chapter
          </label>
          <select
            value={selectedChapter}
            onChange={(e) => setSelectedChapter(e.target.value)}
            className="w-full bg-neutral-950 border border-neutral-700 rounded px-4 py-3 text-white focus:outline-none focus:border-neutral-500"
          >
            <option value="">Choose a chapter...</option>
            {chapters.map((chapter) => (
              <option key={chapter._id} value={chapter.chapterNumber.toString()}>
                Chapter {chapter.chapterNumber} - {chapter.title || 'Untitled'}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-bold text-neutral-300 mb-3 uppercase tracking-widest">
            Upload PDF
          </label>
          <input
            type="file"
            accept=".pdf"
            onChange={handleFileChange}
            disabled={isUploading || !selectedChapter}
            className="w-full px-4 py-3 bg-neutral-950 border border-neutral-700 rounded text-neutral-400 disabled:opacity-50"
          />
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}
        {success && <p className="text-green-500 text-sm">PDF uploaded successfully!</p>}
        {isUploading && <p className="text-neutral-400 text-sm">Uploading...</p>}
      </div>
    </div>
  );
}
