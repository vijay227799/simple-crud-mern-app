import React from 'react';
import BackButton from '../../components/BackButton.jsx';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Spinner from '../../components/Spinner.jsx';
import { PORT } from '../../../backend/config.js';
import {SnackbarProvider, useSnackbar } from 'notistack';

const DeleteBook = () => {
    const [loading, setLoading] = React.useState(false);
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const { id } = useParams();
    const handleDeleteBook = () => {
        setLoading(true);
        axios.delete(`http://localhost:${PORT}/books/${id}`)
            .then(() => {
                setLoading(false);
                enqueueSnackbar('Book deleted successfully!', { variant: 'success' });
                navigate('/'); // Navigate back to the home page after successful deletion
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
                alert('Error deleting book. Please try again by checking the console.');
                enqueueSnackbar('Error deleting book. Please try again.', { variant: 'error' });
            });
    };

    return (
        <div className='p-4'>
            <BackButton />
            <h1 className='text-3xl my-4'>Delete Book</h1>
            {loading ? <Spinner /> : ''}
            <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-8 max-auto'>
                <h3 className='text-2xl'>Are you sure you want to delete this book?</h3>
                <button
                    className='p-4 bg-red-600 text-white m-8 w-full'
                    onClick={handleDeleteBook}
                >
                    Delete Book
                </button>
            </div>
        </div>
    );
}

export default DeleteBook;