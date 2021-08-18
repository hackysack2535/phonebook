import React from 'react'

const Notification = ({ message }) => {
    if (message === null) {
      return null
    }

    if (message.includes('ERROR')){
      return (
        <div  className="failure">
          "The name has already been deleted!"
        </div>
      )
    } else {
      return (
        <div className="success">
          {message}
        </div>
      )
    }
  }


export default Notification