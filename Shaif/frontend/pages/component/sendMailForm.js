import React, { useState } from 'react';
import axios from 'axios';
import SessionCheck from '../utils/sessionCheck';

const SendMailForm = () => {
    const [sendMailData, setSendMailData] = useState({
        receiver: "",
        subject: "",
        message: "",
    });


    const handleChange = (e) => {
        setSendMailData({ ...sendMailData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(sendMailData);

        try {
            const response = await axios.post(process.env.NEXT_PUBLIC_API_BASE_URL + '/sendmail/civilian', sendMailData, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });

            console.log(response.data);
            alert("Mail Sent to Civilian!");
        } catch (error) {
            console.error('Error Civilian Mail:', error);
            alert("Mail Sent to Civilian Failed!");
        }
    };

    return (
        <>
            <SessionCheck />

            <br></br> <br></br>
            <div class="flex flex-wrap justify-center">
                <div class="w-80">

                    <h3 class="text-center mb-4 text-3xl font-bold text-black">Send Email to Civilian</h3>
                    <form class="mt-4" onSubmit={handleSubmit}>
                        <div class="mb-6">
                            <label for="receiver" class="block mb-2 text-sm font-medium text-black">To</label>
                            <input type="text" id="receiver" name="receiver" onChange={handleChange} class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
                        </div>
                        <div class="mb-6">
                            <label for="subject" class="block mb-2 text-sm font-medium text-black">Subject</label>
                            <input type="text" id="subject" name="subject" onChange={handleChange} class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
                        </div>
                        <div class="mb-6">
                            <label for="message" class="block mb-2 text-sm font-medium text-black">Message</label>
                            <input type="text" id="message" name="message" onChange={handleChange} class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
                        </div>

                        <center>
                        <button type="submit" className="btn btn-outline btn-wide btn-info normal-case text-xl mb-80 hover:bg-deepskyblue">Send</button> 
                        </center>
                    </form>
                </div>
            </div>
        </>
    )
};

export default SendMailForm;