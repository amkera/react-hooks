// useEffect: persistent state
// http://localhost:3000/isolated/exercise/02.js

import * as React from 'react'

//Serialize will put something into local storage (turn JavaScript object into a JSON string) with JSON.stringify
//Deserialize will take something out of local storage (turn JSON string into a JavaScript object) with JSON.parse

function useLocalStorageState(
  key,
  defaultValue = '',
  {serialize = JSON.stringify, deserialize = JSON.parse} = {},
) {
  const [state, setState] = React.useState(() => {
    const valueInLocalStorage = window.localStorage.getItem(key)
    if (valueInLocalStorage) {
      try {
        return deserialize(valueInLocalStorage) //JSON string => JS object
      } catch (error) {
        window.localStorage.removeItem(key)
        console.error(error)
      }
    }
    return typeof defaultValue === 'function' ? defaultValue() : defaultValue
    //If the default value is a function, call it. This helps with a computationally expensive operation (lazy loading)
  })

  const prevKeyRef = React.useRef(key) //If previous key changes between renders, we can remove that item from local storage and set it to the new key

  //If the key, state, or serialize function have changed, run this code:
  React.useEffect(() => {
    const prevKey = prevKeyRef.current
    if (prevKey !== key) {
      window.localStorage.removeItem(prevKey)
    }
    prevKeyRef.current = key
    window.localStorage.setItem(key, serialize(state)) //support objects, numbers, booleans, etc.
  }, [key, state, serialize])
  // key is name, and state is what the user is typing

  return [state, setState]
}

function Greeting({initialName = ''}) {
  const [name, setName] = useLocalStorageState('name', initialName)

  function handleChange(event) {
    setName(event.target.value)
  }

  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input value={name} onChange={handleChange} id="name" />
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please type your name'}
    </div>
  )
}

function App() {
  return <Greeting />
}

export default App
