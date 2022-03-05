import { UserIcon } from "@heroicons/react/solid";


const CommentUserProfile = ({ comment }) => {

    return(
        <div className="w-[100%] px-4 py-3">

            <div className="flex items-center">
                <UserIcon className="w-[2.5rem] bg-red-500 rounded-full duration-300 hover:opacity-80 cursor-pointer"/>

                <div className="flex flex-col px-3">
                    <span className="font-bold hover:underline cursor-pointer">{comment["post"]["name"]}</span>
                    <span className="text-gray-400">@{comment["post"]["username"]}</span>
                </div>
            </div>

            <div className="text-[1.5rem] py-4 px-6">
                <span>{comment["post"]["text"]}</span>
            </div>

            <div className="flex items-center py-2">
                <span className="text-gray-400 cursor-pointer hover:underline">{comment["post"]["time"]}</span>
                <span className="text-gray-400 cursor-pointer hover:underline">. Twitter for a device on the internet</span>
            </div>

            <div className="border-y-[0.1rem] border-gray-400 py-3">
                <span className="hover:underline cursor-pointer"> <span className="font-bold text-[1.1rem]">{comment["post"]["likes"]}</span> <span className="text-slate-400">Likes</span> </span>
                <span className="hover:underline cursor-pointer"><span>{comment["post"]["comments"].length}</span> <span className="text-slate-400">Quote Tweets</span></span>
            </div>

        </div>
    )
}

export default CommentUserProfile;