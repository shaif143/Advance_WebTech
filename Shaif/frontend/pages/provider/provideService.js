import dynamic from "next/dynamic";

import SessionCheck from "../utils/sessionCheck";


const Layout = dynamic(()=>import('../Layout/layout'),{
    ssr: false,
  });
  
  const Title = dynamic(()=>import('../Layout/title'),{
    ssr: false,
  });


const DynamicProvideService = dynamic(() => import('../component/provideServiceForm'));

const ProvideService = () => {
    return (
        <>
      
            <Title page ="ProvideService"></Title>
            <Layout>
           
                <SessionCheck />

                <div>
                    <DynamicProvideService />
                </div>
                
              </Layout> 
             
        </>
    );
};

export default ProvideService ;