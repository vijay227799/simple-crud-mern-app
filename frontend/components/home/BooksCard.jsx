import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineDelete } from 'react-icons/md';
import { PiBookOpenTextLight } from 'react-icons/pi';
import { BiUserCircle } from 'react-icons/bi';
import BookSingleCard  from './BookSingleCard.jsx'; // Import the BookSingleCard component]

const BooksCard = ({ books }) => {
    return (
        <div className='grid sm:grid-cols-2 lg:grid-cols-3 lg:grid-cols-4 gap-4'>
            {books.map((item) => (
                // <div
                //      key={item._id} 
                //      className='border-2 border-gray-500 rounded-lg px-4 py-2 m-4 relative hover:shadow-xl'
                // >
                //     <h2 className='absolute top-1 right-2 px-4 py-1 bg-red-300 rounded-lg'>
                //         {item.publishYear}
                //     </h2>
                //     <h4 className='my-2 text-gray-500'>{item._id}</h4>
                //     <div className='flex justify-start items-center gap-x-2'>
                //         <PiBookOpenTextLight className='text-red-300 text-2xl' />
                //         <h2 className='my-1'> {item.title} </h2>
                //     </div>
                //     <div className='flex justify-start items-center gap-x-2'>
                //         <BiUserCircle className='text-red-300 text-2xl' />
                //         <h2 className='my-1'> {item.author} </h2>
                //     </div>
                //     <div className='flex justify-between items-center gap-x-2 mt-4 p-4'>
                //         <Link to={`/books/edit/${item._id}`}>
                //             <AiOutlineEdit className='text-yellow-600 text-2xl hover:text-black' />
                //         </Link>
                //         <Link to={`/books/detais/${item._id}`}>
                //             <BsInfoCircle className='text-green-500 text-2xl hover:text-black' />
                //         </Link>
                //         <Link to={`/books/delete/${item._id}`}>
                //             <MdOutlineDelete className='text-red-500 text-2xl hover:text-black' />
                //         </Link>
                //     </div>
                // </div> //we had used this so that each item of the map renders a card with the details of the book and the operations that can be performed on it.But we can also use the below code to render the same card ( which can be resued ) with the details of the book and the operations that can be performed on it.
                <BookSingleCard book={item} /> //You Should not pass 'key' as a prop to the child component.

            ))}   
            </div>
    );
};

export default BooksCard;