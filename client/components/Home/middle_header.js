import { UserIcon } from "@heroicons/react/solid"
import Axios from 'axios';
import jwt from 'jsonwebtoken'
import { useState } from 'react';

const MiddleHeader = ({ dark_mode , user_info , set_user_info , posts, set_posts }) => {
    const [text, set_text] = useState("");

    const set_cookie = (token) => {
        let cname = "user=" + token;
        const date = new Date();
        date.setTime(date.getTime() + (100*60*60*24*30))
        let expiry_date = "expires=" + date.toUTCString();
        
        const cookie = cname + "; " + expiry_date
        document.cookie = cookie 
    }

    const purify_time=(time)=>{
        return time.slice(0,25)
    }

    function tweet(){
        const time = new Date();

        let new_posts = [];
        posts.map((e)=>{
            new_posts.push(e);
        })
        new_posts.push({
            name : user_info["name"],
            username : user_info["username"],
            time : purify_time(time.toString()),
            likes : 0,
            people_liked : [],
            text : text
        })
        set_posts(new_posts);

        Axios.post("http://localhost:3001/createPost", {
            name : user_info["name"],
            username : user_info["username"],
            time : purify_time(time.toString()),
            likes : 0,
            people_liked : [],
            text : text
        })

        const token = jwt.sign({
            name: user_info["name"],
            email: user_info["email"], 
            password: user_info["password"],
            posts: user_info["posts"],
            username : user_info["username"],
            dark_mode : user_info["dark_mode"],
        }, "secret")
        set_cookie(token)


        set_text("")
    }

    return(
        <div className="flex flex-col py-3 px-6 border-b-2 border-gray-700">
            <span className="font-bold text-[1.5rem] my-2">Home</span>

            <div className="w-[100%] flex items-start">
                <button className="w-[6%] my- hover:opacity-80">
                    <UserIcon className="w-[100%] bg-red-500 rounded-full"/>
                </button>
                <div className="w-[94%] flex flex-col">
                    <textarea onChange={(e)=>{
                        set_text(e.target.value)
                    }} placeholder="What's happening?" 
                    className={dark_mode?"bg-gray-800 border-b-2 py-3 px-4 border-gray-500 outline-none text-[1.25rem]":
                    "bg-[#F5F8FA] border-b-2 py-3 px-4 border-gray-500 outline-none text-[1.25rem]"}>
                    </textarea>
                    <div className="flex justify-end">
                        <button onClick={()=>{
                            if(posts!==undefined && text!==""){
                                tweet()
                            }else{
                                alert("Write Something new ..")
                            }
                        }} className={dark_mode?"mx-2 my-4 rounded-[1.25rem] font-semibold bg-[#1DA1F2] py-[0.5rem] px-4":
                        "mx-2 my-4 rounded-[1.25rem] font-semibold bg-[#1DA1F2] py-[0.5rem] px-4 text-white"}>
                            Tweet</button>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default MiddleHeader;