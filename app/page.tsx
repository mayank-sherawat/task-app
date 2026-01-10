"use client";

import { useEffect, useState } from "react";
import NoteForm from "@/components/NoteForm";
import NoteCard from "@/components/NoteCard";

type Note = {
  _id: string;
  title: string;
  content: string;
  createdAt: string;
};

export default function HomePage() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [loading, setLoading] = useState(true);

  async function fetchNotes() {
  try {
    const res = await fetch("/api/notes");

    if (!res.ok) {
      setNotes([]);
      setLoading(false);
      return;
    }

    const data = await res.json();

    if (Array.isArray(data)) {
      setNotes(data);
    } else {
      setNotes([]);
    }
  } catch (error) {
    setNotes([]);
  } finally {
    setLoading(false);
  }
}


  // Create note
  async function createNote(data: { title: string; content: string }) {
    await fetch("/api/notes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    fetchNotes();
  }

  // Update note
  async function updateNote(data: { title: string; content: string }) {
    if (!editingNote) return;

    await fetch(`/api/notes/${editingNote._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    setEditingNote(null);
    fetchNotes();
  }

  // Delete note
  async function deleteNote(id: string) {
    await fetch(`/api/notes/${id}`, {
      method: "DELETE",
    });

    fetchNotes();
  }

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold text-center text-black">Notes App</h1>

        <NoteForm
          initialTitle={editingNote?.title}
          initialContent={editingNote?.content}
          onSubmit={editingNote ? updateNote : createNote}
          buttonText={editingNote ? "Update Note" : "Create Note"}
        />

        

        {loading ? (
          <p className="text-center">Loading notes...</p>
        ) : notes.length === 0 ? (
          <p className="text-center text-gray-500">No notes yet</p>
        ) : (
          <div className="space-y-4">
            Array.isArray(notes) &&
            {notes.map((note) => (
              <NoteCard
                key={note._id}
                note={note}
                onDelete={deleteNote}
                onEdit={setEditingNote}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
