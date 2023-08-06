import React, { useState } from 'react';

import axios from 'axios';

import { useRouter } from 'next/router';

import dynamic from 'next/dynamic'



const Header = dynamic(() => import('./Layout/header'),{
    ssr: false,
  })

const Title = dynamic(() => import('./Layout/title'),{
  ssr: false,
})




 

export default function SignUp() {

  const [name, setName] = useState('');

  const [username, setUsername] = useState('');

  const [email, setEmail] = useState('');

  const [password, setPassword] = useState('');

  const [contact, setPhone] = useState('');

  const [error, setError] = useState('');

  const [successMessage, setSuccessMessage] = useState('');

 

  const router = useRouter(); // Use useRouter

 

  const handleChangeName = (e) => {

    setName(e.target.value);

  };

 

  const handleChangeUsername = (e) => {

    setUsername(e.target.value);

  };

 

  const handleChangeEmail = (e) => {

    setEmail(e.target.value);

  };

 

  const handleChangePassword = (e) => {

    setPassword(e.target.value);

  };

 

  const handleChangePhone = (e) => {

    setPhone(e.target.value);

  };

 

  const handleSubmit = async (e) => {

    e.preventDefault();

 

    try {

      // Make a POST request to create a new user

      const response = await axios.post('http://localhost:3000/provider/register', {

        name,

        username,

        email,

        password,

        contact,

      });

 

      // Assuming the backend responds with a success message

      setSuccessMessage(response.data.message);

      // Clear input fields after successful signup

      setName('');

      setUsername('');

      setEmail('');

      setPassword('');

      setPhone('');

 

      // Redirect to the login page after successful signup

      router.push('/signin');

    } catch (error) {

      // Handle errors if the request fails

      setError('Signup failed. Please check your input and try again.');

      console.error('Signup failed:', error);

    }

  };

 

  return (

    <div>

      <h2>Signup</h2>
      <Title page="Sign Up"></Title>
     <Header></Header>
    <h1>Sign in to your account</h1> 

      <form onSubmit={handleSubmit}>

        <div>

          <label>Name</label>

          <input type="text" value={name} onChange={handleChangeName} />

        </div>
        <br></br>

        <div>

          <label>Username</label>

          <input type="text" value={username} onChange={handleChangeUsername} />

        </div>
        <br></br>

        <div>

          <label>Email</label>

          <input type="email" value={email} onChange={handleChangeEmail} />

        </div>
        <br></br>

        <div>

          <label>Password</label>

          <input type="password" value={password} onChange={handleChangePassword} />

        </div>
        <br></br>

        <div>

          <label>Phone Number</label>

          <input type="tel" value={contact} onChange={handleChangePhone} />

        </div>
        <br></br>

        {error && <p>{error}</p>}

        {successMessage && <p>{successMessage}</p>}

        <button type="submit">Signup</button>

      </form>

    </div>

  );

};

 

