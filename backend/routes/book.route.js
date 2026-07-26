import  express from "express";
import {getBooks , getBook , createBook , updateBook , deleteBook } from "../controllers/book.controller.js"; //This is used to get particular functions from controllers which contains core logic

const bookrouter = express.Router(); // Instance of Router feature of Express Server

bookrouter.post('/',createBook);

bookrouter.get('/', getBooks); //getBooks is the function in book.controller.js which contains the core logic required for that particular route.
//Here "get" refers to paricualr type of request.Simialrly we can have "post","put",etc.


bookrouter.get('/:id', getBook);



bookrouter.put('/:id',updateBook);

bookrouter.delete('/:id',deleteBook);

export default bookrouter; //This is used so that "router" can be used by index.js