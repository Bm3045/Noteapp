import { Request, Response } from "express";
import Note from "../models/Note";
import { AuthRequest } from "../middleware/authMiddleware";

export const getNotes = async (req: AuthRequest, res: Response) => {
  try {
    const notes = await Note.find({ user: req.userId }).sort({ createdAt: -1 });
    res.status(200).json(notes);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch notes" });
  }
};

export const createNote = async (req: AuthRequest, res: Response) => {
  const { content } = req.body;

  if (!content) return res.status(400).json({ error: "Content is required" });

  try {
    const note = await Note.create({ user: req.userId, content });
    res.status(201).json(note);
  } catch (err) {
    res.status(500).json({ error: "Failed to create note" });
  }
};

export const deleteNote = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;

  try {
    const note = await Note.findOneAndDelete({ _id: id, user: req.userId });
    if (!note) return res.status(404).json({ error: "Note not found or unauthorized" });

    res.status(200).json({ message: "Note deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete note" });
  }
};
