import React, { useEffect , useState } from 'react';
import Head from "next/head";
import UnregisteredHome from '../components/Home/unregistered_home';
import RegisteredHome from '../components/Home/registered_home';

const Home = () => {
  const [loggedin, set_loggedin] = useState(false);
  
  function decodeCookie(token){
    let start = 0;
    for(let i=0;i<token.length;i++){
      if(token[i]==="="){
        start = i+1;
        break;
      }
    }

    return token.slice(start,token.length)
  }
  
  useEffect(async () => {
    const token = decodeCookie(document.cookie)
    const res = await axios.get("http://localhost:3001/api/login", {
      headers: {
        "user-token": token
      }
    })
    const data = await res.data;
    if (data.userExists) {
      set_loggedin(true);
    } else {
      set_loggedin(false);
    }

  }, [])

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
