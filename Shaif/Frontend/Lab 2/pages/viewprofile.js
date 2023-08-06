import Link from 'next/link'
import React, { useState, useEffect } from 'react';

import { useRouter } from 'next/router';
import dynamic from "next/dynamic";

import axios from 'axios';

const Layout = dynamic(()=>import('./Layout/layout'),{
  ssr: false,
})

const Title = dynamic(()=>import('./Layout/title'),{
  ssr: false,
})





export default function Profile() {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProfileData() {
      try {
        const response = await axios.get('http://localhost:3000/profile', {

          
          username,
          email,
          contact,
          password,

          //withCredentials: true, // This ensures that cookies are sent with the request
        });

        setProfileData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching profile:', error);
        setLoading(false);
      }
    }

    fetchProfileData();
  }, []);

  return (
    <div>
      <Title page="profile"> </Title>
      <Layout>
      {loading ? (
        <p>Loading...</p>
      ) : profileData ? (
        <div>
          <h2>Profile</h2>
          <p>Username: {profileData.username}</p>
          <p>Email: {profileData.email}</p>
          {/* Display other profile data as needed */}
        </div>
      ) : (
        <p>Failed to load profile data.</p>
      )}
      <Link href="deleteprovider">Delete Account</Link>
        </Layout>
    </div>
  );
}

    
  
