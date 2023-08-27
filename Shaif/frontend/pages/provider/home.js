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

    <div className="flex flex-col min-h-screen">

    <div className="hero min-h-screen overflow-hidden" style={{backgroundImage: 'url(/home.png)'}}>
  <div className="hero-overlay bg-opacity-80"></div>
  <div className="hero-content text-center text-neutral-content">
    <div className="max-w-md">
      <h1 className="mb-5 text-5xl font-bold">Hello there</h1>
      <p className="mb-5">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
      <button className="btn btn-primary">Get Started</button>
    </div>
  </div>
</div>
</div>     
      </Layout>
    </>
  )
}
