import React from 'react';
import { Link } from "react-router-dom";
import './App.css';
import Paths from './Paths';

if (process.env.NODE_ENV == "production") {
  console.log = () => { }
}

interface Views {
  children?: React.ReactNode
}

function App(props: Views) {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Tools</h1>
        <ul>
          <li><Link to={Paths.ARK_RNG_PATH}>Arknights RNG</Link></li>
        </ul>
      </header>
    </div>
  );
}

export default App;
