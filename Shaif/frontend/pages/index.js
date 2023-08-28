import dynamic from "next/dynamic";
import Link from "next/link";
const Title = dynamic(()=>import('./Layout/title'),{
  ssr: false,
})

export default function Index() {
    return (
      <>

      <Title page="index"></Title>

      <div className="hero min-h-screen bg-base-200">
  <div className="hero-content text-center">
    <div className="max-w-md">
    <h1 className="text-4xl font-bold">Welcome to Helpline Management</h1>
      <p className="py-6 text-2xl">Please <Link href="/provider/login" class="font-medium text-blue-400 dark:text-blue-500 hover:underline">Login</Link> first to provide women services </p>
      
      <Link href="/provider/register" class="font-medium text-blue-400 dark:text-blue-500 hover:underline">Not Registered?</Link>
 
  </div>
  </div>
</div>

        
        

        
      </>
    )
  }