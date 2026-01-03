import React from 'react'

const BookStatus = ({ status }) => {
    const messages = {
      PUBLIC: "Público",
      PRIVATE: "Privado"
    }
  return (
    <>
      {messages[status]}
    </>
  )
}

export default BookStatus
