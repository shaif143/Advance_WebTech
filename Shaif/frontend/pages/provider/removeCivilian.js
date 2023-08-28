import dynamic from "next/dynamic";

import SessionCheck from "../utils/sessionCheck";


const Layout = dynamic(()=>import('../Layout/layout'),{
    ssr: false,
  });
  
  const Title = dynamic(()=>import('../Layout/title'),{
    ssr: false,
  });

const DynamicRemoveCivilianForm = dynamic(() => import('../component/removeCivilianForm'));

const RemoveCivilianPage = () => {
    return (
        <>
        <SessionCheck/>
        <Title page ="RemoveCivilian"></Title>
            <Layout>
       


            <div className="hero min-h-screen bg-base-200">
            <div className="hero-content text-center">
              <div className="max-w-md">
              <div><DynamicRemoveCivilianForm  /></div>
                
            </div>
            </div>
          </div>

            </Layout>
        </>
    )
};

export default RemoveCivilianPage;