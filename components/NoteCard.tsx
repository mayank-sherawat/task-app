"use client";

type Note = {
  _id: string;
  title: string;
  content: string;
  createdAt: string;
};

type NoteCardProps = {
  note: Note;
  onDelete: (id: string) => Promise<void>;
  onEdit: (note: Note) => void;
};

export default function NoteCard({ note, onDelete, onEdit }: NoteCardProps) {
  return (
    <div className="bg-white p-4 rounded-lg shadow space-y-2">
      <h3 className="text-lg font-semibold text-black">{note.title}</h3>

      <p className="text-gray-700">{note.content}</p>

      <p className="text-sm text-gray-500">
        Created: {new Date(note.createdAt).toLocaleString()}
      </p>

      <div className="flex gap-3 pt-2">
        <button
          onClick={() => onEdit(note)}
          className="text-blue-600 hover:underline"
        >
          Edit
        </button>

        <button
          onClick={() => onDelete(note._id)}
          className="text-red-600 hover:underline"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
