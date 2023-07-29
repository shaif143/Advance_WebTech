import Image from 'next/image'
import Link from 'next/link'

import dynamic from 'next/dynamic'

const Layout = dynamic(() => import('./Layout/layout'),{
    ssr: false,
  })

const Title = dynamic(() => import('./Layout/title'),{
  ssr: false,
})


export default function DeleteProvider() {
  return (
    <>
    <Title page="Delete Provider"></Title>
    <Layout>
    <h1>Delete Your Account</h1> 
        <form>
            <p>Please enter your password to delete your account.</p>
            
            <input type="text" name="password" placeholder="User Password"></input><br /><br />
           
            
            
            <button><Link href="viewprofile">Cancel</Link></button>
            <input type="submit" name="Delete" value="Delete"  />

        </form>
        <br />

        </Layout>   
    
    </>
  );
}
