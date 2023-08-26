import dynamic from "next/dynamic";

import SessionCheck from "../utils/sessionCheck";


const Layout = dynamic(()=>import('../Layout/layout'),{
    ssr: false,
  });
  
  const Title = dynamic(()=>import('../Layout/title'),{
    ssr: false,
  });


const DynamicProviderProfile = dynamic(() => import('../component/providerProfileForm'));

const ProviderProfile = () => {
    return (
        <>
      
            <Title page ="Profile"></Title>
            <Layout>
           
                <SessionCheck />

                <div>
                    <DynamicProviderProfile />
                </div>
                
              </Layout> 
             
        </>
    );
};

export default ProviderProfile;