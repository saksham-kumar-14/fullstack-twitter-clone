import { DotsHorizontalIcon, UserIcon } from "@heroicons/react/solid";
import { useRouter } from 'next/router';

const LeftProfile = ({ dark_mode , user_info }) => {
    const router = useRouter();

    return(
        <div onClick={()=>{
            router.push("/profile")
        }} className={dark_mode?"flex items-center w-[100%] px-3 py-2 rounded-[3rem] cursor-pointer duration-300 hover:bg-gray-700 my-4":
        "flex items-center w-[100%] px-3 py-2 rounded-[3rem] cursor-pointer duration-300 hover:bg-[#E1E8ED] my-4"}>
            <UserIcon className="w-[20%] bg-red-500 rounded-full"/>

            {user_info!==undefined &&
                <div className="flex flex-col w-[65%] items-center">
                    <span className="font-bold">{user_info["name"]}</span>
                    <span className="text-gray-400">@{user_info["username"]}</span>
                </div>
            }

            <div className="flex justify-center w-[15%]">
                <DotsHorizontalIcon className="w-[1.5rem]"/>
            </div>
        </div>
    )
}

export default LeftProfile;