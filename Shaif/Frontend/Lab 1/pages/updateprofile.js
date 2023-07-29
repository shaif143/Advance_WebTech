import Link from 'next/link'

import dynamic from "next/dynamic";

const Layout = dynamic(()=>import('./Layout/layout'),{
  ssr: false,
})

const Title = dynamic(()=>import('./Layout/title'),{
  ssr: false,
})


export default function UpdateProfile() {
  return (
    <>
    <Title page="Update Profile"></Title>
    <Layout>
    
    <h1>Update Information</h1> 
        <form>
            <label>Name </label>
            <input type="text" name="name"></input><br /><br />
            <label>User Name </label>
            <input type="text" name="username"></input><br /><br />
            <label>Email </label>
            <input type="email" name="Email"/><br /><br />
            <label>Password </label>
            <input type="password" name="Password"/><br /><br />
            
            <label for="Contact">Enter your contact number:</label>
            <input type="tel" id="contact" name="contact" pattern="[+]{1}[0-9]{3}-[0-9]{4}-[0-9]{6}" placeholder="+8801 0000 000000" /><br /><br />

            <input type="submit" name="update" value="Update"  /><br />
           
        </form>
        <br />
        </Layout>
    
    </>
  );
}
