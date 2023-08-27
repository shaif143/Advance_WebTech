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

            console.log(response.data);
            alert("Civilian Delete Successful!");
            window.location.reload();
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
                                <td>Civilian ID:</td>
                                <td><input type="number" name="civilianId" placeholder="Enter civilian id to remove" onChange={handleChange} required /></td>
                            </tr>
                        </table>

                        <br></br>
                      
                        <input type="submit" name="removebutton" value="REMOVE"></input>
                    </center>
                </form>
            </div>
        </>
    )
};

export default RemoveCivilianForm;