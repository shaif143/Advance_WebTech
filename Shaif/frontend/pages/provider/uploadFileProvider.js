import dynamic from "next/dynamic";



const Layout = dynamic(()=>import('../Layout/layout'),{
    ssr: false,
  });
  
  const Title = dynamic(()=>import('../Layout/title'),{
    ssr: false,
  });

const DynamicUploadFile = dynamic(import('../component/uploadFile'));

const UploadFileProvider = () => {
    return (
        <>
            <Title page="UploadPicture" />
            <Layout>

                <div>
                    <DynamicUploadFile />
                </div>

                </Layout>

           
        </>
    )
};

export default UploadFileProvider ;