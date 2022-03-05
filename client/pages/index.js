import React, { useEffect , useState } from 'react';
import Head from "next/head";
import UnregisteredHome from '../components/Home/unregistered_home';
import RegisteredHome from '../components/Home/registered_home';

const Home = () => {
  const [loggedin, set_loggedin] = useState(false);
  useEffect(()=>{
    if(document.cookie!==""){
      set_loggedin(true)
    }
  },[])

  return(
    <div>
      <Head>
        <title>Home / Twitter</title>
      </Head>

      {loggedin?
       <RegisteredHome/>:
       <UnregisteredHome set_loggedin={set_loggedin}/>
      }

    </div>
  )
}

export default Home;