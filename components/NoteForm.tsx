"use client";

import { useEffect, useState } from "react";

type NoteFormProps = {
  initialTitle?: string;
  initialContent?: string;
  onSubmit: (data: { title: string; content: string }) => Promise<void>;
  buttonText?: string;
};

export default function NoteForm({
  initialTitle = "",
  initialContent = "",
  onSubmit,
  buttonText = "Save Note",
}: NoteFormProps) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ IMPORTANT FIX: Sync props to state
  useEffect(() => {
    setTitle(initialTitle);
    setContent(initialContent);
  }, [initialTitle, initialContent]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      alert("Title and content are required");
      return;
    }

    setLoading(true);
    await onSubmit({ title, content });
    setLoading(false);

    // Clear only after creating (not editing)
    if (buttonText === "Create Note") {
      setTitle("");
      setContent("");
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-4 rounded-lg shadow space-y-4"
    >
      <h2 className="text-black text-lg font-semibold">
        {buttonText === "Update Note" ? "Edit Note" : "Create Note"}
      </h2>

      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className=" text-gray-800 w-full border rounded px-3 py-2 focus:outline-none focus:ring"
      />

      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="text-gray-800 w-full border rounded px-3 py-2 h-32 resize-none focus:outline-none focus:ring"
      />

      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? "Saving..." : buttonText}
      </button>
    </form>
  );
}
