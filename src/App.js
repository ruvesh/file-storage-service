import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import UploadComponent from './component/UploadComponent';
import FileDrawerComponent from './component/FileDrawerComponent';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        File Storage Service
      </header>
      <UploadComponent />
      {/* <FileDrawerComponent /> */}
    </div>
  );
}

export default App;
