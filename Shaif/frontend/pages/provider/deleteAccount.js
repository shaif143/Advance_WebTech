import React from 'react';
import axios from 'axios';
import SessionCheck from '../utils/sessionCheck';
import { useRouter } from 'next/router';
import Link from 'next/link';
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
      <center>
      <p className='text-xl mt-52 text-warning'> Are you sure you want to delete the account? Once you delete your account, your information will be deletd. </p>
      </center>
      <div className="flex justify-center mt-8">
      <button onClick={handleDelete} type="submit" className="btn btn-outline btn-wide btn-error normal-case text-xl mb-12 hover:bg-red">Delete Account</button>
    </div>
    <center>
    <Link href="/provider/home" className="link link-info text-xl">If you don't want to delete your account, click here.</Link>
    </center>
    </div>
  );
};

export default DeleteProviderAccount;
