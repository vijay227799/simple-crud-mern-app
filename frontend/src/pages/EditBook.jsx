import React , { useEffect, useState } from 'react';
import BackButton from '../../components/BackButton.jsx';
import  axios  from 'axios';
import Spinner from '../../components/Spinner.jsx';
import { PORT } from '../../../backend/config.js';
import { useNavigate , useParams } from 'react-router-dom';
import {SnackbarProvider, useSnackbar } from 'notistack';

const EditBook = () => {

    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [publishYear, setPublishYear] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const { id } = useParams();
    useEffect(() => {
        setLoading(true);
        axios.get(`http://localhost:${PORT}/books/${id}`)
        .then((response) => {
            setTitle(response.data.title);
            setAuthor(response.data.author);
            setPublishYear(response.data.publishYear);
            setLoading(false)
        }).catch((error) => {
            console.log(error);
            setLoading(false);
            alert('An error occured. Please Check the Console');
        });
    }, []);
    const handleEditBook = () => {
        const data = {
            title,
            author,
            publishYear
        };
        setLoading(true);
        axios.put(`http://localhost:${PORT}/books/${id}`, data) 
            .then(() => {
                setLoading(false);
                enqueueSnackbar('Book edited successfully!', { variant: 'success' });
                navigate('/'); //Navigate back to the home page after successful edit
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
                alert('Error editing book. Please try again.');
                enqueueSnackbar('Error editing book. Please try again.', { variant: 'error' });
            });

        };


  return (
    <div className='p-4'>
        <BackButton />
        <h1 className='text-3xl my-4'>Edit Book</h1>
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
                onClick={handleEditBook} //This calls the above method to edit the book data on the backend API endpoint.
                className='bg-sky-800 text-white px-4 py-2 rounded-md hover:bg-sky-700'>
                Edit Book
            </button>
        </div>
    </div>
  );
}

export default EditBook;