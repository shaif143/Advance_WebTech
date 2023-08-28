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
           
            <Layout/>
                <SessionCheck />
               

            <div className="hero min-h-screen bg-base-200">
            <div className="hero-content text-center">
              <div className="max-w-md">
              <div><DynamicProvideService /></div>
                
            </div>
            </div>
          </div>
          
             
        </>
    );
};

export default ProvideService ;