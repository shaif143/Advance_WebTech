import Link from 'next/link'

import dynamic from "next/dynamic";

const Layout = dynamic(()=>import('./Layout/layout'),{
  ssr: false,
})

const Title = dynamic(()=>import('./Layout/title'),{
  ssr: false,
})


export default function AddSalaryInformation() {
  return (
    <>
    <Title page="Salary Information"></Title>
    <Layout>
    
    <h1>Salary Information</h1> 
        <form>
            <label>Bank Name </label>
            <input type="text" name="bank_name"></input><br /><br />
            
            <label>Account Number </label>
            <input type="number" name="acc_number"></input><br /><br />
            

            <label>Routing number:</label>
            <input type="number" id="routing number" name="routing number"  placeholder="routing number" /><br /><br />

            <input type="submit" name="submit" value="Submit"  /><br /><br />
            
            <Link href="payslip">Download payslips</Link>

            
           
        </form>
        <br />
        </Layout>
    
    </>
  );
}
