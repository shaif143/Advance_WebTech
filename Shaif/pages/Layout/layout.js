import Header from "./header";


export default function Layout ({children}){
    

    return (

        <>

        <Header></Header>

        <h1>Navigation`</h1>
        <br></br>
        {children}
        <br></br>
        <br></br>
        <h1>Footer</h1>

       

        </>

    )

}