import axios from 'axios';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';

import SessionCheck from '../utils/sessionCheck';
import BankDetails from './bankInfoForm';

const BankInfoForm = () => {
    const [bankData, setBankData] = useState({

        accountName: "",
        accountNumber: 0,
        branch:"",
        routingNumber: 0,
        
    });



    const handleChange = (e) => {
        setBankData({ ...bankData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        bankData.accountNumber = parseInt(bankData.accountNumber);
        bankData.routingNumber = parseInt(bankData.routingNumber);
        
        console.log(bankData);

        try {
            const response = await axios.post(process.env.NEXT_PUBLIC_API_BASE_URL + '/addBankInfo', bankData, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });

            
                console.log(response.data);
            alert("Banking Information Added Successful!");
           
            
           
        } catch (error) {
            console.error('Bank Info could not added:', error);
            alert("You have already added bank details. Please contact administrator.");
        }
    };

    return (
        <>
          <SessionCheck /> 
          
            <br></br> <br></br>
         
            <div class="flex flex-wrap justify-center z-1 relative">
                <div>
                    <h3 class="text-center mb-4 text-3xl font-bold text-black"> Banking Details </h3>
                    <form class="mt-4" onSubmit={handleSubmit}>
                        <div class="mb-6">
                            <label for="accountName" class="block mb-2 text-sm font-medium text-black">Account Name</label>
                            <input type="text" id="accountName" name="accountName" onChange={handleChange} class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
                        </div>
                        
                        <div class="mb-6">
                            <label for="accountNumber" class="block mb-2 text-sm font-medium text-black">Account Number</label>
                            <input type="number" id="accountNumber" name="accountNumber" onChange={handleChange} class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
                        </div>
                       
                        <div class="mb-6">
                            <label for="branch" class="block mb-2 text-sm font-medium text-black">Branch</label>
                            <input type="text" id="branch" name="branch" onChange={handleChange} class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
                        </div>

                        <div class="mb-6">
                            <label for="routingNumber" class="block mb-2 text-sm font-medium text-black">Routing Number</label>
                            <input type="number" id="routingNumber" name="routingNumber" onChange={handleChange} class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
                        </div>

                        <center>
                            <button type="submit" className="btn btn-outline btn-wide btn-info normal-case text-xl mb-24 hover:bg-deepskyblue">Save</button>
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

export default BankInfoForm;