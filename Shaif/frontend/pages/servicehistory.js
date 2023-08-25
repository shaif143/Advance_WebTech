import React, { useEffect, useState } from 'react';
import axios from "axios";
import Link from 'next/link';

import dynamic from "next/dynamic";

const Layout = dynamic(()=>import('./Layout/layout'),{
  ssr: false,
})

const Title = dynamic(()=>import('./Layout/title'),{
  ssr: false,
})





function ServiceHistory() {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/Provider/getAllServices')
      .then((response) => {
        console.log("API Response:", response.data);

        if (Array.isArray(response.data)) {
          setUserData(response.data);
        } else {
          console.error("API response is not an array:", response.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div>
      <Title page="servicehishoty"> </Title>
    <Layout>
      <h1>Service History</h1>
      <div>
        {userData.map((data, index) => (
          <div key={index}>
       <Link href={'allservice/'+data.servicetype}>{data.servicetype}</Link>     <h2>{data.servicetype}</h2>
            <p>Provider ID: {data.ProviderID}</p>
            <p>Contact: {data.contact}</p>
            
            <p>Useful Links: {data.usefullinks}</p>
            {/* other fields want to display */}
          </div>
        ))}
      </div>
      </Layout>
    </div>
  );
}

export default ServiceHistory;


