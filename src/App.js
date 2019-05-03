import React from 'react';
import logo from './logo.svg';
import './App.css';
import Photos from './components/Photos/index';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="headerItems">
          <img src={logo} className="App-logo" alt="logo" />
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </div>
        <div className="headerItems">
          <ul>
            <li>by Ricky Tsao</li>
            <li>Project: AVL tree photo gallery</li>
            <li>Description: filter an image gallery by title</li>
            <li>Stack: React JS, Node JS</li>
            <li>Data stored in AVL tree to be extracted</li>
          </ul>
        </div>
      </header>
      <div id='main'><Photos /></div>
    </div>
  );
}

export default App;


