import Header from "./header";

import Nav from "./nav";



export default function Layout ({children}){
    

    return (

        <>

        <Header></Header>
        <Nav> </Nav>
       

        <br></br>
        {children}
        <br></br>
        <br></br>
        <h1>Footer</h1>

       

        </>

    )

}