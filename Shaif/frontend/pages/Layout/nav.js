import Link from "next/link";

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
            document.cookie = ''; // Clear cookies
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
  <div className="flex-1 space-x-4">
    <a className="btn btn-outline normal-case text-xl"><Link href="../provider/home"><button>Home</button></Link></a>
    <a className="btn btn-outline normal-case text-xl"><Link href="../provider/provideService"><button>Provide Service</button></Link></a>
    <a className="btn btn-outline normal-case text-xl"><Link href="../provider/addCivilian"><button>Register Civilian</button></Link></a>
    
    <a className="btn btn-outline normal-case text-xl"><Link href="../provider/sendMail"><button>Email Civilian</button></Link></a>
    <a className="btn btn-outline normal-case text-xl"><Link href="../provider/history"><button>History</button></Link></a>
    
    
   
  </div>
  <div className="flex-none gap-2">
    <div className="form-control">
      <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" />
    </div>
    <div className="dropdown dropdown-end">
      <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
        <div className="profile-image" >
        <img src={process.env.NEXT_PUBLIC_API_BASE_URL+ `/photo?${Date.now()}`}  />
    </div>
        </div>
      </label>
      <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
        <li>
          <a className="justify-between">
          <Link href="../provider/providerProfile">Profile</Link>
          </a>
        </li>
        <li><a className="justify-between"><Link href="../provider/uploadFileProvider">Upload Profile Picture</Link></a></li>
        <li><a className="justify-between"><Link href="../provider/bankInfo">Bank Details</Link></a></li>
        <li><a><button onClick={Logout} class="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-1 text-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"> Sign Out </button></a></li>
      </ul>
    </div>
  </div>
</div>
   
    
  
    
    
    
    </>
    
    )
    
    }