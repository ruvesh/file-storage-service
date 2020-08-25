import React, { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import FileStorageService from '../service/FileStorageService'
import FileDrawerComponent from './FileDrawerComponent'


function UploadComponent({setFileInfos}){

    
    const [selectedFiles, setSelectedFiles] = useState(undefined)
    const [currentFile, setCurrentFile] = useState(undefined)
    const [progress, setProgress] = useState(0)
    const [message, setMessage] = useState("")
    

    //alert state hook
    const [alertVisible, setAlertVisible] = useState("hidden")

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
        setAlertVisible("visible")
    }

    useEffect(() => {
        FileStorageService.getFiles().then((response)=>{
            setFileInfos(response.data)
        })
    }, [])

    const setAlertVisibility = () => {
        setAlertVisible("hidden")
    }

    return(
        <div className="container" style={{margin: "auto", marginTop: "20px"}}>
            <div className="card" style={{maxHeight: "30vh", minWidth: "70em",maxWidth: "70em"}}>
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
                        <div className="progress" style={{visibility: alertVisible}}>
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

            <div className="alert alert-dark" role="alert" onClick={setAlertVisibility} 
            style={{visibility: alertVisible, minWidth: "70em",minHeight: "10vh", position: "absolute", zIndex: 1}}>
                {message} <button 
                className="btn btn-outline-danger" 
                style={{float: "right"}}
                onClick={setAlertVisibility}>x</button>
            </div>
            

        </div>
    )
}

export default UploadComponent