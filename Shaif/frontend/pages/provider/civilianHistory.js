import dynamic from "next/dynamic";

import SessionCheck from "../utils/sessionCheck";


const Layout = dynamic(()=>import('../Layout/layout'),{
    ssr: false,
  });
  
  const Title = dynamic(()=>import('../Layout/title'),{
    ssr: false,
  });


const DynamicCivilianHistory = dynamic(() => import('../component/civilianHistoryForm'));

const CivilianHistory = () => {
    return (
        <>
      
            <Title page ="RegCivilian"></Title>
            <Layout>
           
                <SessionCheck />

        
              <center className="mt-12">
              <div><DynamicCivilianHistory /></div>
              </center> 
      
                
                
              </Layout> 
             
        </>
    );
};

export default CivilianHistory;


