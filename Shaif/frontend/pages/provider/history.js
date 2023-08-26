import Link from "next/link";
import dynamic from 'next/dynamic'


const Layout = dynamic(() => import('../Layout/layout'), {
  ssr: false,
})
const Title = dynamic(() => import('../Layout/title'), {
  ssr: false,
})


export default function History( ) {

 
  return (
    <>

    <Title page="History"> </Title>
    <Layout>
    

<Link  className="link link-primary" href="/provider/servicehistory">ALL Services</Link>
<br/>
 <br/>
{/* <Link  className="link link-primary" href="/admindashboard/allmanager">ALL Manager</Link>
<br/>
 <br/> */}

   </Layout>
  
    </>
  )
}





