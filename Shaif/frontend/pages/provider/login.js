import Link from 'next/link';
import dynamic from 'next/dynamic';
import MyFooter from '../layout/footer';


const Title = dynamic(()=>import('../Layout/title'),{
    ssr: false,
  })

const DynamicLoginForm = dynamic(() => import('../component/loginForm'),);

const LoginInPage = () => {
  return (
    <>
      <Title name="Login" />

      <Link href="/provider"> <h1 align="center" className="bg-green-500 text-6xl text-white font-extrabold p-6">Women Service Provider</h1> </Link>
      <section class="bg-center p-44 bg-cover bg-no-repeat bg-[url('https://www.candorblog.com/wp-content/uploads/2017/05/travel-022.jpg')] bg-gray-700 bg-blend-multiply">


        <div>
        

          <DynamicLoginForm />
        </div>

        <div>
          <MyFooter />
        </div>
        </section>
    </>
  );
};

export default LoginInPage;