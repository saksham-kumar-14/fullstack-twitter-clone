import { ArrowLeftIcon, HeartIcon as HeartIcon2, TrashIcon, UserIcon } from '@heroicons/react/solid';
import { HeartIcon } from '@heroicons/react/outline';
import React from 'react';
import CommentUserProfile from "./comment_user_profile"
import CommentUserInput from './comment_user_input';
import Axios from 'axios';

const Comments = ({ comment , user_info , dark_mode , set_comment, set_posts, posts }) => {

    function deactivate_comments(){
        let temp = {};
        temp["show"] = false;
        temp["posts"] = undefined;

        set_comment(temp)
    }

    function increase_comment_likes(index){
        let new_posts = [];
        let new_post = {};
        posts.map((e)=>{
            if(e===comment["post"]){
                e["comments"].map((e,ind)=>{
                    if(ind===index){
                        e["likes"] += 1
                        e["people_liked"].push(user_info["username"])
                    }
                })

                new_post = e
            }

            new_posts.push(e)
        })
        set_posts(new_posts);

        Axios.post('http://localhost:3001/updatePost', {
            username : new_post["username"],
            time : new_post["time"],
            likes : new_post["likes"],
            people_liked : new_post["people_liked"],
            comments : new_post["comments"],
            text : new_post["text"]
        })
    }

    function remove_item(item, arr){
        let result = [];
        arr.map((e)=>{
            if(e!==item){
                result.push(e)
            }
        })
        return result;
    }

    function decrease_comment_likes(index){
        let new_posts = [];
        let new_post = {};
        posts.map((e)=>{
            if(e===comment["post"]){
                e["comments"].map((e,ind)=>{
                    if(ind===index){
                        e["likes"] -= 1
                        e["people_liked"] = remove_item(user_info["username"] , e["people_liked"])
                    }
                })

                new_post = e;
            }

            new_posts.push(e)
        })
        set_posts(new_posts);

        Axios.post('http://localhost:3001/updatePost', {
            username : new_post["username"],
            time : new_post["time"],
            likes : new_post["likes"],
            people_liked : new_post["people_liked"],
            comments : new_post["comments"],
            text : new_post["text"]
        })
    }

    function delete_comment(index){
        let new_posts = [];
        let new_post = {};
        posts.map((e)=>{
            if(e===comment["post"]){
                let new_comments = []
                e["comments"].map((e,ind)=>{
                    if(ind!==index){
                        new_comments.push(e);
                    }
                })
                e["comments"] = new_comments

                new_post = e;
            }

            new_posts.push(e)
        })

        set_posts(new_posts)

        Axios.post('http://localhost:3001/updatePost', {
            username : new_post["username"],
            time : new_post["time"],
            likes : new_post["likes"],
            people_liked : new_post["people_liked"],
            comments : new_post["comments"],
            text : new_post["text"]
        })
    }

    return(
        <>
            <div className='flex items-center w-[100%] py-3 px-4'>
                <button onClick={()=>{
                    deactivate_comments();
                }} className="rounded-full duration-300 hover:bg-slate-600 px-3 py-3">
                    <ArrowLeftIcon className='w-[1.25rem]'/>
                </button>
                <span className='text-[1.5rem] font-semibold mx-6'>Tweet</span>
            </div>

            <CommentUserProfile comment={comment}/>

            <CommentUserInput dark_mode={dark_mode} comment={comment} set_comment={set_comment}
            posts={posts} set_posts={set_posts} user_info={user_info} />

            <div>
                {comment["post"]["comments"].map((e,index)=>{
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

                            <div className="grid grid-cols-2">

                                <div className="flex items-center justify-center">
                                    <button onClick={()=>{
                                        if(!e["people_liked"].includes(user_info["username"])){
                                            increase_comment_likes(index)
                                        }else{
                                            decrease_comment_likes(index)
                                        }
                                    }} className="w-[12%] flex justify-center items-center pt-3 pb-1 duration-300 hover:text-red-600">
                                        {e["people_liked"].includes(user_info["username"]) ? 
                                        <HeartIcon2 className='w-[100%] text-red-600' /> : 
                                        <HeartIcon className='w-[100%]' />}
                                    </button>
                                    <span className=" mt-2 ml-2">{e.likes}</span>
                                </div>

                                <div className="flex justify-center items-center">
                                    <button onClick={()=>{
                                        if(user_info["username"]===e["username"]){
                                            delete_comment(index);
                                        }else{
                                            alert("You haven't posted this!")
                                        }
                                    }} className="w-[12%] flex justify-center items-center pt-3 pb-1 duration-300 hover:text-red-600">
                                        <TrashIcon className="w-[100%]"/>
                                    </button>
                                </div>
                            </div>

                        </div>
                    )
                })}
            </div>
        </>
    )
}

export default Comments;