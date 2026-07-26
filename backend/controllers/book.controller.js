import  Book  from "../models/book.model.js";
//import  { Book }  from "../models/book.model.js"; is not allowed as we are exporting Book as "default" in book.model.js and not as "const" as we did in "config.js". So we can only import it as "import Book from "../models/book.model.js";" or else it will give an error.

//Create Controller
export const createBook = async(req,res ) => {

try
    {

    if(!req.body.title || !req.body.author)
    {
        return res.status(400).json({message: "Please provide all the required fields."});
    }

    const newBook = {
        title : req.body.title,
        author : req.body.author,
        publishYear: req.body.publishYear,
    }

    const book = await Book.create(req.body);
    //const book = await Book.create(req.body); Just another way of creating a new row in MongoDb
    // Here "Book" is from the imported Book model object that we obtained above and "create" is a method provided by Mongoose to create a new document in the MongoDB collection.
    //This will create a new book document in the MongoDB collection using the data from the request body.
    // The create method is an asynchronous operation, so we use await to wait for it to complete before sending a response to the client.


     res.status(201).json({ 
        message: "Book created successfully",
        book: book
        });//Here 201 is the status code for Created and we are sending a JSON response with the created book to the client.
    //res.status(201).json(book).send("Book created successfully",req.body); This doesnt work as res.json() already ends the response. You cannot chain .send() after it.

    console.log(req.body);//This will log the request body to the console when a POST request is made to the /api/books endpoint(Only for verification purpose, not recommended for production)
    }
    catch(err)
    {
        console.error('Error creating book', err);
        //res.status(500).send('Internal Server Error');
        res.status(500).json({ message: err.message });//Here 500 is the status code for Internal Server Error and we are sending a JSON response with the error message to the client. 
        // This way we can provide custom status codes and error messages to the client instead of just sending a generic error message.
    }

}

//Get Controller
export const getBooks = async(req , res ) => {
     try
    {   
        const books = await Book.find(); //This will find all the books in the MongoDB collection and return them as an array of book objects.
        res.status(200).json({
            count : books.length,
            data : books
        }); //Here 200 is the status code for OK and we are sending a JSON response with the array of books to the client.
    }
    catch(err)
    {
        console.error('Error fetching books', err);
        res.status(500).json({ message: err.message });
    }
}


//Get By Id Controller
export const getBook = async(req,res ) => {
        try
    {
        const { id } = req.params; //This will extract the parameter from the request URL and store it in a variable named id.
        const book = await Book.findById(id);
        res.status(200).json(book);
    }
    catch(err)
    {
        console.error('Error fetching book', err);
        res.status(500).json({ message: err.message });
    }
}


 
//Update Controller
export const updateBook = async(req,res ) => {
 try
    {
    
        if(!req.body.title || !req.body.author)
        {
            return res.status(400).json({message: "Please provide all the required fields."});
        }

        const { id } = req.params; 
        //const book = await Book.findByIdAndUpdate(id, req.body, { new: true }); //This will find the book by id and update it with the data from the request body.
        //  The { new: true } option will return the updated book in the response.
        const book = await Book.findByIdAndUpdate(id, req.body, { returnDocument: 'after' });

        //const book = await Book.findByIdAndUpdate(id, req.body, { new: true }); - Older Version of Mongoose used "new: true" to return the updated document. In newer versions, "returnDocument: 'after'" is used instead.

        if(!book)
        {
            return res.status(404).json({message: "Book doesnt Exist in the database."})
        }    

        const updatedBook = await Book.findById(id);//additional check
        
        res.status(200).json({ 
            message: "Book updated successfully",
            book: updatedBook   
        });
    }
    catch(err)
    {
        console.error('Error updating book', err);
        res.status(500).json({ message: err.message });
    }

}

//Delete Controller
export const deleteBook = async(req,res ) => {

    try 
{

    const {id} = req.params;
    const book = await Book.findByIdAndDelete(id); //Inbuilt function to  delete like other inbuilt functions to perform other crud operations.

    if(!book)
    {
        return res.status(404).json({message: "Book Not Found"});
    }

    res.status(200).json({message:"Book Deleted From the Database Successfully"});

}
catch(error)
{
    res.status(500).json({message : error.message});
}
}

//When u want to export multiple functions from a single file, you need to use "export const { function1, function2, function3 };" syntax. 
//Or else if there is only one function to be exported, we can use "export default functionName;" syntax.
