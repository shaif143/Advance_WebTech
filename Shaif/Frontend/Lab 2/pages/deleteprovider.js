
import React, { useState } from 'react';

import axios from 'axios';
import dynamic from "next/dynamic";

const Layout = dynamic(()=>import('./Layout/layout'),{
  ssr: false,
})

const Title = dynamic(()=>import('./Layout/title'),{
  ssr: false,
})



export default function DeleteProvider() {

  const [successMessage, setSuccessMessage] = useState('');


 const handleDelete = async (e) => {
    e.preventDefault();
    axios.delete('http://localhost:3000/Provider/remove')
      .then((response) => {
        console.log(response);
        setSuccessMessage('Profile deleted successfully!');
      })
      .catch((error) => {
        console.error('Error updating profile:', error);
      });
  };




  return (
    <>
     <Title page="deleteprovider"> </Title>
    <Layout>
    
    <h1>Delete Your Account</h1> 
       
    <button onClick={handleDelete}>Delete</button>  
    <p>{successMessage}</p>

    </Layout>      
    </>
  );
}
