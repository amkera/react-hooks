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
    //lazy state initialization, () => is used to only run this expensive computation once
    const valueInLocalStorage = window.localStorage.getItem(key)
    if (valueInLocalStorage) {
      return deserialize(valueInLocalStorage)
    }
    return typeof defaultValue === 'function' ? defaultValue() : defaultValue
    //if the defaultValue is a computationally expensive function, we can check that it's a function, and if it is, run it.
  })

  const previousKeyRef = React.useRef(key)
  // What if the key changes? Need to remove the old value from the previous key and set the new one.
  // useRef provides an object that you can mutate without triggering rerenders.

  React.useEffect(() => {
    const previousKey = previousKeyRef.current
    if (previousKey !== key) {
      window.localStorage.removeItem(previousKey)
    }
    previousKeyRef.current = key
    window.localStorage.setItem(key, serialize(state))
  }, [key, state, serialize])

  return [state, setState]
}

function Greeting({initialName = ''}) {
  const [name, setName] = useLocalStorageState('name', initialName)
  function handleChange(event) {
    setName(event.target.value)
  }

  return (
    <div>
      <label htmlFor="name">Name: </label>
      <input value={name} onChange={handleChange} id="name" />
      <form>{name ? <strong>Hello, {name}</strong> : 'type your name'}</form>
    </div>
  )
}

function App() {
  return <Greeting />
}

export default App
