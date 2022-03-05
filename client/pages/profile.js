import React , { useState , useEffect } from "react"
import jwt from 'jsonwebtoken';
import { ArrowLeftIcon, LocationMarkerIcon, UserIcon } from '@heroicons/react/outline'
import UsernameTweet from "../components/profile/tweet";
import { useRouter } from "next/router";
import Head from 'next/head'

const Username = () => {
    const [profile_posts, set_profile_posts] = useState();
    const [user_info, set_user_info] = useState();
    const router = useRouter();

    function purify_cookie(raw_token){
        let start = 0;
        for(let i=0;i<raw_token.length;i++){
            if(raw_token[i]==="="){
                start = i+1;
            }
        }

        return raw_token.slice(start,raw_token.length);
    }
    
    useEffect(async()=>{
        const raw_token = document.cookie;
        const token = purify_cookie(raw_token);
        const user_info = jwt.decode(token);
        set_user_info(user_info)

        let result = [];
        const res = await fetch("http://localhost:3001/getPosts");
        const data = await res.json();

        data["posts"].map((e)=>{
            if(e["username"]===user_info["username"]){
                result.push(e)
            }
        })
        console.log("profile_posts",result);
        set_profile_posts(result);
        
    },[])
    
    return(
        <>
        <Head>
            <title>Profile / Twitter</title>
        </Head>

        {(user_info!==undefined && profile_posts!==undefined) &&
            <div className="flex justify-center bg-gray-800 text-white h-[100vh]">
                <div className="w-[50%] border-l-2 border-r-2 border-gray-500 overflow-y-scroll">

                    <div>
                        <div className="flex items-center">
                            <button onClick={()=>{
                                router.push("../")
                            }} className="rounded-full">
                                <ArrowLeftIcon className="w-[2.5rem] rounded-full py-2 px-2 duration-300 hover:bg-gray-700"/>
                            </button>
                            <div className="flex flex-col justify- py-2 px-6">
                                <span className="font-bold text-[1.4rem]">{user_info["name"]}</span>
                                {profile_posts.length===1?
                                    <span className="text-[0.85rem] text-gray-400">{profile_posts.length} Tweet</span>:
                                    <span className="text-[0.85rem] text-gray-400">{profile_posts.length} Tweets</span>
                                }
                            </div>
                        </div>
                    </div>

                    <div className="relative">
                        <div className="w-[100%] h-[30vh] bg-white"></div>
                            <UserIcon className="mx-[2rem] absolute top-[20vh] w-[8rem] rounded-full border-2 border-black bg-red-600"/>
                    </div>

                    <div className="mt-[5rem] py-2 px-8">
                        <div className="flex flex-col justify-center">
                            <span className="font-bold text-[1.2rem]">{user_info["name"]}</span>
                            <span className="text-[0.85rem] text-gray-400">@{user_info["username"]}</span>
                        </div>

                        <span className=" text-gray-400 flex items-center mt-3"> <LocationMarkerIcon className="w-[1.2rem]"/> Communicating with a device somewhere on the internet</span>
                    </div>

                    <UsernameTweet profile_posts={profile_posts} />

                </div>
            </div>
        }

        </>
    )
}


export default Username