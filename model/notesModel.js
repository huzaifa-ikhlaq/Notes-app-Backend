import mongoose from "mongoose";
import noteSchema from "../schema/notesSchema.js";

const noteModel = mongoose.model("Note", noteSchema);

export default noteModel;
