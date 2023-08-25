
import dynamic from "next/dynamic";
import SessionCheck from "../utils/sessionCheck";
const Layout = dynamic(()=>import('../Layout/layout'),{
  ssr: false,
})

const Title = dynamic(()=>import('../Layout/title'),{
  ssr: false,
})


export default function Home() {
  return (
    <>
    
    <Title page="index"> </Title>
    <Layout>
    <SessionCheck />
      <h1>Welcome</h1>
      <br></br>
    
      

      </Layout>
    </>
  )
}
