import { ClipboardListIcon, ArchiveIcon, BellIcon, BookmarkIcon, DotsCircleHorizontalIcon, HashtagIcon, HomeIcon, UserIcon } from "@heroicons/react/outline";
import LeftProfile from "./left_profile";

const LeftRegsiteredHome = ({ dark_mode , user_info }) => {
    const options = [
        {
            "icon" : <HomeIcon className="w-[2.25rem]" />,
            "name" : "Home"
        },{
            "icon" : <HashtagIcon className="w-[2.25rem]"/>,
            "name" : "Explore"
        },{
            "icon" : <BellIcon className="w-[2.25rem]"/>,
            "name"  :"Notifications"
        },{
            "icon" : <ArchiveIcon className="w-[2.25rem]"/>,
            "name" : "Messages"
        },{
            "icon" : <BookmarkIcon className="w-[2.25rem]"/>,
            "name" : "Bookmark"
        },{
            "icon" : <ClipboardListIcon className="w-[2.25rem]"/>,
            "name" : "Lists"
        },{
            "icon" : <UserIcon className="w-[2.25rem]"/>,
            "name" : "Profile"
        },{
            "icon" : <DotsCircleHorizontalIcon  className="w-[2.25rem]"/>,
            "name" : "More"
        }
    ]

    return(
        <div className="w-[24%] h-[100%] px-12 py-4 overflow-y-scroll h-[100vh]">
            <img className="my-3 w-[2.5rem]" src={dark_mode?"/logo.png":"/logo2.png"}/>

            <div className="flex flex-col">
                {options.map((e)=>{
                    return(
                        <div className={dark_mode?" py-[0.5rem] rounded-3xl flex items-center duration-300 hover:bg-gray-700 cursor-pointer":
                        " py-[0.5rem] rounded-3xl flex items-center duration-300 hover:bg-[#E1E8ED] cursor-pointer"}>
                            {e.icon}
                            <span className="ml-4 text-[1.15rem] font-medium">{e.name}</span>
                        </div>
                    )
                })}
            </div>

            <button className={dark_mode?"text-[1.15rem] font-bold w-[100%] rounded-3xl bg-[#1DA1F2] my-4 py-3":
            "text-[1.15rem] font-bold w-[100%] rounded-3xl bg-[#1DA1F2] my-4 py-3 text-white"}>
                Tweet
            </button>

            <LeftProfile dark_mode={dark_mode} user_info={user_info}/>

        </div>
    )
}

export default LeftRegsiteredHome;
