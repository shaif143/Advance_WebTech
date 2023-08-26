import axios from "axios";
import React, { useState, useEffect } from 'react';
import Title from "../Layout/title";
import SessionCheck from "../utils/sessionCheck";
import { useRouter } from 'next/router';
const BankDetails = () => {
    const [bankData, setBankData] = useState([]);
    const router=useRouter();
    const  providerID = router.query.id;
    useEffect(() => {
        getBankInfo();
    }, []);


    const getBankInfo = async () => {
        try {
            const response = await axios.get(process.env.NEXT_PUBLIC_API_BASE_URL + '/getBankInfo', {
                withCredentials: true // Include session cookies
            });

            setBankData(response.data); 
            console.log(response.data);
        } catch (error) {
            console.log('Error Fetching Bank Data:', error);
        }
    };

    return (
        <>
            <Title title="BankDetails" />
            <div>
                <SessionCheck />

                {bankData.map((bankData, index) => (
                    <div key={index} style={{ marginBottom: '20px' }}>
                        <h5>Service ID: {bankData.accountName}</h5>
                        <h5>Service Type: {bankData.accountNumber}</h5>
                        <p>Contact: {bankData.branch}</p>
                        <p>Useful Links: {bankData.routingNumber}</p>
                        
                    </div>
                ))}
            </div>
        </>
    );
};

export default BankDetails;
