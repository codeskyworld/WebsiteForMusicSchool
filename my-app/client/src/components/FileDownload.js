import React, { useState, useEffect } from "react";
import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios'


const FileDownload = () => {

    const [files, setFiles] = useState();

    const getFiles = () => {
        axios.get("http://localhost:3001/files").then((response) => {
            setFiles(response.data)
            console.log("Files are " + response.data);
        });
    };

    useEffect(() => {
        getFiles();
    }, []);

    let filesToRender;
    if (files) {
        filesToRender = files.map((file, index) => {
            return <div className="col text-center" key={index}>
                <img id="allfiles" src={`http://localhost:3001/${file}`} />
                <p>{file}</p>
                <a className="fas fa-download" href={`http://localhost:3001/${file}`}  rel="noopener noreferrer" target="_blank" download>
                    Download
                </a>
            </div>;
        });
    } else {
        filesToRender = "Loading...";
    }

    return (
        <div className="container mt-5">
            <div id="manyPicture" className="container">
                {filesToRender}
            </div>
        </div>
    )
}

export default FileDownload
