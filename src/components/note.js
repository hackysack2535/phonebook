import React from 'react'

const Note = ({ note, num, removeContact }) => {
  return (
    <li className="note">{note} {num}
    <button onClick={removeContact}>Delete</button>
    </li>
  )
}

export default Note