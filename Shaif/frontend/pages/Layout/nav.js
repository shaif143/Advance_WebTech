import Link from "next/link";
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { useAuth } from "../utils/authContext";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Nav(props){

  const router = useRouter();
  const [username, setUsername] = useState(null);

  async function Logout() {
    try {
        const response = await axios.post(process.env.NEXT_PUBLIC_API_BASE_URL + '/logout',
            null,
            {
                withCredentials: true, // Send cookies along with the request
            }
        );

        if (response.status === 201) {
            sessionStorage.removeItem('username');
            setUsername(null);
            //document.cookie = ''; // Clear cookies
            const cookies = Cookies.get();
            for (const cookieName in cookies) {
              Cookies.remove(cookieName);
      
            }
      
            sessionStorage.removeItem('email')
      
            console.log("Cookie distroy?"+document.cookie)
            router.push('../provider/login');
        } else {
            console.error('Sign-out failed:', response);
        }
    } catch (error) {
        console.error('Sign-out error:', error);
    }


};



    return(
    
    <>
    
    <div className="navbar bg-blue-200">
  <div className="flex-1">
  <div className="drawer">
  <input id="my-drawer" type="checkbox" className="drawer-toggle" />
  <div className="drawer-content">
    {/* Page content here */}
    <label htmlFor="my-drawer" className="btn btn-circle swap swap-rotate"><svg className="swap-off fill-current" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 512 512"><path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z"/></svg></label>
  </div> 
  <div className="drawer-side">
    <label htmlFor="my-drawer" className="drawer-overlay"></label>
    <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content"style={{ marginTop: '70px' }}>
      {/* Sidebar content here */}

      <Link legacyBehavior href="../provider/home"><a className="btn btn-outline normal-case text-xl"><button>Home</button></a></Link>
      <br/> 
      <Link legacyBehavior href="../provider/provideService"><a className="btn btn-outline normal-case text-xl"><button>Provide Service</button></a></Link>
      <br/>
      <Link legacyBehavior href="../provider/addCivilian"><a className="btn btn-outline normal-case text-xl"><button>Register Civilian</button></a></Link>
      <br/>
      <Link legacyBehavior href="../provider/removeCivilian"><a className="btn btn-outline normal-case text-xl"><button>Delete Civilian</button></a></Link>
      <br/>
      <Link legacyBehavior href="../provider/searchCivilian"><a className="btn btn-outline normal-case text-xl"><button>Search</button></a></Link>
      <br/>
      <Link legacyBehavior href="../provider/sendMail"><a className="btn btn-outline normal-case text-xl"><button>Email Civilian</button></a></Link>
      <br/>
      <div className="dropdown dropdown-hover">
      <label tabIndex={0} className="btn btn-outline normal-case text-xl btn-block"><button className="text-lg">History</button></label>
      <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-50">
    <li><Link legacyBehavior href="../provider/serviceHistory"><a className="link link-info">ALL Services</a></Link></li>
    <li><Link legacyBehavior href="../provider/civilianHistory"><a className="link link-info">Registered Civilian</a></Link></li>
    <li><Link legacyBehavior href="../provider/emailHistory"><a className="link link-info">Email History</a></Link></li>
  </ul>
</div>  
    </ul>
  </div>
</div>

</div>
  
  
  
<div className="flex-none gap-2">
    <div className="dropdown dropdown-end">
      <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
        <div className="w-16 rounded-full">
        <div className="profile-image" >
        <img src={process.env.NEXT_PUBLIC_API_BASE_URL+ `/photo?${Date.now()}`}  />
    </div>
        </div>
      </label>
      <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">

        <li><a className="justify-between"><Link href="../provider/providerProfile">Profile</Link></a></li>
        <li><a className="justify-between"><Link href="../provider/uploadFileProvider">Upload Profile Picture</Link></a></li>
        <li><a className="justify-between"><Link href="../provider/bankInfo">Bank Details</Link></a></li>
        <li><a className="justify-between"><Link href="../provider/deleteAccount">Delete Account</Link></a></li>
        <li><a><button onClick={Logout} class="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-1 text-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"> Sign Out </button></a></li>
      </ul>
    </div>
  </div>
  </div>

   
    
  
    
    
    
    </>
    
    )
    
    }