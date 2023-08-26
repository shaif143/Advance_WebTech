import dynamic from "next/dynamic";

import SessionCheck from "../utils/sessionCheck";


const Layout = dynamic(()=>import('../Layout/layout'),{
    ssr: false,
  });
  
  const Title = dynamic(()=>import('../Layout/title'),{
    ssr: false,
  });


const DynamicADDBankInfo = dynamic(() => import('../component/addBankInfoForm'));

const AddBankInfo = () => {
    return (
        <>
      
            <Title page ="AddBankInfo"></Title>
            <Layout>
           
                <SessionCheck />

                <div>
                    <DynamicADDBankInfo />
                </div>
                
              </Layout> 
             
        </>
    );
};

export default AddBankInfo ;