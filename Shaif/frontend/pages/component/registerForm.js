import { useRouter } from 'next/router';
import Link from 'next/link';
import axios from 'axios';
import React, { useState } from 'react';


const RegisterForm = () => {
  const router = useRouter();

  const [signUpForm, setSignUpFormData] = useState({
    name: "",
    username: "",
    email: "",
    contact: 1,
    password: "",
  });

  //const {name, username, email, contact, password} = signUpForm;

  const handleChange = (e) => {
    setSignUpFormData({ ...signUpForm, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    signUpForm.contact = parseInt(signUpForm.contact);
    console.log(signUpForm);

    try {
      const response = await axios.post(process.env.NEXT_PUBLIC_API_BASE_URL + '/register', signUpForm, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      console.log(response.data);
      alert("Provider Registration Successful!");
      router.push('/provider/login');
    } catch (error) {
      console.error('Error Provider Register:', error);
      alert("Provider Registration Failed!");
    }
  };

  return (
    <>
      <div class="flex flex-wrap justify-center mt-0 pt-0">
        <div class="w-80">

          <h3 class="text-center mb-4 text-3xl font-bold text-white">Create Provider</h3>
          <form class="mt-4" onSubmit={handleSubmit}>
            <div class="mb-6">
              <label for="name" class="block mb-2 text-sm font-medium text-white">Name</label>
              <input type="text" id="name" name="name" onChange={handleChange} class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
            </div>
            <div class="mb-6">
              <label for="username" class="block mb-2 text-sm font-medium text-white">Username</label>
              <input type="text" id="username" name="username" onChange={handleChange} class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
            </div>
            <div class="mb-6">
              <label for="email" class="block mb-2 text-sm font-medium text-white">Email address</label>
              <input type="email" id="email" name="email" onChange={handleChange} class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
            </div>
            <div class="mb-6">
              <label for="contact" class="block mb-2 text-sm font-medium text-white">Contact number</label>
              <input type="tel" id="contact" name="contact" onChange={handleChange} class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
            </div>
            <div class="mb-6">
              <label for="password" class="block mb-2 text-sm font-medium text-white">Password</label>
              <input type="password" id="password" name="password" onChange={handleChange} class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
            </div>

            <center>
              <button type="submit" class="text-white bg-green-500 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Sign up</button>
              <br></br><br></br>
              <Link href="../provider/login" class="font-medium text-blue-400 dark:text-blue-500 hover:underline pb-40">Already Registered?</Link>
            </center>
          </form>
        </div>
      </div>
    </>

  );
};

export default RegisterForm;