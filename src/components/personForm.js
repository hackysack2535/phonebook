import React from 'react'

const PersonForm = (props) => {
    return (
      <form onSubmit={props.onSubmit}>
        <div>
          name: <input value={props.nameValue} onChange={props.onChangePerson}/>
        </div>
        <div>number: <input value={props.numValue} onChange={props.onChangeNumber}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    )
}

export default PersonForm