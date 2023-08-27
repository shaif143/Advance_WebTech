import dynamic from "next/dynamic";

import SessionCheck from "../utils/sessionCheck";


const Layout = dynamic(()=>import('../Layout/layout'),{
    ssr: false,
  });
  
  const Title = dynamic(()=>import('../Layout/title'),{
    ssr: false,
  });


const DynamicSearchCivilian = dynamic(() => import('../component/searchCivilianForm'));

const SearchCivilian = () => {
    return (
        <>
      
            <Title page ="Search"></Title>
            <Layout>
           
                <SessionCheck />

                <div>
                    <DynamicSearchCivilian/>
                </div>
                
              </Layout> 
             
        </>
    );
};

export default SearchCivilian;


