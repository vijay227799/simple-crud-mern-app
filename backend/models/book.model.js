import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true , "Title is required"]
    },
    author: {
        type: String,
        required: [ true , "Author is required"] 
    },
    publishYear: {
        type: Number,
        required: false,
        default: 0
    },
},
{
    timestamps: true
});

const Book = mongoose.model("Book", bookSchema);

export default Book;