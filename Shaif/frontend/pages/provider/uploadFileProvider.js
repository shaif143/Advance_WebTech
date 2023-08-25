import dynamic from "next/dynamic";
import Layout from "../Layout/layout";

const DynamicUploadFile = dynamic(import('../component/uploadFile'));

const UploadFileProvider = () => {
    return (
        <>
            <Layout title="File Upload - Provider">

                <div>
                    <DynamicUploadFile />
                </div>

            </Layout>
        </>
    )
};

export default UploadFileProvider ;