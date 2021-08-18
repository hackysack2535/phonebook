import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Note from './components/note'
import Filter from './components/filter'
import PersonForm from './components/personForm'
import Persons from './components/persons'
import phoneService from './services/phone'
import Notification from './components/notification'

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [showAll, setShowAll] = useState(true);
  const [ newFilter, setNewFilter ] = useState('')
  const [message, setMessage] = useState(null)

  useEffect(() => {
    phoneService
      .getAll()
      .then(initialPeople => {
        setPersons(initialPeople)
      })
  }, [])

 

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber,
    }

    const isFound = persons.some(person => person.name === newName)

    if(!isFound) {
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')

      phoneService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
          setMessage(
            `${personObject.name} has successfully been added to the List!`
            ) 
          setTimeout(() => {
          setMessage(null)
        }, 5000)
        })
        .catch(error => {
              setMessage(
                `[ERROR] ${error.response.data.error}`
              )
              setTimeout(() => {
                setMessage(null)
              }, 5000)
              console.log(error.response.data)
            })
    }
    else if (window.confirm(`Do you want to replace ${personObject.name}'s phone number?`)) {
        const personU = persons.filter(person => person.name === personObject.name)
        const personToAdd = personU[0]
        const personUpdate = { ...personToAdd, number: newNumber }

        phoneService
          .update(personUpdate.id, personObject)
          .then(response => {
            setPersons(persons.map(personCurrent => personCurrent.id !== personUpdate.id ? personCurrent : response))
          
          setNewName('')
          setNewNumber('')
          setMessage(
            `${personObject.name} has successfully had their number changed!`
            ) 
          setTimeout(() => {
          setMessage(null)
        }, 5000)
        })
        .catch(error => {
            setMessage(
              `[ERROR] ${error.response.data.error}`
            )
            setTimeout(() => {
              setMessage(null)
            }, 5000)
            console.log(error.response.data)
          })
    }
  }

  const addNewPerson = (event) => {
    setNewName(event.target.value)
  }

  const addNewNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const filter = (event) => {
    setNewFilter(event.target.value)
    if (newFilter === '') {
      setShowAll(showAll)
    }
    else if (showAll){
      setShowAll(!showAll)
    }
  }

  const contactsToShow = showAll
      ? persons
      : persons.filter(person => {
          const p = person.name.toUpperCase()
          console.log(p)
          const filter = newFilter.toUpperCase()
          console.log(filter)
          return p.search(filter) !== -1
        })

  const removeContact = (id) => {
    const personDel = persons.filter(person => person.id === id)
    const personName = personDel[0].name
    const personId = personDel[0].id
     if (window.confirm(`Delete ${personName} ?`)) {
      phoneService
      .remove(personId)
      setPersons(persons.filter(person => person.id !== personId))
     }
  }


  return (
    <div>
      <h2>Phonebook</h2>

      <Notification message={message} />

      <Filter value={newFilter} onChange={filter} />

      <h2>Add a new</h2>

      <PersonForm onSubmit={addPerson} nameValue={newName} onChangePerson={addNewPerson} 
                  numValue={newNumber} onChangeNumber={addNewNumber} />

      <h2>Numbers</h2>

      <Persons contactsToShow={contactsToShow} removeContact={removeContact} />
    </div>
  )
}

export default App
