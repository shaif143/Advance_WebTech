import axios from "axios";
import React, { useState, useEffect } from 'react';
import Title from "../Layout/title";
import SessionCheck from "../utils/sessionCheck";
import { useRouter } from 'next/router';
const ServiceHistory = () => {
    const [serviceDataList, setServiceDataList] = useState([]);
    const router=useRouter();
    const  providerID = router.query.id;
    useEffect(() => {
        getService();
    }, []);


    const getService = async () => {
        try {
            const response = await axios.get(process.env.NEXT_PUBLIC_API_BASE_URL + '/getAllServices', {
                withCredentials: true // Include session cookies
            });

            setServiceDataList(response.data); // Set the array of service data
            console.log(response.data);
        } catch (error) {
            console.log('Error Fetching Service Data:', error);
        }
    };

    return (
        <>
            <Title title="Services" />
            <div>
                <SessionCheck />

                {serviceDataList.map((serviceData, index) => (
                    <div key={index} style={{ marginBottom: '20px' }}>
                        <h5>Service ID: {serviceData.id}</h5>
                        <h5>Service Type: {serviceData.serviceType}</h5>
                        <p>Contact: {serviceData.contact}</p>
                        <p>Useful Links: {serviceData.usefulLinks}</p>
                        
                    </div>
                ))}
            </div>
        </>
    );
};

export default ServiceHistory;
