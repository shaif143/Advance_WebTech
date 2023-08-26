import dynamic from "next/dynamic";

import SessionCheck from "../utils/sessionCheck";


const Layout = dynamic(()=>import('../Layout/layout'),{
    ssr: false,
  });
  
  const Title = dynamic(()=>import('../Layout/title'),{
    ssr: false,
  });


const DynamicServiceHistory = dynamic(() => import('../component/serviceHistoryForm'));

const ServiceHistory = () => {
    return (
        <>
      
            <Title page ="Services"></Title>
            <Layout>
           
                <SessionCheck />

                <div>
                    <DynamicServiceHistory/>
                </div>
                
              </Layout> 
             
        </>
    );
};

export default ServiceHistory;


