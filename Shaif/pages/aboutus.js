import Link from "next/link";



import dynamic from "next/dynamic";

const Layout = dynamic(()=>import('./Layout/layout'),{
  ssr: false,
})

const Title = dynamic(()=>import('./Layout/title'),{
  ssr: false,
})

export default function About() {
    return (
      <>
      <Title page="aboutus"></Title>

        <Layout>
        <h1>Welcome to Helpline Management</h1>
        <button><Link href="/">index</Link></button>
        </Layout>
       
      </>
    )
  }