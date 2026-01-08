import mongoose, { Schema, models, model } from "mongoose";

const NoteSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

const Note = models.Note || model("Note", NoteSchema);

export default Note;
