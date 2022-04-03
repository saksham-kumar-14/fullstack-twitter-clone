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
  
  useEffect(async()=>{
    try{
      const token = decodeCookie(document.cookie);
      const user = jwt.decode(token);
      const res = await axios.post("http://localhost:3001/login",{
        email : user.email,
        password : user.password
      })
      const data = await res.data;

      console.log(data)
      if(data.user){
        set_loggedin(true)
      }
    }catch(error){
      console.log(error)
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
