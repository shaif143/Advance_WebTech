import dynamic from "next/dynamic";
import Link from "next/link";
const Title = dynamic(()=>import('./Layout/title'),{
  ssr: false,
})

export default function Index() {
    return (
      <>

      <Title page="index"></Title>

        <h1>Welcome to Helpline Management</h1>
        <p>Please Login first to provide women services</p>
        <Link href="/provider/login" class="font-medium text-blue-400 dark:text-blue-500 hover:underline">Login</Link><br/>
        <Link href="/provider/register" class="font-medium text-blue-400 dark:text-blue-500 hover:underline">Not Registered?</Link>
      </>
    )
  }