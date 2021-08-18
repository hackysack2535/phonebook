import React from 'react'
import Note from './note'

const Persons = ({contactsToShow, removeContact}) => {

	return (
    	<ul>
        	{contactsToShow.map(person => 
          		<Note key={person.id} note={person.name} num={person.number} removeContact={() => removeContact(person.id)} />
        	)} 
      	</ul>
	)

}

export default Persons