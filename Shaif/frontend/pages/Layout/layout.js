
import Header from "./header";
import MyFooter from "./footer";
import Nav from "./nav";




export default function Layout ({children}){
    

    return (

        <>

        <Nav> </Nav>
        <Header></Header>
        
          
        {children}
        
        <MyFooter/>
        

       

        </>

    )

}