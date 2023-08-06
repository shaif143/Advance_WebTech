import React, { useState } from 'react';

import Link from 'next/link';

import axios from 'axios';

import { useRouter } from 'next/router';

import dynamic from 'next/dynamic';

const Header = dynamic(() => import('./Layout/header'),{
    ssr: false,
  })

const Title = dynamic(() => import('./Layout/title'),{
  ssr: false,
})
 

export default function signin() {

  const [username, setUsername] = useState('');

  const [password, setPassword] = useState('');

  const [error, setError] = useState('');

  const router = useRouter();

 

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

    } else if (!isValidUsername(username)) {

      setError('Invalid username');

    } else {

      setError('');

 

      try {
        const response = await axios.post('http://localhost:3000/Provider/login', {
            username,
            password,
        });
    
        console.log("Backend Response:", response.data);
    
        if (response.data  === "Provider Login Successful!") {
            router.push('/viewprofile');
        } else {
            setError('Incorrect username or password');
        }
    
        console.log("Login");
    } catch (error) {
        console.error('Login Failed:', error);
        if (error.response && error.response.data) {
            console.error('Response Data:', error.response.data);
        }
        setError('An error occurred during login. Please try again later.');
    }

    }

  };

  const isValidUsername = (username) => {

    const usernamePattern = /^[a-zA-Z0-9@._$]+$/;

    return usernamePattern.test(username);

  };

 

  return (
    <>
   <Title page="Sign In"></Title>
    <Header></Header>
    <h1>Sign in to your account</h1> 

    <form onSubmit={handleSubmit}>
    <div>
    <label>Username</label>
    <input type="text" id="username" name="username" required value={username} onChange={handleChangeUsername} />
    <br></br><br></br>
    </div>
    <div>
    <label>Password</label>
    <input type="password" id="password" name="password" required value={password} onChange={handleChangePassword} />
     <br></br><br></br>
    </div>
    {error && <p>{error}</p>}
    <input type="submit" value="loggin" />

    <Link href="forgotpassword">Forgotten account?</Link><br></br><br></br>
    </form>
    <button><Link href="/signup">Create new account</Link></button>
    </>
    );};