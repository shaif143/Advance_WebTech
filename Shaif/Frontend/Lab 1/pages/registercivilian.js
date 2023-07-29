import Link from "next/link";

import dynamic from "next/dynamic";

const Layout = dynamic(()=>import('./Layout/layout'),{
  ssr: false,
})

const Title = dynamic(() => import('./Layout/title'),{
  ssr: false,
})


export default function RegisterCivilian() {
  return (
    <>
    <Title page="RegCivilian"></Title>
    <Layout>
    <h1>Register a new Civilian</h1> 
        <form>
            <label>Name </label>
            <input type="text" name="name"></input><br /><br />
            <label>User Name </label>
            <input type="text" name="username"></input><br /><br />
            <label>Email </label>
            <input type="email" name="email"/><br /><br></br>

            <label for="Contact">Enter your contact number:</label>
            <input type="tel" id="contact" name="contact" pattern="[+]{1}[0-9]{3}-[0-9]{4}-[0-9]{6}" placeholder="+8801 0000 000000" /><br /><br />
            
            <label>Age:</label>
            <input type="date" name="Age"/><br /><br></br>
            
            <p>Please select your gender:</p>
            <input type="radio" id="male"name="male" value="Male"/>
            <label for="male">Male</label><br></br>
            <input type="radio" id="female"name="female" value="Female"/>
            <label for="female">Female</label><br></br><br></br>
            
            
            
            <label>Profession </label>
            <input type="text" name="Profession"/><br /><br></br>            
            
            
            <input type="submit" name="submit" value="Register"  /><br />

        </form>
        <br />
        </Layout>
    
    </>
  );
}
