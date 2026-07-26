import React , { useEffect, useState } from 'react';
import BackButton from '../../components/BackButton.jsx';
import  axios  from 'axios';
import Spinner from '../../components/Spinner.jsx';
import { PORT } from '../../../backend/config.js';
import { useNavigate } from 'react-router-dom';
import { SnackbarProvider, useSnackbar } from 'notistack';

const CreateBook = () => {

    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [publishYear, setPublishYear] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const handleSaveBook = () => {
        const data = {
            title,
            author,
            publishYear
        };
        setLoading(true);
        axios.post(`http://localhost:${PORT}/books`, data) //here second parameter refers to request body of that API endpoint. The data object is sent as the request body to the backend API endpoint for creating a new book.
            .then(() => {
                setLoading(false);
                enqueueSnackbar('Book created successfully!', { variant: 'success' });
                navigate('/');
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
                alert('Error creating book. Please try again.');
                enqueueSnackbar('Error creating book. Please try again.', { variant: 'error' });
            });

        };


  return (
    <div className='p-4'>
        <BackButton />
        <h1 className='text-3xl my-4'>Create Book</h1>
        {loading ? <Spinner /> : ''}
        <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 max-auto'>
            <div className='my-4'>
                <label className='block mb-2'>Title:</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className='border-2 border-grey-500 px-4 py-2 w-full'
                /> 
            </div>
            <div className='my-4'>
                <label className='block mb-2'>Author:</label>
                <input
                    type="text"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    className='border-2 border-grey-500 px-4 py-2 w-full' />
            </div>
            <div className='my-4'>
                <label className='block mb-2'>Publish Year:</label>
                <input
                    type="number"
                    value={publishYear}
                    onChange={(e) => setPublishYear(e.target.value)}
                    className='border-2 border-grey-500 px-4 py-2 w-full' />
            </div>
            <button
                onClick={handleSaveBook} //This calls the above method to save the book data to the backend API endpoint.
                className='bg-sky-800 text-white px-4 py-2 rounded-md hover:bg-sky-700'>
                Save Book
            </button>
        </div>
    </div>
  );
}

export default CreateBook;

//<input/>
//<!-- This input field is used to capture the title of the book. The value of the input is bound to the title state variable, and onChange updates the title state whenever the user types in the input field. -->
//Here 'type' refers to the type that can be taken from the user.
//onclick() and onchange() are event handlers that are used to handle user interactions with the input fields and button. 
// The 'onChange' event is triggered whenever the user types in the input field, and it updates the corresponding state variable (title, author, or publishYear) with the new value. 
// The 'onClick' event is triggered when the user clicks the "Save Book" button, which calls the handleSaveBook function to send the book data to the backend API endpoint.