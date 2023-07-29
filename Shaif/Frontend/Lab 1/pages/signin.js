import Image from 'next/image'
import Link from 'next/link'

import dynamic from 'next/dynamic'

const Header = dynamic(() => import('./Layout/header'),{
    ssr: false,
  })

const Title = dynamic(() => import('./Layout/title'),{
  ssr: false,
})


export default function SignIn() {
  return (
    <>
    <Title page="Sign In"></Title>
    <Header></Header>
    <h1>Sign in to your account</h1> 
        <form>
            
            <label>User Name </label>
            <input type="text" name="username"></input><br /><br />
           
            <label>Password </label>
            <input type="password" name="Password"/><br /><br />
            
            <input type="submit" name="Log in" value="Log in"  /><br />

            <Link href="forgotpassword">Forgotten account?</Link>

        </form>
        <br />
        <button><Link href="/signup">Create new account</Link></button>
    
    </>
  );
}
