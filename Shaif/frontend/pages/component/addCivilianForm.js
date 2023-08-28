import axios from 'axios';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';

import SessionCheck from '../utils/sessionCheck';

const AddCivilian = () => {
    const [civilianData, setCivilianData] = useState({

            name:"",     
            username:"",        
            email:"", 
            contact:0,
            age:0,
            profession:"",
   
        
    });




    const handleChange = (e) => {
        setCivilianData({ ...civilianData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        civilianData.contact = parseInt(civilianData.contact);
        civilianData.age = parseInt(civilianData.age);
        
        console.log(civilianData);

        try {
            const response = await axios.post(process.env.NEXT_PUBLIC_API_BASE_URL + '/addCivilian', civilianData, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });
                console.log(response.data);
                alert("Civilian Added Successful!");
                window.location.reload();       
            
        } catch (error) {
            console.error('Username is already used:', error);
            alert("Username is already used!");
        }
    };

    return (
        <>
          <SessionCheck /> 
          
            <br></br> <br></br>
         
            <div class="flex flex-wrap justify-center z-1 relative">
                <div>
                    <h3 class="text-center mb-4 text-3xl font-bold text-black"> Civilian Registration </h3>
                    <form class="mt-4" onSubmit={handleSubmit}>
                        <div class="mb-6">
                            <label for="name" class="block mb-2 text-sm font-medium text-black"> Name</label>
                            <input type="text" id="name" name="name" onChange={handleChange} class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
                        </div>
                        
                        <div class="mb-6">
                            <label for="username" class="block mb-2 text-sm font-medium text-black">Username</label>
                            <input type="text" id="username" name="username" onChange={handleChange} class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
                        </div>
                       
                        <div class="mb-6">
                            <label for="email" class="block mb-2 text-sm font-medium text-black">Email</label>
                            <input type="email" id="email" name="email" onChange={handleChange} class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
                        </div>

                        <div class="mb-6">
                            <label for="contact" class="block mb-2 text-sm font-medium text-black">Contact</label>
                            <input type="number" id="contact" name="contact" onChange={handleChange} class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
                        </div>

                        <div class="mb-6">
                            <label for="age" class="block mb-2 text-sm font-medium text-black">Age</label>
                            <input type="number" id="age" name="age" onChange={handleChange} class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
                        </div>

                        <div class="mb-6">
                            <label for="profession" class="block mb-2 text-sm font-medium text-black">Profession</label>
                            <input type="text" id="profession" name="profession" onChange={handleChange} class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
                        </div>

                        <center>
                        <button type="submit" className="btn btn-outline btn-wide btn-info normal-case text-xl mb-80 hover:bg-deepskyblue">Register</button>
                        </center>

                        <center>
                            <br></br><br></br>
                        </center>
                    </form>
                </div>
            </div>
          
          
    </>
)
};

export default AddCivilian;