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

                if(civilianId!=[0]){

                console.log(response.data);
                setCivilianData(response.data); 
                

                }
                else{
                    alert("Civilian id didn't match!");
                    window.location.reload();
                }
            
            
        } catch (error) {
            console.error(error);
            setCivilianData(null); 
            alert("Civilian Search Failed!");
        }
    };

    return (
        <>
            <SessionCheck /> 


            <div className="flex flex-wrap justify-center">
                <div>
                    <br/><br/><br/>
                    <h3 className="text-center mb-4 text-3xl font-bold text-black">  Search Civilian by ID </h3>
                    <form className="mt-4" onSubmit={handleSubmit}>
                        <div className="mb-6">
                            <input
                                            type="number"
                                            name="civilianId"
                                            placeholder="Enter civilian ID "
                                            value={civilianId}
                                            onChange={handleChange}
                                            required
                                            className="text-center shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"/>
                       <br/><br/>
                      <center> <button type="submit" className="btn btn-outline btn-wide btn-info normal-case text-xl mb-8 hover:bg-deepskyblue">Search</button></center>

                         </div>
                    </form>                     
               
            
                        
                        


                        
                  
                
                <div>
                {civilianData && (
                    
                        
                        <center>
                        <h3 className="text-center text-xl font-bold text-black">Civilian Details:</h3>
                        <p className="text-center text-xl text-black">Civilian ID: {civilianData.id}</p>
                        <p className="text-center text-xl text-black">Civilian Name: {civilianData.name}</p>
                        <p className="text-center text-xl text-black">Civilian Username: {civilianData.username}</p>
                        <p className="text-center text-xl text-black">Civilian Email: {civilianData.email}</p>
                        <p className="text-center text-xl text-black">Civilian Contact: {civilianData.contact}</p>
                        <p className="text-center text-xl text-black">Civilian Age: {civilianData.age}</p>
                        <p className="text-center text-xl mb-80 text-black">Civilian Profession: {civilianData.profession}</p>
                        </center>
                        
                    
                )}
                </div>
            </div>
            </div>
        </>
    );
};

export default SearchCivilianForm;
