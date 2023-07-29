import Image from 'next/image'
import Link from 'next/link'

import dynamic from 'next/dynamic'

const Header = dynamic(() => import('./Layout/header'),{
    ssr: false,
  })

const Title = dynamic(() => import('./Layout/title'),{
  ssr: false,
})


export default function ForgotPassword() {
  return (
    <>
    <Title page="Forgotten Password"></Title>
    <Header></Header>
    <h1>Find Your Account</h1> 
        <form>
            <p>Please enter your email address to search for your account.</p>
            
            <input type="email" name="email" placeholder="Email address"></input><br /><br />
           
            
            
            <button><Link href="signin">Cancel</Link></button>
            <input type="submit" name="Search" value="Search"  />

        </form>
        <br />
        
    
    </>
  );
}
