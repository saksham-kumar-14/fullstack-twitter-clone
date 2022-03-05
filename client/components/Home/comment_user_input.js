import { UserIcon } from '@heroicons/react/solid'
import { useState } from 'react';
import Axios from 'axios';

const CommentUserInput = ({ dark_mode, comment, set_comment, posts, set_posts, user_info }) => {
    const [text, set_text] = useState("");

    function purify_time(time){
        return time.slice(0,25);
    }

    function tweet_reply(){
        const date = new Date();    
        let new_posts = [];
        let new_post = {}

        posts.map((e)=>{
            if(e===comment["post"]){
                e["comments"].push({
                    username : user_info["username"],
                    name : user_info['name'],
                    likes : 0,
                    people_liked : [],
                    time : purify_time(date.toString()),
                    text : text
                })
                new_post = e
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
        <div className='w-[100%] flex items-center px-4 py-2'>
            <UserIcon className="w-[7%] rounded-full bg-red-500" />
            <textarea 
                onChange={(e)=>{
                    set_text(e.target.value)
                }} placeholder="What's happening?" 
                className={dark_mode?"bg-gray-800 border-b-2 py-3 px-4 border-gray-500 outline-none text-[1.25rem] w-[85%]":
                "bg-[#F5F8FA] border-b-2 py-3 px-4 border-gray-500 outline-none text-[1.25rem] w-[85%]"}>
            </textarea>
            <button onClick={()=>{
                if(text!==""){
                    tweet_reply()
                }else{
                    alert("Write Something new ..")
                }
            }} className={dark_mode?"mx-2 my-4 rounded-[1.25rem] font-semibold bg-[#1DA1F2] py-[0.5rem] px-4":
            "mx-2 my-4 rounded-[1.25rem] font-semibold bg-[#1DA1F2] py-[0.5rem] px-4 text-white"}>
                Tweet</button>
        </div>
    )
}

export default CommentUserInput;