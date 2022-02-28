// Lifting state
// http://localhost:3000/isolated/exercise/03.js

import * as React from 'react'

//Child Component
//Name and onNameChange props also need to be passed to child component in the App, when App
//renders the child component
function Name() {
  const [name, setName] = React.useState('')
  return (
    <div>
      <label htmlFor="name">Name: </label>
      <input
        id="name"
        value={name}
        onChange={event => setName(event.target.value)}
      />
    </div>
  )
}

//Child Component 2
//Animal and onAnimalChange props also need to be passed to child component in the App, when App
//renders the child component
function FavoriteAnimal({animal, onAnimalChange}) {
  return (
    <div>
      <label htmlFor="animal">Favorite Animal: </label>
      <input id="animal" value={animal} onChange={onAnimalChange} />
    </div>
  )
}
//Name and animal props also need to be passed to child component in the App, when App
//renders the child component
function Display({animal}) {
  return <div>{`Your favorite animal is: ${animal}!`}</div>
}

//Parent Component
function App() {
  const [animal, setAnimal] = React.useState('')
  //We colocated state to the lowest common parent of the 2 child components
  return (
    <form>
      <Name />
      <FavoriteAnimal
        animal={animal}
        onAnimalChange={event => setAnimal(event.target.value)}
      />
      <Display animal={animal} />
    </form>
  )
}

export default App
