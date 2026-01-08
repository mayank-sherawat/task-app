import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Note from "@/models/Note";

// GET: Fetch all notes
export async function GET() {
  try {
    await connectDB();

    const notes = await Note.find().sort({ createdAt: -1 });

    return NextResponse.json(notes, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch notes" },
      { status: 500 }
    );
  }
}

// POST: Create a new note
export async function POST(request: Request) {
  try {
    await connectDB();

    const body = await request.json();
    const { title, content } = body;

    if (!title || !content) {
      return NextResponse.json(
        { message: "Title and content are required" },
        { status: 400 }
      );
    }

    const newNote = await Note.create({
      title,
      content,
    });

    return NextResponse.json(newNote, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to create note" },
      { status: 500 }
    );
  }
}
