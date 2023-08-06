import Link from "next/link";

import dynamic from "next/dynamic";

const Layout = dynamic(()=>import('./Layout/layout'),{
  ssr: false,
})

const Title = dynamic(()=>import('./Layout/title'),{
  ssr: false,
})


export default function Home() {
  return (
    <>
    <Title page="index"> </Title>
    <Layout>
      <h1>Welcome</h1>
      <br></br>
      {/*<button><Link href="aboutus">About Us</Link></button>*/}
      

      </Layout>
    </>
  )
}
