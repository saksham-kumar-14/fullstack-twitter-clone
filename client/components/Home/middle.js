import MiddleHeader from "./middle_header";
import { useEffect , useState } from "react";
import MiddlePosts from "./middle_posts";

const MiddleRegsiteredHome = ({ dark_mode , user_info , set_user_info }) => {
    const [posts, set_posts] = useState();

    useEffect(async ()=>{
        const res = await fetch('http://localhost:3001/getPosts');
        const data = await res.json();

        set_posts(data["posts"]);
    },[])

    return(
        <div className="border-r-2 border-l-2 w-[46%] border-gray-600 h-[100vh] overflow-y-scroll">
            <MiddleHeader dark_mode={dark_mode}  user_info={user_info} 
            set_user_info={set_user_info} posts={posts} set_posts={set_posts} />
            <MiddlePosts dark_mode={dark_mode} user_info={user_info} posts={posts} 
            set_posts={set_posts} set_user_info={set_user_info} />
        </div>
    )
}

export default MiddleRegsiteredHome;