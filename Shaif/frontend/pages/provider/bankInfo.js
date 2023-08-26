import dynamic from "next/dynamic";
import Link from "next/link";
import SessionCheck from "../utils/sessionCheck";


const Layout = dynamic(()=>import('../Layout/layout'),{
    ssr: false,
  });
  
  const Title = dynamic(()=>import('../Layout/title'),{
    ssr: false,
  });


const DynamicBankDetails = dynamic(() => import('../component/bankInfoForm'));

const BankDetails = () => {
    return (
        <>
      
            <Title page ="BankDetails"></Title>
            <Layout>
           
                <SessionCheck />

                <div>
                    <DynamicBankDetails/>
                </div>
                <div>
                <Link href="addBankInfo"><button>Add Bank Details</button></Link>
                </div>
                
              </Layout> 

             
        </>
    );
};

export default BankDetails;


