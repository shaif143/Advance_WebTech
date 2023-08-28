import '../styles/globals.css'
import '../styles/globals.css';
import Head from 'next/head';


export default function App({ Component, pageProps }) {

  return (
    <>

      <Head>
        <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBslL6s1KtHML_rlyi_NDnnAKZ7wQu-hjs&libraries=places"></script>
    
      </Head>
      <Component {...pageProps} />
     
    </>
  
  );
}
