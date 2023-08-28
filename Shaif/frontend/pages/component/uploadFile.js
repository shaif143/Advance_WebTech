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
        withCredentials: true
      });

      alert('Profile picture update Successfully!')
      window.location.reload();
      console.log(response.data); // Response from the backend
    } catch (error) {
      console.error('Error uploading file:', error);
      console.error('Axios error details:', error.response); // Log the error response
    }
  };

  return (
    
    <>
    <SessionCheck></SessionCheck>



        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-900 dark:text-white" for="file_input">Upload Image File</label>
            <input id="file_input" type="file" accept=".jpg, .jpeg, .png, .webp, .gif" onChange={handleFileChange} class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="file_input_help" />
              <p class="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">PNG, JPG, JPEG, WEBP or GIF (MAX. 300kb).</p>
                </div>

                <center>
                            
                <button onClick={handleUpload} type="submit" className="btn btn-outline btn-wide btn-info normal-case text-xl mb-80 hover:bg-deepskyblue">Upload</button>
                <br></br><br></br>
                </center>
               
    </>
  );
};

export default FileUploadComponent;
