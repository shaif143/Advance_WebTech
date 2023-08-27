import axios from "axios";
import React, { useState } from 'react';

import SessionCheck from "../utils/sessionCheck";

const SearchCivilianForm = () => {
    const [civilianId, setCivilianId] = useState("");
    const [civilianData, setCivilianData] = useState(null);

    const handleChange = (e) => {
        setCivilianId(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.get(process.env.NEXT_PUBLIC_API_BASE_URL + '/search/Civilian/'+ civilianId,
                {
                    withCredentials: true
                });
            
            console.log(response.data);
            setCivilianData(response.data); // Store the fetched civilian data in state
        } catch (error) {
            console.error(error);
            setCivilianData(null); // Clear civilian data if search fails
            alert("Civilian Search Failed!");
        }
    };

    return (
        <>
            <SessionCheck /> 

            <div>
                <form onSubmit={handleSubmit}>
                    <center>
                        <table>
                            <tbody>
                                <tr>
                                    <td>Civilian ID:</td>
                                    <td>
                                        <input
                                            type="number"
                                            name="civilianId"
                                            placeholder="Enter civilian ID to search"
                                            value={civilianId}
                                            onChange={handleChange}
                                            required
                                        />
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                        <br />

                        <input type="submit" name="searchButton" value="SEARCH" />
                    </center>
                </form>
                
                {civilianData && (
                    <div>
                        <h2>Civilian Details:</h2>
                        <p>Civilian ID: {civilianData.id}</p>
                        <p>Civilian Name: {civilianData.name}</p>
                        <p>Civilian Username: {civilianData.username}</p>
                        <p>Civilian Email: {civilianData.email}</p>
                        <p>Civilian Contact: {civilianData.contact}</p>
                        <p>Civilian Age: {civilianData.age}</p>
                        <p>Civilian Profession: {civilianData.profession}</p>
                    
                    </div>
                )}
            </div>
        </>
    );
};

export default SearchCivilianForm;
