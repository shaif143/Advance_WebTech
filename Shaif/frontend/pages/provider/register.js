import Link from 'next/link';
import dynamic from 'next/dynamic';
import React, { useState } from 'react';

import MyFooter from '../Layout/footer';

const Title = dynamic(()=>import('../Layout/title'),{
    ssr: false,
  })

const DynamicRegisterForm = dynamic(() => import('../component/registerForm'), );

const SignUpPage = () => {
  return (
    <>
      <Title page="Registration" />

      <Link href="/provider"> <h1 align="center" className="bg-green-500 text-6xl text-white font-extrabold pb-6">Women Service Provider</h1> </Link>
      <section class="bg-center p-16 bg-cover bg-no-repeat bg-[url('/home.png')] bg-gray-700 bg-blend-multiply">


        <div>
          

          <DynamicRegisterForm />
        </div>

        <div>
          <MyFooter />
        </div>
        </section>
    </>
  );
};

export default SignUpPage;