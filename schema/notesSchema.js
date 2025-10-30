import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    tags: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export default noteSchema;
