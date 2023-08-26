import axios from 'axios';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';

import SessionCheck from '../utils/sessionCheck';

const BankInfoForm = () => {
    const [bankData, setBankData] = useState({

        accountName: "",
        accountNumber: 0,
        branch:"",
        routingNumber: 0,
        
    });

    const [existingBankData, setExistingBankData] = useState(null);

    useEffect(() => {
        // Fetch existing bank information for the user
        fetchExistingBankInfo();
    }, []);

    const fetchExistingBankInfo = async () => {
        try {
            const response = await axios.get(process.env.NEXT_PUBLIC_API_BASE_URL + '/getBankInfo', {
                withCredentials: true
            });
            if (response.data) {
                setExistingBankData(response.data);
            }
        } catch (error) {
            console.error('Error fetching bank info:', error);
        }
    };




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
           // alert("Banking Information Added Successful!");
            fetchExistingBankInfo(); // Fetch updated bank info after adding
        } catch (error) {
            console.error('Bank Info could not added:', error);
            alert("Bank Info could not added!");
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
                            <button type="submit" class="text-white bg-green-500 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Provide</button>
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