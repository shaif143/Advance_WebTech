import dynamic from "next/dynamic";
import SessionCheck from "../utils/sessionCheck";

const Layout = dynamic(()=>import('../Layout/layout'),{
    ssr: false,
  });
  
  const Title = dynamic(()=>import('../Layout/title'),{
    ssr: false,
  });

const DynamicUpdateProvider = dynamic(() => import('../component/updateProviderForm'), { ssr: false });

const UpdateProviderPage = () => {
    return (
        <>
            <SessionCheck /> 

             <Title page="UpdateProfile" />
             <Layout>
                <div>
                    <DynamicUpdateProvider />
                </div>
            </Layout>
            
        </>
    )
};

export default UpdateProviderPage;