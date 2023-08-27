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
                <div className="flex flex-col min-h-screen">

                <div className="hero min-h-screen" style={{backgroundImage: 'url(/home.png)'}}>
              <div className="hero-overlay bg-opacity-80"></div>
              <div className="hero-content text-center text-neutral-content">
                <div className="max-w-md">
                  <div><DynamicProvideService /></div>
                </div>
              </div>
            </div>
            </div> 
          
             
        </>
    );
};

export default ProvideService ;