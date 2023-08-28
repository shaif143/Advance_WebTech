import Link from "next/link";
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
    
    <Title page="Home"> </Title>
    <Layout>
    <SessionCheck />
  
<div className="hero min-h-screen bg-base-200">
  <div className="hero-content text-center">
    <div className="max-w-md">
      <h1 className="text-5xl font-bold">Hello there</h1>
      <p className="py-6">Please register for adding new civilian to provide the necessary services. Make sure you have varified the provided data given by the civilian. </p>
      <Link legacyBehavior href="../provider/addCivilian"><a className="btn btn-outline btn-wide btn-info normal-case text-xl mb-80 hover:bg-deepskyblue"><button>Register Civilian</button></a></Link>
  </div>
  </div>
</div>
    
      </Layout>
    </>
  )
}
