import Login from "../Login/login";
import Register from "../Register/register"
import { useState } from "react";

const UnregisteredHome = ({ set_loggedin }) => {
    const [ state , set_state ] = useState("");
    
    return(
        <>
        <div className="grid grid-cols-2 h-[100vh] bg-black text-gray-200">
            <img className="h-[100%]" src="/unregistered_twitter_home.png"></img>

            <div className="py-16 px-5">
                <img src="/logo.png"></img>
                <h1 className="font-bold text-[4.5rem]">Happening now</h1>
                <h2 className="font-bold text-[2rem] pt-4">Join Twitter today</h2>
                <div className="flex w-[100%] justify-center">
                    <button onClick={()=>{
                        set_state("register")
                    }} className="py-2 mt-6 px-5 rounded-3xl text-white font-bold bg-blue-500 duration-300 hover:bg-blue-600">
                        Sign up with your email
                    </button>
                </div>

                <div className="pt-16 flex flex-col w-[40%]">
                    <p className="font-bold text-[1rem]">Already have an account?</p>
                    <button onClick={()=>{
                        set_state("login")
                    }} className="rounded-3xl border-2 border-gray-300 text-blue-400 py-1 font-bold bg-[rgb(5,5,5)] mx-1 my-4 duration-300 hover:bg-[rgb(10,10,10)] hover:scale-105">
                        Sign in 
                    </button>
                </div>
            </div>
        </div>

        {state==="register" &&
        <Register set_state={set_state}/>}

        {state=="login" &&
        <Login set_state={set_state} set_loggedin={set_loggedin}/>}

        </>
    )
}

export default UnregisteredHome;