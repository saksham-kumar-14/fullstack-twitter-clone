import React , { useState } from "react"
import { EyeIcon, EyeOffIcon, TrashIcon } from "@heroicons/react/solid"
import Head from "next/head"
import Axios from 'axios'

const Register=({ set_state })=>{
    const [name, set_name] = useState("");
    const [password, set_password] = useState("");
    const [email, set_email] = useState("");
    const [username, set_username] = useState("");
    const [password_type, set_password_type] = useState("password");

    async function getUsers(){
        const res = await fetch("http://localhost:3001/getUsers");
        const data = await res.json();
        return data.users
    }


    function register(){
        Axios.post("http://localhost:3001/createUser" , {
            name : name,
            email : email,
            password : password,
            username : username,
            dark_mode : false,
            posts : []
        }).then(()=>{
            alert("User Created")
            set_state("login")
        }).catch(()=>{
            alert("Error occured")
        })
    }

    const email_exists= async ()=>{
        const all_users = await getUsers();

        let result = false;
        await all_users.map((e)=>{
            if(e.email===email){
                result = true
            }
        })

        console.log("emailResult : ",result)
        return result;
    }

    const username_exists= async ()=>{
        const all_users = await getUsers();

        let result = false;
        await all_users.map((e)=>{
            if(e.username===username){
                result = true
            }
        })

        console.log("usernameResult", result)
        return result;
    }

    return(
        <div className="absolute w-[100vw] h-[100vh] top-0 bg-gray-700 opacity-90 flex justify-center items-center">
            <Head>
                <title>Twitter | Register</title>
            </Head>
            
            <div className=" text-white flex flex-col w-[30rem] bg-black py-8 px-6 rounded-3xl">
                <div className="grid grid-cols-2">
                    <div className="flex justify-start">
                        <TrashIcon onClick={()=>{
                            set_state("")
                        }} className="cursor-pointer w-[15%]"/>
                    </div>
                    <div className="flex justify-start">
                        <img className="cursor-pointer" src="logo.png" onClick={()=>{
                            set_state("")
                        }}></img>
                    </div> 
                </div>
                
                <h3 className="font-bold text-[1.5rem] mt-4">Create your account</h3>
                <input onChange={(e)=>{
                    set_name(e.target.value)
                }} className="focus:border-2 focus:border-blue-500 bg-black px-2 py-3 mx-2 my-4 text-white border-2 rounded-xl outline-none" placeholder="Name"></input>
                <input onChange={(e)=>{
                    set_email(e.target.value)
                }} className="focus:border-2 focus:border-blue-500 bg-black px-2 py-3 mx-2 my-4 text-white border-2 rounded-xl outline-none" placeholder="email"></input>
                <input onChange={(e)=>{
                    set_username(e.target.value)
                }} className="focus:border-2 focus:border-blue-500 bg-black px-2 py-3 mx-2 my-4 text-white border-2 rounded-xl outline-none" placeholder="username"></input>
                
                <div className="flex">
                    <input onChange={(e)=>{
                        set_password(e.target.value)
                    }} type={password_type} className="w-[85%] focus:border-2 focus:border-blue-500 bg-black px-2 py-3 mx-2 my-4 text-white border-2 rounded-xl outline-none" placeholder="password"></input>
                    {password_type==="password"?
                    <button onClick={()=>{
                        set_password_type("text")
                    }} className="flex items-center justify-center w-[15%]">
                        <EyeIcon className="w-[1.5rem]"/>
                    </button>:
                    <button onClick={()=>{
                        set_password_type("password")
                    }} className="flex items-center justify-center w-[15%]">
                        <EyeOffIcon className="w-[1.5rem]"/>
                    </button>}
                </div>
                
                <button onClick={async()=>{
                    if(await email_exists()){
                        alert("This email already exists")
                    }else{
                        if(await username_exists()){
                            alert("This username already exists")
                        }else{
                            register()
                        }
                    }
                
                }} className="bg-white mt-4 text-black rounded-3xl font-bold px-2 py-2 duration-300 hover:bg-gray-200">
                    Register
                </button>
            </div>
        </div>
    )
}

export default Register;
