import Link from 'next/link'

import dynamic from "next/dynamic";

const Layout = dynamic(()=>import('./Layout/layout'),{
  ssr: false,
})

const Title = dynamic(()=>import('./Layout/title'),{
  ssr: false,
})


export default function AddServices() {
  return (
    <>
    <Title page="Add Services"></Title>
    <Layout>
    
    <h1>Add New Services</h1> 
        <form>
            <label>Service Type </label>
            <input type="text" name="name"></input><br /><br />
            <label>User Name </label>
            <input type="text" name="username"></input><br /><br />
            

            <label for="Contact">Enter your contact number:</label>
            <input type="tel" id="contact" name="contact" placeholder="+8801 0000 000000" /><br /><br />

            <label>Usefull Link </label>
            <input type="text" name="Link"/><br /><br />
            
            <input type="submit" name="addServices" value="Add Service"  /><br />
           
        </form>
        <br />
        </Layout>
    
    </>
  );
}
