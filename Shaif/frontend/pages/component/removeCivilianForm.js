import axios from "axios";
import React, { useState } from 'react';
import Title from "../layout/title";
import SessionCheck from "../utils/sessionCheck";

const RemoveCivilianForm = () => {
    const [civilianData, setCivilianData] = useState({
        civilianId: 0,
    });

    const handleChange = (e) => {
        setCivilianData({ ...civilianData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        civilianData.civilianId = parseInt(civilianData.civilianId);
        console.log(civilianData);

        try {
            const response = await axios.delete(process.env.NEXT_PUBLIC_API_BASE_URL + '/remove/Civilian/' + civilianData.civilianId,
                {
                    withCredentials: true
                });
            if(civilianData.civilianId==[0]){
                console.log(response.data);
            alert("Civilian Delete Successful!");
            window.location.reload();

            }
            else{
                alert("Civilian not found!");
                window.location.reload();
            }
            
        } catch (error) {
            console.error(error);
            alert("Civilian  Delete Failed!");
        }
    };

    return (
        <>
          <SessionCheck /> 

          

            <div>
                <form onSubmit={handleSubmit}>
                    <center>
                        <table>
                            <tr>
                                
                                <td>
                                    <input
                                        type="number"
                                        name="civilianId"
                                        placeholder="Remove civilian by ID"
                                        onChange={handleChange}
                                        required
                                        className="w-full px-9 py-2 border rounded-lg"
                                        style={{ fontSize: '26px' }}
                                    />
                                    </td>

                            </tr>
                        </table>

                        <br></br>
                      
                        <button type="submit" className="btn btn-outline btn-wide btn-error normal-case text-xl mb-80 hover:bg-red">Remove</button>
                    </center>
                </form>
            </div>
        </>
    )
};

export default RemoveCivilianForm;