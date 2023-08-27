import React from 'react';
import axios from 'axios';
import SessionCheck from '../utils/sessionCheck';
import { useRouter } from 'next/router';

const DeleteProviderAccount = () => {
    const router = useRouter();
  const handleDelete = async () => {
    try {
      const response = await axios.delete(process.env.NEXT_PUBLIC_API_BASE_URL + '/remove', {
        withCredentials: true,
      });

      if (response.status === 200) {
        console.log(response.data);
        alert("Account Deleted Successfully!");
        await Logout();
        router.push('/provider/login');
        // You might want to redirect the user to a different page after deletion
      } else {
        console.error('Account could not be deleted.');
        alert("Account could not be deleted.");
      }
    } catch (error) {
      console.error('Error deleting account:', error);
      alert("An error occurred while deleting the account.");
    }
  };


  const Logout = async () => {
    try {
      const response = await axios.post(process.env.NEXT_PUBLIC_API_BASE_URL + '/logout', null, {
        withCredentials: true,
      });

      if (response.status === 201) {
        sessionStorage.removeItem('username');
        document.cookie = ''; // Clear cookies
      } else {
        console.error('Sign-out failed:', response);
      }
    } catch (error) {
      console.error('Sign-out error:', error);
    }
  };

  return (
    <div>
      <SessionCheck />
      <button onClick={handleDelete}>Delete Account</button>
    </div>
  );
};

export default DeleteProviderAccount;
