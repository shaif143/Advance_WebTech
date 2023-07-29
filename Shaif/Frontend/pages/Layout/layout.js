import Header from "./header";
import Link from "next/link";



export default function Layout ({children}){
    

    return (

        <>

        <Header></Header>

        <h2>Women Service Provider</h2>
        <button><Link href="/">Home</Link></button>
        <button><Link href="aboutus">About Us</Link></button>
        <button><Link href="updateprofile">Update Profile</Link></button>
        <button><Link href="upload">Upload Profile Picture</Link></button>
        <button><Link href="addservices">Add New Services</Link></button>
        <button><Link href="registercivilian">Register Civilian</Link></button>
        <button><Link href="viewprofile">Profile</Link></button>
        <button><Link href="salaryinformation">Salary Information</Link></button>
        <button><Link href="emailcivilian">Email Civilian</Link></button>
        <button><Link href="servicehistory">Service History</Link></button>

        <br></br>
        {children}
        <br></br>
        <br></br>
        <h1>Footer</h1>

       

        </>

    )

}