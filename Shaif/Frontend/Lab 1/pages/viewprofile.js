import Link from 'next/link'

import dynamic from "next/dynamic";

const Layout = dynamic(()=>import('./Layout/layout'),{
  ssr: false,
})

const Title = dynamic(()=>import('./Layout/title'),{
  ssr: false,
})


export default function ViewProfile() {
  return (
    <>
    <Title page="View Profile"></Title>
    <Layout>
    
    <h1>Profile</h1> 
        <p>Here data will come from session</p>
        <br />

        <Link href="deleteprovider">Delete Account</Link>
        </Layout>
    
    </>
  );
}
