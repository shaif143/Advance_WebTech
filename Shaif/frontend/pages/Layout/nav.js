import Link from "next/link";
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { useEffect, useState } from "react";
import axios from "axios";

export default function Nav(props){

const [theme, setTheme] = useState(localStorage.getItem("theme")?localStorage.getItem("theme") : "pastel");
const handleToggle = (e) => {
  if (e.target.checked){
    setTheme("aqua");
  }else{
    setTheme("pastel");
  }
};



useEffect(() =>{
  localStorage.setItem("theme", theme);
  const localTheme = localStorage.getItem("theme");
  document.querySelector("html").setAttribute("data-theme", localTheme);
},[theme]);

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
            localStorage.setItem('shouldResumeTimer', 'false');
            localStorage.removeItem('timeElapsed');
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
    <div className="navbar bg-blue-200 sticky top-0 z-100">
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
    <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content"style={{ marginTop: '85px' }}>
      {/* Sidebar content here */}

      <Link legacyBehavior href="../provider/home"><a className="btn btn-outline normal-case text-xl"><button>Home</button></a></Link>
      <br/> 
      <Link legacyBehavior href="../provider/provideService"><a className="btn btn-outline normal-case text-xl"><button>Provide Service</button></a></Link>
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

      <Link legacyBehavior href="../provider/providerProfile"><li><a className="justify-between">Profile</a></li></Link>
      <Link legacyBehavior href="../provider/uploadFileProvider"><li><a className="justify-between">Upload Profile Picture</a></li></Link>
      <Link legacyBehavior href="../provider/bankInfo"><li><a className="justify-between">Bank Details</a></li></Link>
      <Link legacyBehavior href="../provider/deleteAccount"><li><a className="justify-between">Delete Account</a></li></Link>
   
        <li><button onClick={Logout} className="btn btn-outline btn-error text-center hover:bg-red"> Log Out </button></li>
      </ul>
    </div>
  </div>
  <label className="swap swap-rotate pl-12 pr-8">
  <input 
    type="checkbox" 
    onChange={handleToggle} 
    checked={theme=="pastel" ? false: true}
    />
  <svg className="swap-on fill-current w-10 h-10 text-yellow-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z"/></svg>
  <svg className="swap-off fill-current w-10 h-10 " xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z"/></svg>
  
</label>
  </div>

  </div>
  
    </>
    
    )
    
    }