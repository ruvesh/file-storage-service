import React, { useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import FileStorageService from '../service/FileStorageService'

function FileDrawerComponent(){
    
    return(
        <div className="container" style={{margin: "auto", marginTop: "20px"}}>
            <div className="card" style={{minHeight: "50vh", maxHeight: "50vh"}}>
                <div className="card-header">
                    <h3 class="card-title">YOUR FILES</h3>
                </div>
                <div class="card-body" style={{overflow: "scroll"}}>
                    
                </div>
            </div>
        </div>
    )
}

export default FileDrawerComponent