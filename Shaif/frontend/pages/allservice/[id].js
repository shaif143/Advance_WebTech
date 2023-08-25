import { useRouter } from "next/router";
import axios from 'axios';

export default function allServices(){

    const router = useRouter();
    const service = router.query.id;


  //  const printService = (jasonData) => {

        return(
            <>
        
            
            {service}
{/*             
            <h2>Service Type: {jasonData.servicetype}</h2>
            <h2>id: {jasonData.id}</h2>
            <h2>Contact: {jasonData.contact}</h2>
            <h2>Usefull Links: {jsonData.usefullinks}</h2> */}
            </>

        );
    //}
    
}