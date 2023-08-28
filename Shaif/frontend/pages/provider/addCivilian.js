import dynamic from "next/dynamic";

import SessionCheck from "../utils/sessionCheck";


const Layout = dynamic(()=>import('../Layout/layout'),{
    ssr: false,
  });
  
  const Title = dynamic(()=>import('../Layout/title'),{
    ssr: false,
  });


const DynamicCivilianReg = dynamic(() => import('../component/addCivilianForm'));

const AddCivilian = () => {
    return (
        <>
      
            <Title page ="AddCivilian"></Title>
            <Layout>
           
                <SessionCheck />

                  <div className="hero min-h-screen bg-base-200">
                  <div className="hero-content text-center">
                    <div className="max-w-md">
                    <div><DynamicCivilianReg /></div>
                      
                  </div>
                  </div>
                </div>
                
              </Layout> 
              <br></br>
             
        </>
    );
};

export default AddCivilian ;