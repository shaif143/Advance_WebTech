import dynamic from 'next/dynamic';
import MyFooter from '../Layout/footer';
import React from 'react';

const Title = dynamic(()=>import('../Layout/title'),{
  ssr: false,
})

const DynamicLoginForm = dynamic(() => import('../component/loginForm'));

const LoginInPage = () => {
  return (
    <>
      <Title page= "Login" />

      <h1 align="center" className="bg-green-500 text-6xl text-white font-extrabold p-6">Women Service Provider</h1>
      <section class="bg-center p-44 bg-cover bg-no-repeat bg-[url('/sif.jpg')] bg-gray-700 bg-blend-multiply">
      

        <div>
        

          <DynamicLoginForm/>
        </div>

        <div>
          <MyFooter />
        </div>
        </section>
    </>
  );
};

export default LoginInPage;