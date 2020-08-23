import http from '../http-common'

const upload = (file, onUploadProgress) => {
    let formData =  new FormData()

    formData.append("file", file)

    return http.post("/upload", formData, {
        headers: {
            "Content-Type": "application/json"
        },
        onUploadProgress
    })
}

const getFiles = () => {
    return http.get("/files")
}

export default {
    upload,
    getFiles
}