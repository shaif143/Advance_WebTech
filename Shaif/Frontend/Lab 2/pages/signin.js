import React, { useState } from 'react';

import axios from 'axios';

import { useRouter } from 'next/router'; // Use useRouter from next/router

import dynamic from 'next/dynamic'



const Header = dynamic(() => import('./Layout/header'),{
    ssr: false,
  })

const Title = dynamic(() => import('./Layout/title'),{
  ssr: false,
})






 

export default function LoginForm () {

  const [username, setUsername] = useState('');

  const [password, setPassword] = useState('');

  const [error, setError] = useState('');

  const router = useRouter(); // Use useRouter

 

  const handleChangeUsername = (e) => {

    setUsername(e.target.value);

  };

 

  const handleChangePassword = (e) => {

    setPassword(e.target.value);

  };

 

  const handleSubmit = async (e) => {

    e.preventDefault();

 

    if (!username || !password) {

      setError('Username and password are required');

    } else {

      try {

        const response = await axios.post('http://localhost:3000/Provider/login', {

          username,

          password,

        });

 

        // Assuming the backend returns a token or authentication status

        console.log(response.data);

 

        // Redirect to the profile page upon successful login

        router.push('/viewprofile'); // Use router.push

      } catch (error) {

        setError('Login failed. Please check your username and password.');

        console.error('Login failed:', error);

      }

    }

  };

 

  return (

    <div>

    <Title page="Sign In"></Title>
     <Header></Header>
    <h1>Sign in to your account</h1> 

      <form onSubmit={handleSubmit}>

        <div>

          <label>Username</label>

          <input

            type="text"

            name="username"

            value={username}

            onChange={handleChangeUsername}

          />

        </div>
        <br></br>

        <div>

          <label>Password</label>

          <input

            type="password"

            name="password"

            value={password}

            onChange={handleChangePassword}

          />

        </div>
        <br></br>

        {error && <p>{error}</p>}

        <button type="submit">Login</button>

      </form>

    </div>

  );

};



 