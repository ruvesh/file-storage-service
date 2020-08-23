import React, { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import FileStorageService from '../service/FileStorageService'


function UploadComponent(){

    const [selectedFiles, setSelectedFiles] = useState(undefined);
    const [currentFile, setCurrentFile] = useState(undefined);
    const [progress, setProgress] = useState(0);
    const [message, setMessage] = useState("");

    const [fileInfos, setFileInfos] = useState([]);

    const selectFile = (event) => {
        setSelectedFiles(event.target.files)
    }

    const upload = () => {
        let currentFile = selectedFiles[0]
        setProgress(0)
        setCurrentFile(currentFile)

        FileStorageService.upload(currentFile, (event) => {
            setProgress(Math.round(( 100 * event.loaded) / event.total))
        })
        .then((response) => {
            setMessage(response.data.message)
            return FileStorageService.getFiles();
        })
        .then((files) => {
            setFileInfos(files.data)
        })
        .catch(() => {
            setProgress(0)
            setMessage("Couldn't upload file")
            setCurrentFile(undefined)
        })

        setSelectedFiles(undefined)
    }

    useEffect(() => {
        FileStorageService.getFiles().then((response)=>{
            setFileInfos(response.data)
        })
    }, [])

    return(
        <div className="container" style={{margin: "auto", marginTop: "20px"}}>
            <div className="card" style={{maxHeight: "30vh"}}>
                <div className="card-header">
                    <h3 class="card-title">UPLOAD FILES</h3>
                </div>
                <div class="card-body">
                    <p class="card-text">Select a file to upload to drive</p>
                    <input type="file" onChange={selectFile}/>
                    <button className="btn btn-success"
                    disabled={!selectedFiles}
                    onClick={upload}>
                        Upload
                    </button>
                    {currentFile && (
                        <div className="progress">
                            <div
                                className="progress-bar progress-bar-info progress-bar-striped"
                                role="progressbar"
                                aria-valuenow={progress}
                                aria-valuemin="0"
                                aria-valuemax="100"
                                style={{ width: progress + "%" }}
                            >
                                {progress}%
                            </div>
                        </div>
                     )}
                </div>
            </div>

            <div className="alert alert-light" role="alert">
                {message}
            </div>

            <div className="card" style={{minHeight: "50vh", maxHeight: "50vh"}}>
                <div className="card-header">
                    <h3 class="card-title">YOUR FILES</h3>
                </div>
                <div class="card-body" style={{overflow: "scroll"}}>
                    <ul className="list-group list-group-flush">
                        {fileInfos &&
                            fileInfos.map((file, index) => (
                            <li className="list-group-item" key={index}>
                                <a href={file.url}>{file.name}</a>
                            </li>
                            ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default UploadComponent