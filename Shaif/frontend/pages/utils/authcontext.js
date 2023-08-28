import { createContext, useContext, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (username, cookie) => {
    setUser({ username, cookie });

  };

  const checkUser = () => {
    console.log("user:  "+user.username)
    console.log("user:  "+user.cookie)
    if(user.username!=null && user.cookie!=null) {
      return true;
    }
    else
    {
      return false;
    }

  };

  const logout = () => {

    Logout()
  };
  
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

  }
  return (
    <AuthContext.Provider value={{ user, login, logout,checkUser }}>
      {children}
    </AuthContext.Provider>
  );


};

export const useAuth = () => useContext(AuthContext);
