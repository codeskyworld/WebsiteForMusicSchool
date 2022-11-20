import React, { Fragment, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import Message from './Message';
import Progress from './Progress';



const FileUpload = () => {
    const [whetherBlacklist, setWhetherBlacklist] = useState("");
    const [file, setFile] = useState('');
    const [filename, setFilename] = useState('Choose File');
    const [uploadedFile, setUploadedFile] = useState({});
    const [message, setMessage] = useState('');
    const [uploadPercentage, setUploadPercentage] = useState(0);
    let history = useHistory();
    const emailStorage = localStorage.getItem("email");

    useEffect(() => {
        async function checkUser() {
            const emailStorage = localStorage.getItem("email");
            if (!emailStorage) {
                alert("Sorry, You have not login!");
                history.push("/");
                return;
            };

            console.log("The value of localStorage is " + emailStorage);
            await axios.post("http://localhost:3001/checkCurrentInformation", {
                headers: {
                    accept: "application/json",
                    "Content-Type": "application/json",
                },
                data: {
                    email: emailStorage,
                }
            })
                .then((res) => {
                    setWhetherBlacklist(res.data[0].whetherBlacklist);
                    console.log("whetherBlacklist is " + whetherBlacklist);
                    if(whetherBlacklist){
                        alert("Sorry, You don't have permission to upload data!");
                        history.push("/");
                    }
                })
                .catch((error) => alert("There is a mistake that." + error));
        };
        checkUser();
    }, [file]);


    const onChange = (e) => {
        setFile(e.target.files[0]);
        setFilename(e.target.files[0].name);

    }

    const onSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', file);

        try {
            const res = await axios.post('http://localhost:3001/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                onUploadProgress: progressEvent => {
                    setUploadPercentage(parseInt(Math.round((progressEvent.loaded * 100) /
                        progressEvent.total)));
                    setTimeout(() => setUploadPercentage(0), 10000);
                }
            });

            const { fileName, filePath } = res.data;
            setUploadedFile({ fileName, filePath });
            setMessage("File Uploaded");
        } catch (err) {
            if (err.response.status === 500) {
                setMessage("There was a problem with the server");
            } else {
                setMessage("err is " + err.response.data);
            }
        }
    }

    return (
        <div className="container mt-4 w-50">
            <h4 className="display-4 text-center mb-4">
                <i className="fab fa-react"></i> File Upload
            </h4>
            <Fragment>
                {message ? <Message msg={message} /> : null}
                <form onSubmit={onSubmit}>
                    <div className='custom-file mb-4'>
                        <input
                            type='file'
                            className='custom-file-input'
                            id='customFile'
                            onChange={onChange}
                        />
                        <label className='custom-file-label' htmlFor='customFile'>
                            {filename}
                        </label>
                    </div>

                    <Progress percentage={uploadPercentage} />

                    <input
                        type="submit"
                        value="Upload"
                        className="btn btn-primary btn-block mt-4"
                    />
                </form>
                {uploadedFile ? <div className="row mt-5">
                    <div className="col-md-6 m-auto">
                        <h3 className="text-center">{uploadedFile.fileName}</h3>
                        <img style={{ width: '100%' }} src={uploadedFile.filePath} alt="" />
                    </div>
                </div> : null}
            </Fragment>
        </div>
    );
};

export default FileUpload;
