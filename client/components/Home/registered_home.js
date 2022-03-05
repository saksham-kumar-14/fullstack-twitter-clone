import LeftRegsiteredHome from "./left";
import MiddleRegisteredHome from "./middle";
import RightRegisteredHome from "./right";
import jwt from 'jsonwebtoken'
import React , { useEffect, useState } from "react";

const RegisteredHome = () => {
    const [dark_mode, set_dark_mode] = useState(true);
    const [user_info , set_user_info] = useState();

    const purify = (token) => {
        let start = 0;
        for(let i=0;i<token.length;i++){
            if(token[i]==="="){
                start = i+1;
            }
        }
        return token.slice(start,token.length)
    }

    useEffect(()=>{
        const temp_token = document.cookie;
        const token = purify(temp_token);
        const user = jwt.decode(token);
        set_user_info(user);
        set_dark_mode(user["dark_mode"])

    },[])
    
    return(
        <div className={dark_mode?"flex h-[100vh] bg-gray-800 text-white":"flex h-[100vh] bg-[#F5F8FA] text-black"}>
            <LeftRegsiteredHome dark_mode={dark_mode} user_info={user_info} set_user_info={set_user_info}/>
            <MiddleRegisteredHome dark_mode={dark_mode} user_info={user_info} set_user_info={set_user_info}/>
            <RightRegisteredHome dark_mode={dark_mode} set_dark_mode={set_dark_mode}
             user_info={user_info} set_user_info={set_user_info}/>
        </div>
    )
}

export default RegisteredHome;