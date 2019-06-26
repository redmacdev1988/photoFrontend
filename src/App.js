import React from 'react';
import './App.css';
import Photos from './components/Photos/index';

const jumboTron = {
  margin: '20px',
}

const alertText = {
  fontSize: 'small',
}

function App() {
  return (
    <div className="App">

      <div id='main'><Photos /></div>

      <div className="headerItems" style={{width: '68%', color: 'black'}}>
          <div className="jumbotron" style={jumboTron}>
            <h1 className="display-4">AVL Gallery</h1>
            <p className="lead">A photo gallery using AVL Tree for organization and access</p>
            <hr className="my-4" />
            
            <div style={alertText} className="alert alert-primary" role="alert">
            I implemented an <a href='https://github.com/redmacdev1988/avl-binary-tree'>avl binary tree</a> that inserts strings alphabetically. 
            Functionalities include returning all data in an alphabetical and reverse alphabetical manner. 
            You can search data via exact matches and 'starting with' match.
            </div>

            <div style={alertText} className="alert alert-success" role="alert">
            I used Node JS for the <a href='https://github.com/redmacdev1988/photoBackend'> backend</a> to store all the images. When the server starts up, it gets the list of all images kept in the directory, 
            and then returns a json file. This json file is sent to the browser that tries to access its '/' path via GET.
            </div>

            <div style={alertText} className="alert alert-warning" role="alert">
            I used React JS Redux for the <a href='https://github.com/redmacdev1988/photoFrontend'>frontend</a>. As the web app starts up, it fetches the list of images from the backend.
            Then it stores the data into the Redux store, and thus, the React component will render its contents. 
            </div>

           
          </div>
        </div>


    </div>
  );
}

export default App;


