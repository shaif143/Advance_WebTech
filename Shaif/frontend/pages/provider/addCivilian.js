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

                <div>
                    <DynamicCivilianReg />
                </div>
                
              </Layout> 
             
        </>
    );
};

export default AddCivilian ;