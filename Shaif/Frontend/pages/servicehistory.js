import Image from 'next/image'
import Link from 'next/link'

import dynamic from 'next/dynamic'

const Layout = dynamic(() => import('./Layout/layout'),{
    ssr: false,
  })

const Title = dynamic(() => import('./Layout/title'),{
  ssr: false,
})


export default function ServiceProvided() {
  return (
    <>
    <Title page="Provided Services "></Title>
    <Layout>
    <h1>Provided Services</h1> 
    <p>Here data will come from session</p>
        <br />
        <br />

        </Layout>   
    
    </>
  );
}
