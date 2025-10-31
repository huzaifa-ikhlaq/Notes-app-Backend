import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import noteModel from "./model/notesModel.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 2009;
const mongodbUrl = process.env.MONGODB_URL;

// Middleware
app.use(cors());
app.use(express.json());

//  Connect to MongoDB Atlas 
mongoose.connect(mongodbUrl)
    .then(() => console.log("✅ Connected to MongoDB Atlas successfully"))
    .catch((err) => console.error("❌ MongoDB connection error:", err));

// get all notes
app.get("/notes", async (req, res) => {
    try {
        const note = await noteModel.find();
        res.json(note);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch notes" });
    }
});

//  add new note
app.post("/notes", async (req, res) => {
    try {
        const { title, tags } = req.body;
        const newNote = new noteModel({ title, tags });
        await newNote.save();
        res.status(201).json(newNote);
    } catch (err) {
        res.status(500).json({ message: " Failed to create note" });
    }
});

// edit note
app.put("/notes/:id", async (req, res) => {
    try {
        const { title, tags } = req.body;
        const updatedNote = await noteModel.findByIdAndUpdate(req.params.id, { title, tags }, { new: true });
        if (!updatedNote) {
            return res.status(404).json({ message: "Note not found " });
        }
        res.json(updatedNote);
    } catch (error) {
        res.status(500).json({ error: "we can not edit note" });
    }
})

app.delete("/notes/:id", async (req, res) => {
    try {
        await noteModel.findByIdAndDelete(req.params.id);
        res.json({ message: "Note deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete note" });
    }
})


//   Start server       
app.listen(port, () => {
    console.log(`🚀 Server is running on http://localhost:${port}`);
});

// export default app;