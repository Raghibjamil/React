import { useState, useCallback,useEffect ,useRef} from "react";

import "./App.css";

function App() {
  /**In React, when you use the useState hook, it returns an array with two elements. The first element is the current state value, and the second element is a function that allows you to update that state value. */
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");
  /**
The useRef hook in React is used to create a mutable reference that persists across re-renders of the component. It returns a mutable object with a .current property that can be used to access and update the referenced value */
  const passwordRef = useRef(null);
  /**
useCallback is a hook provided by React that is used to memoize functions. It returns a memoized version of the callback function that only changes if one of the dependencies has changed. This can be useful for optimizing performance in React applications by preventing unnecessary re-renders of components. */
  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*-_+=[]{}~`";
    for (let i = 1; i <=length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numberAllowed, charAllowed, setPassword]);


  const handleClick = useCallback(()=>{
/** The clipboard is a temporary storage area in your computer's memory where data that is cut or copied is held. It allows you to transfer data (text, images, files, etc.) from one location to another within or between applications. The typical actions associated with the clipboard are "cut," "copy," and "paste." */


/**
The select() method on an input element selects all the text within that input field. It's a DOM method that's commonly used to provide a user-friendly behavior where clicking into an input field automatically selects the text, making it easier for the user to replace or copy it */

/**In this context, passwordRef.current is accessing the current property of the passwordRef object. If passwordRef.current is null or undefined, attempting to call select() on it directly would result in a runtime error. However, by using ?., you're ensuring that if passwordRef.current is null or undefined, the select() method won't be called, and the code will gracefully handle the situation without throwing an error. */
passwordRef.current?.select();
passwordRef.current.setSelectionRange(0, length);


window.navigator.clipboard.writeText(password);

  },[password]);
  /**
The useEffect hook in React allows you to perform side effects in function components. Side effects can include things like data fetching, subscriptions, or manually changing the DOM. */
  useEffect(() => {
    // This function will run after every render
    passwordGenerator()
  }, [length, numberAllowed, charAllowed, passwordGenerator])
  return (
    <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500">
      <h1 className="text-white text-center my-3">Password generator</h1>
      <div className="flex shadow rounded-lg overflow-hidden mb-4">
        <input
          type="text"
          value={password}
          className="outline-none w-full py-1 px-3"
          placeholder="Password"
          readOnly
          ref={passwordRef}
        />
        <button
          
          className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0"
          onClick={handleClick}
        >
          copy
        </button>
      </div>
      <div className='flex text-sm gap-x-2'>
      <div className='flex items-center gap-x-1'>
        <input 
        type="range"
        min={6}
        max={100}
        value={length}
         className='cursor-pointer'
         onChange={(e) => {setLength(e.target.value)}}
          />
          <label>Length: {length}</label>
      </div>
     
      <div className="flex items-center gap-x-1">
      <input
          type="checkbox"
          defaultChecked={numberAllowed}
          id="numberInput"
          onChange={() => {
              setNumberAllowed((prev) => !prev);
          }}
      />
      <label htmlFor="numberInput">Numbers</label>
      </div>
      <div className="flex items-center gap-x-1">
          <input
              type="checkbox"
              defaultChecked={charAllowed}
              id="characterInput"
              onChange={() => {
                  setCharAllowed((prev) => !prev )
              }}
          />
          <label htmlFor="characterInput">Characters</label>
      </div>
    </div>
    </div>
    
  );
}

export default App;
