import { useState, useCallback, useEffect, useRef } from 'react';
import './App.css';

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charactersAllowed, setCharactersAllowed] = useState(false);
  const [password, setPassword] = useState('');
  const [copied, setCopied] = useState(false); // State for copied message
  const password_ref = useRef(null);

  // Function for creating password
  const password_gen = useCallback(() => {
    let pass = '';
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz.';

    if (numberAllowed) {
      str += '0987654321';
    }

    if (charactersAllowed) {
      str += '!@#$%^&*(){}[]';
    }

    for (let i = 0; i < length; i++) { // Change <= to < to avoid extra character
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numberAllowed, charactersAllowed]);

  // Function for copying the password
  const copy_pass = useCallback(() => {
    window.navigator.clipboard.writeText(password);
    setCopied(true); // Show the copied message
    setTimeout(() => setCopied(false), 2000); // Hide after 2 seconds
  }, [password]);

  // Calling the password gen function using useEffect
  useEffect(() => {
    password_gen();
  }, [length, numberAllowed, charactersAllowed, password_gen]);

  return (
    <>
      {copied && <div className='copied_text'><p>Copied</p></div>} {/* Conditionally render copied message */}

      <div className='container'>
        <h2>Password Generator</h2>
        <div className='container1'>
          <input className="input1" type="text" placeholder='Password' value={password} ref={password_ref} readOnly />
          <button className='copy' onClick={copy_pass}>Copy</button> {/* Call function directly */}
        </div>

        <div className='container2'>
          <input type="range" min={8} max={50} value={length} onChange={(e) => { setLength(e.target.value) }} />
          <label>Length: {length}</label>

          <input type="checkbox" checked={numberAllowed} onChange={(e) => setNumberAllowed(e.target.checked)} />
          <label htmlFor="number">Number</label>
          
          <input type="checkbox" checked={charactersAllowed} onChange={(e) => setCharactersAllowed(e.target.checked)} />
          <label htmlFor="character">Character</label>
        </div>
      </div>
    </>
  );
}

export default App;
