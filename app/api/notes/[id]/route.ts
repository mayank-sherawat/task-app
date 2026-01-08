import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Note from "@/models/Note";

// PUT: Update a note
export async function PUT(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await context.params; // ✅ FIX HERE
    const body = await request.json();
    const { title, content } = body;

    const updatedNote = await Note.findByIdAndUpdate(
      id,
      { title, content },
      { new: true, runValidators: true }
    );

    if (!updatedNote) {
      return NextResponse.json(
        { message: "Note not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedNote, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to update note" },
      { status: 500 }
    );
  }
}

// DELETE: Delete a note
export async function DELETE(
  _request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await context.params; // ✅ FIX HERE

    const deletedNote = await Note.findByIdAndDelete(id);

    if (!deletedNote) {
      return NextResponse.json(
        { message: "Note not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Note deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to delete note" },
      { status: 500 }
    );
  }
}
