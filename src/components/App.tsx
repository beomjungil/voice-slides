import React, { Component } from 'react';
import './App.css';
// import FileDropZone from './FileDropzone';
import Slides from './Slides';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          {/* <FileDropZone /> */}
          <Slides />
        </header>
      </div>
    );
  }
}

export default App;
