import React , { useState } from "react";
import { UserIcon , HeartIcon } from "@heroicons/react/solid";
import { TrashIcon, ChatIcon, HeartIcon as HeartIcon2 } from "@heroicons/react/outline";
import Axios from 'axios';
import Comments from "./comments";

const MiddlePosts = ({ user_info , dark_mode , posts , set_posts , set_user_info }) => {
    const [comment, set_comment] = useState({
        show : false,
        post : null
    });

    function increase_likes(index){
        let new_posts = [];
        let new_post = {}
        posts.map((e)=>{new_posts.push(e)})

        new_posts.map((e,ind)=>{
            if(ind===index){
                e["likes"] += 1;
                e["people_liked"].push(user_info["username"])
                new_post["likes"] = e["likes"];
                new_post["username"] = e["username"];
                new_post["time"] = e["time"];
                new_post["people_liked"] = e["people_liked"]
                new_post["text"] = e["text"]
            }
        })

        set_posts(new_posts)

        Axios.post('http://localhost:3001/updatePost', {
            likes : new_post["likes"],
            username : new_post["username"],
            time : new_post["time"],
            people_liked : new_post["people_liked"],
            text : new_post["text"],
            comments : new_post["comments"]
        })
    }

    function remove_element(element, arr){
        let result = []
        arr.map((e)=>{
            if(e!==element){
                result.push(e)
            }
        })
        return result
    }

    function decrease_likes(index){
        let new_posts = []
        let new_post = {}
        posts.map((e)=>{new_posts.push(e)})

        new_posts.map((e,ind)=>{
            if(ind===index){
                e["likes"] -= 1;
                e["people_liked"] = remove_element(user_info["username"] , e["people_liked"])
                new_post["likes"] = e["likes"];
                new_post["username"] = e["username"];
                new_post["time"] = e["time"];
                new_post["people_liked"] = e["people_liked"]
                new_post["text"] = e["text"]
            }
        })

        set_posts(new_posts);

        Axios.post('http://localhost:3001/updatePost', {
            likes : new_post["likes"],
            username : new_post["username"],
            time : new_post["time"],
            people_liked : new_post["people_liked"],
            text : new_post["text"],
            comments : new_post["comments"]
        })
    }

    function delete_post(index){
        let new_posts = [];
        let new_post = {}
        posts.map((e,ind)=>{
            if(ind!==index){
                new_posts.push(e)
            }else{
                new_post["username"] = e["username"],
                new_post["time"] = e["time"],
                new_post["text"] = e["text"]
            }
        })

        set_posts(new_posts);

        Axios.post("http://localhost:3001/deletePost" , {
            username : new_post["username"],
            time : new_post["time"],
            text : new_post["text"]
        })

    }

    function update_comment(e){
        let temp = {};
        temp["show"] = true
        temp["post"] = e

        set_comment(temp);
    }

    return(
        <>
        <div>
            {posts!==undefined &&
            <div>
                {posts.map((e, index)=>{
                    return(
                        <div className={dark_mode?"cursor-pointer duration-300 hover:bg-slate-700 px-5 py-4 border-t-[0.25px] border-b-[0.25px] border-slate-500 flex flex-col":
                        "cursor-pointer duration-300 hover:bg-[#E1E8ED] px-5 py-4 border-t-[0.25px] border-b-[0.25px] border-slate-500 flex flex-col"}>
                            <div className="flex items-center">
                                <div className="w-[6%] mx-3">
                                    <UserIcon className="w-[100%] rounded-full bg-red-500"/>
                                </div>

                                <div className="w-[94%]">
                                    <div>
                                        <span className="font-semibold hover:underline">{e.name}</span>
                                        <span className="text-gray-400 mx-2">@{e.username}</span>
                                        <span className="text-gray-400 text-[0.9rem] hover:underline">.{e.time}</span>
                                    </div>
                                    <div>
                                        <span>{e.text}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-3">
                                <div className="flex justify-center items-center">
                                    <button onClick={()=>{
                                        update_comment(e)
                                    }} className="w-[12%] flex justify-center items-center pt-3 pb-1">
                                        <ChatIcon className="w-[100%] duration-300 hover:text-green-600"/>
                                    </button>
                                </div>
                                <div className="flex items-center justify-center duration-300 hover:text-red-600">
                                    <button onClick={()=>{
                                        if(!e["people_liked"].includes(user_info["username"])){
                                            increase_likes(index)
                                        }else{
                                            decrease_likes(index)
                                        }
                                    }} className="w-[12%] flex justify-center items-center pt-3 pb-1">
                                        {!e["people_liked"].includes(user_info["username"]) ?
                                        <HeartIcon2 className="w-[100%]"/>:
                                        <HeartIcon className="w-[100%] text-red-600"/>}
                                    </button>
                                    <span className=" mt-2 ml-2">{e.likes}</span>
                                </div>
                                <div className="flex justify-center items-center">
                                    <button onClick={()=>{
                                        if(user_info["username"]===e["username"]){
                                            delete_post(index);
                                        }else{
                                            alert("You haven't posted this!")
                                        }
                                    }} className="w-[12%] flex justify-center items-center pt-3 pb-1">
                                        <TrashIcon className="w-[100%] duration-300 hover:text-red-500"/>
                                    </button>
                                </div>
                            </div>

                        </div>
                    )
                })}    
            </div>}
        </div>

        {comment["show"] &&
        <div className={dark_mode?"flex flex-col items-center absolute top-0 bg-gray-800 h-[100vh] w-[46%] overflow-y-scroll":
        "flex flex-col items-center absolute top-0 bg-[#F5F8FA] h-[100vh] w-[46%] overflow-y-scroll"}>
            <Comments comment={comment} set_comment={set_comment} dark_mode={dark_mode}
            user_info={user_info} posts={posts} set_posts={set_posts}/>
        </div>}
                   
        </>
    )
}

export default MiddlePosts;