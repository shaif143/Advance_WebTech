import { useState } from 'react';
import Link from 'next/link'
import { useRouter } from 'next/router';

import dynamic from 'next/dynamic'


import axios from 'axios';

const Header = dynamic(() => import('./Layout/header'),{
    ssr: false,
  })

const Title = dynamic(() => import('./Layout/title'),{
  ssr: false,
})


export default function LoginForm () {

const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [error, setError] = useState('');
const router = useRouter();


const handleChangeEmail = (e) => {
setEmail(e.target.value);
};
const handleChangePassword = (e) => {
setPassword(e.target.value);
};
const handleSubmit = async (e) => {
e.preventDefault();


// Perform form validation
if (!email || !password) {
setError('Email and password are required');
} else if (!isValidEmail(email)) {
setError('Invalid email address');
} else {
  
const res = await doSignIn(email, password)
console.log(res);


        if(res==true) {
            router.push('/index')
        }
        else{
            setError('not found');
        }
        //console.log('Login successful:', response.data);
}

};

async function doSignIn(email, password){
    try{
        const response = await axios.post('http://localhost:3000/provider/login/',{
            email,
            password,
        });
        console.log(response.data)
        return response.data;
    }catch(error){
        console.error('Login failed:', error)
    }
}


const isValidEmail = (email) => {
    const emailPattern = /^\S+@\S+\.\S+$/;
    return emailPattern.test(email);
    };



    return (
    <>
   <Title page="Sign In"></Title>
    <Header></Header>
    <h1>Sign in to your account</h1> 

    <form onSubmit={handleSubmit}>
    <div>
    <label>Email</label>
    <input
    type="email"
    name="email"
    value={email}
    onChange={handleChangeEmail}
    /><br></br><br></br>
    </div>
    <div>
    <label>Password</label>
    <input
    type="password"
    name="password"
    value={password}
    onChange={handleChangePassword}
    /> <br></br><br></br>
    </div>
    {error && <p>{error}</p>}
    <button type="submit">Login</button> <br></br><br></br>

    <Link href="forgotpassword">Forgotten account?</Link><br></br><br></br>
    </form>
    <button><Link href="/signup">Create new account</Link></button>
    </>
    );};