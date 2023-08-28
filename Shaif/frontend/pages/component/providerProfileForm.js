import axios from "axios";
import React, { useState, useEffect } from 'react';
import Title from "../Layout/title";
import SessionCheck from "../utils/sessionCheck";
import Link from "next/link";


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

                    <h5 className="text-3xl" >{providerData.name}</h5>

                    <div className="flex mt-4 space-x-3 md:mt-2">
                        <center>
                            <p>Email : {providerData.email}</p>
                            <p>Contact : {providerData.contact}</p>
                        </center>
                    </div>

                    <div className="flex mt-4 space-x-3 md:mt-6 mb-16">
                        <Link href="../provider/updateProvider" className="link link-info">Do you want to edit profile?</Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProviderProfileForm;
