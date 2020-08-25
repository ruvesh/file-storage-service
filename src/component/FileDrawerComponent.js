import React, { useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import FileStorageService from '../service/FileStorageService'

function FileDrawerComponent({fileInfos}){
    
    return(
        <div className="container" style={{margin: "auto", marginTop: "20px"}}>
            <div className="card" 
            style={{minHeight: "50vh", maxHeight: "50vh", minWidth: "70em",maxWidth: "70em"}}>
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

export default FileDrawerComponent