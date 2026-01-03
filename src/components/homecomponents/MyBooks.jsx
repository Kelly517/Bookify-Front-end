import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios';

const MyBooks = () => {
    const [ books, setBooks ] = useState([]);
    //const [ tittle, setTittle ] = useState(""); 
    //const [ description, setDescription ] = useState(""); 
    //const [ price, setPrice ] = useState(""); 
    //const [ category, setCategory ] = useState(""); 

    useEffect(() => {
        axios.get('http://localhost:8080/api/get-all/my-books')
            .then(res => {
                setBooks(res.data);
            })
            .catch(err => {
                console.error('Error: ', err)
            });
    }, []);

    /**const handleSubmit = async (e) => {
        e.preventDefault();
        try {

        } catch(err) {
            console.log("Error saving book")
        }
    }*/

  return (
    <>
        <h2>My Books</h2>
        <ul>
            {books.map((book) => (
                <li key={book.id}>{book.tittle}</li>
            ))};
        </ul>
    </>
  )
}

export default MyBooks