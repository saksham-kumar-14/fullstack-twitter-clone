import { UserIcon } from "@heroicons/react/outline";
import { useEffect } from "react";

const UsernameTweet = ({ profile_posts }) => {

    return(
        <div>
            <div className="border-b-[0.1rem] border-gray-500 px-4">
                <button className="font-bold border-b-4 border-[#1DA1F2] duration-300 hover:bg-gray-700 py-2 px-3">Tweets</button>
            </div>

            {profile_posts.map((e)=>{
                return(
                    <div className="cursor-pointer duration-300 hover:bg-slate-700 px-5 py-4 border-t-[0.25px] border-b-[0.25px] border-slate-500 flex flex-col">
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

                </div>
                )
            })}

        </div>
    )
}

export default UsernameTweet;