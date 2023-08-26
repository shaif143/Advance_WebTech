import axios from "axios";
import React, { useState, useEffect } from 'react';
import Title from "../Layout/title";
import SessionCheck from "../utils/sessionCheck";


const ProviderProfileForm = () => {
    const [providerData, setProviderData] = useState({});

    useEffect(() => {
        getProvider();
    }, []);

    const getProvider = async () => {
        try {
            const response = await axios.get(process.env.NEXT_PUBLIC_API_BASE_URL + '/profile', {
                withCredentials: true // Include session cookies
            });

            setProviderData(response.data);
            console.log(response.data);
        } catch (error) {
            console.log('Error Fetching Provider Data:', error);
        }
    };

    return (
        <>
            <Title title="ProviderProfile" />
            <div>
                <SessionCheck />

                <br></br>

                <div className="flex flex-col items-center pb-10">
                <img src={process.env.NEXT_PUBLIC_API_BASE_URL+ `/photo?${Date.now()}`}  />

                    <h5 >{providerData.name}</h5>

                    <div className="flex mt-4 space-x-3 md:mt-6">
                        <center>
                            <p>Email : {providerData.email}</p>
                            <p>Contact : {providerData.contact}</p>
                        </center>
                    </div>

                    <div className="flex mt-4 space-x-3 md:mt-6">
                        <a href="../provider/updateProvider" className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Edit Provider</a>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProviderProfileForm;
