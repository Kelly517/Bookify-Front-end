import React, { useState } from 'react'
import '../../css/homecomponents/categories-books.css';

const Categories = () => {
  const [ isOpen, setIsOpen ] = useState(false);

  const toggleDropDown = () => setIsOpen(!isOpen);

  return (
    <>
    </>
  )
}

export default Categories