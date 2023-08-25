import axios from "axios";
import React, { useState } from 'react';
import SessionCheck from "../utils/sessionCheck";
import {useRouter}  from 'next/router';



const FileUploadComponent = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('image', selectedFile);

    try {
      const response = await axios.put(process.env.NEXT_PUBLIC_API_BASE_URL + '/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log(response.data); // Response from the backend
    } catch (error) {
      console.error('Error uploading file:', error);
      console.error('Axios error details:', error.response); // Log the error response
    }
  };

  return (
    
    <div>
      
      <input type="file" accept=".jpg, .jpeg, .png, .webp, .gif" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default FileUploadComponent;
