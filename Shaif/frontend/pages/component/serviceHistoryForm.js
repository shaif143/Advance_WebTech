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

            if(serviceDataList!=[0]){
            setServiceDataList(response.data); // Set the array of service data
            console.log(response.data);
            }
            else{
                alert("There is no service data available");
            }
        } catch (error) {
            console.log('Error Fetching Service Data:', error);
        }
    };

    // Function to initialize and display Google Maps
    const initMap = (latitude, longitude, mapId) => {
        const mapOptions = {
            center: { lat: parseFloat(latitude), lng: parseFloat(longitude) },
            zoom: 15, // Adjust the zoom level as needed
        };

        const map = new google.maps.Map(document.getElementById(mapId), mapOptions);

        new google.maps.Marker({
            position: { lat: parseFloat(latitude), lng: parseFloat(longitude) },
            map,
            title: 'Service Location',
        });
    };

    useEffect(() => {
        // Load Google Maps API script
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBslL6s1KtHML_rlyi_NDnnAKZ7wQu-hjs`;
        // Replace YOUR_API_KEY with your actual Google Maps API key
        script.onload = () => {
            serviceDataList.forEach((serviceData) => {
                initMap(serviceData.latitude, serviceData.longitude, `map-${serviceData.id}`);
            });
        };
        document.head.appendChild(script);
    }, [serviceDataList]);

    return (
        <>
            <Title title="Services" />
            <div>
                <SessionCheck />

                {serviceDataList.map((serviceData, index) => (
                    <div key={index} style={{ marginBottom: '20px' }}>
                        <br></br><br></br>
                        <h5>Service ID: {serviceData.id}</h5>
                        <h5>Service Type: {serviceData.serviceType}</h5>
                        <p>Contact: {serviceData.contact}</p>
                        <p>Useful Links: {serviceData.usefullLinks}</p>

                        {/* Div to display the Google Map */}
                        <div id={`map-${serviceData.id}`} style={{ height: '300px' }}></div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default ServiceHistory;
