import axios from "axios";
import React, { useState, useEffect } from 'react';
import Title from "../Layout/title";
import SessionCheck from "../utils/sessionCheck";
import { useRouter } from 'next/router';
const CivilianHistory = () => {
    const [civilianDataList, setCivilianDataList] = useState([]);
    const router=useRouter();
    const  providerID = router.query.id;
    useEffect(() => {
        getCivilian();
    }, []);


    const getCivilian = async () => {
        try {
            const response = await axios.get(process.env.NEXT_PUBLIC_API_BASE_URL + '/getAllCivilian', {
                withCredentials: true // Include session cookies
            });

            setCivilianDataList(response.data); // Set the array of service data
            console.log(response.data);
        } catch (error) {
            console.log('Error Fetching Civilian Data:', error);
        }
    };

    return (
        <>
            <Title title="RegCivilian" />
            <div>
                <SessionCheck />

                {civilianDataList.map((civilianData, index) => (
                    <div key={index} style={{ marginBottom: '20px' }}>
                        <h5>Name: {civilianData.name}</h5>
                        <h5>Username: {civilianData.username}</h5>
                        <p>Email: {civilianData.email}</p>
                        <p>Contact: {civilianData.contact}</p>
                        <h5>Age: {civilianData.age}</h5>
                        <h5>Profession: {civilianData.profession}</h5>
                       
                        
                        
                    </div>
                ))}
            </div>
        </>
    );
};

export default CivilianHistory;
