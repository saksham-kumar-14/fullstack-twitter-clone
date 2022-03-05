import { SearchIcon } from "@heroicons/react/outline";
import { SunIcon , MoonIcon } from "@heroicons/react/solid";
import React from 'react';
import Axios from 'axios';
import jwt from 'jsonwebtoken'

const HomeRightHeader = ({ dark_mode , set_dark_mode , user_info , set_user_info }) => {

    const set_cookie = (token) => {
        let cname = "user=" + token;
        const date = new Date();
        date.setTime(date.getTime() + (100*60*60*24*30))
        let expiry_date = "expires=" + date.toUTCString();
        
        const cookie = cname + "; " + expiry_date
        document.cookie = cookie 
    }

    const update_user_info = (value) => {
        user_info["dark_mode"] = value;
        set_user_info(user_info);

        Axios.post("http://localhost:3001/updateUser",{
            username : user_info["username"],
            dark_mode : value
        })

        const token = jwt.sign({
            name: user_info["name"],
            email: user_info["email"], 
            password: user_info["password"],
            username : user_info["username"],
            dark_mode : value,
        }, "secret")

        set_cookie(token);

    }

    function logout_user(){
        var cookies = document.cookie.split(";");
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i];
            var eqPos = cookie.indexOf("=");
            var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
            document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
        }

        location.reload()
    }

    function delete_user(){
        Axios.post("http://localhost:3001/deleteUser" , {
            email : user_info["email"]
        })

        var cookies = document.cookie.split(";");
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i];
            var eqPos = cookie.indexOf("=");
            var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
            document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
        }

        location.reload()
    }

    return(
        <div className="w-[100%] px-3 py-3">

            <div className="flex justify-center items-center">
                <div>
                    {dark_mode?
                    <div className="flex items-center bg-[rgb(100,100,100)] rounded-3xl py-2 px-2 mb-3">
                        <button onClick={()=>{
                            set_dark_mode(false)
                            update_user_info(false)
                        }} className="rounded-full px-3 py-3 bg-white"></button>
                        <SunIcon className="w-[2rem] ml-5 text-orange-500"/>
                    </div>:
                    <div className="flex items-center bg-[rgb(100,100,100)] rounded-3xl py-2 px-2 mb-3">
                        <MoonIcon className="w-[2rem] mr-5 text-yellow-300"/>
                        <button onClick={()=>{
                            set_dark_mode(true)
                            update_user_info(true)
                        }} className="rounded-full px-3 py-3 bg-white"></button>
                    </div>}
                </div>
            </div>

            <div className="px-3 py-2 flex items-center justify-center">
                <button onClick={()=>{
                    logout_user()
                }} className={dark_mode?"px-2 py-1 font-bold font-[1.25rem] mx-2 rounded-xl text-white border-2 border-white duration-1000 hover:text-black hover:bg-white":
                "px-2 py-1 font-bold font-[1.25rem] mx-2 rounded-xl text-black border-2 border-black duration-1000 hover:text-white hover:bg-black"}>Logout</button>
                <button onClick={()=>{
                    delete_user()
                }} className="px-2 py-1 font-bold font-[1.25rem] mx-2 rounded-xl text-red-600 border-2 border-red-600 duration-1000 hover:text-black hover:bg-red-600 ">Delete User</button>
            </div>

            <div className={dark_mode?"bg-[#14171A] rounded-3xl my-5 px-3 flex items-center":
            "bg-[rgb(230,230,230)] rounded-3xl py-1 px-3 my-5 flex items-center"}>
                <SearchIcon className="w-[1.1rem]"/>
                <input className={dark_mode?"bg-[#14171A] text-[1.1rem] px-2 py-1 outline-none":
                "bg-[rgb(230,230,230)] text-[1.1rem] px-2 py-1 outline-none"} placeholder="Search Twitter"></input>
            </div>

        </div>
    )
}

export default HomeRightHeader;