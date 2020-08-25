import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import UploadComponent from './component/UploadComponent';
import FileDrawerComponent from './component/FileDrawerComponent';

function App() {

  const [fileInfos, setFileInfos] = useState([])

  return (
    <div className="App">
      <header className="App-header">
        File Storage Service
      </header>
      <UploadComponent setFileInfos={setFileInfos}/>
      <FileDrawerComponent fileInfos={fileInfos}/>
    </div>
  );
}

export default App;
