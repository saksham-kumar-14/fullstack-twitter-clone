const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");

const user_model = require("./models/users");
const post_model = require("./models/posts")
const { create_tokens } = require("./JWT.js")

mongoose.connect("mongodb+srv://saksham:saksham@cluster0.bhore.mongodb.net/twitter-clone?retryWrites=true&w=majority")

app.use(cors());
app.use(express.json());


app.get("/getUsers" , (req,res)=>{
    user_model.find({} , (err,result)=>{
        if(err){
            res.json({ status:404 , error:err })
        }else{
            res.json({ status:"ok" , users:result })
        }
    })
})

app.post("/createUser" , async (req,res)=>{
    const temp_user = req.body;
    const user = new user_model(temp_user);
    await user.save();

    res.json({ status : "ok" })
})


app.post("/login" , async(req,res)=>{
    const user = await user_model.findOne(
        {email:req.body.email,
        password:req.body.password},
    )

    if(user){
        const token = create_tokens(user);
        res.json({ status:"ok" , user:token })
    }else{
        res.json({ status:404 , user:false })
    }
})

app.get("/getPosts" , (req,res)=>{
    post_model.find({}, (err,result)=>{
        if(err){
            res.json({ status:404 , error:err })
        }else{
            res.json({ status:"ok" , posts:result })
        }
    })
})

app.post("/updateUser" , async(req,res)=>{
    await post_model.findOneAndUpdate(
        {username:req.body.username},
        {dark_mode:req.body.dark_mode}
    )

    res.json({ status : "ok" })
})

app.post("/createPost" , async(req,res)=>{
    const temp_post = req.body;
    const post = new post_model(temp_post);
    await post.save();

    res.json({ status:"ok" })
})

app.post("/updatePost" , async(req,res)=>{
    await post_model.findOneAndUpdate(
        {
            username : req.body.username,
            time : req.body.time,
            text : req.body.text
        },{
            likes : req.body.likes,
            people_liked : req.body.people_liked,
            comments : req.body.comments
        }
    )

    res.json({status:"ok"})
})

app.post("/deletePost" , async(req,res)=>{
    await post_model.deleteOne({
        username : req.body.username,
        time : req.body.time,
        text : req.body.text
    })

    res.json({ status:"ok" })
})

app.post("/deleteUser" , async(req,res)=>{
    await user_model.deleteOne({
        email : req.body.email
    })

    res.json({ status : "ok" })
})

app.get("/api/login" , async(req,res)=>{
    const token = req.headers["user-token"];
    
    try{
        const decoded = verify_tokens(token);
        const email = decoded.email;
        const password = decoded.password
        const user = await user_model.findOne({ email : email , password : password });

        if(user){
            return res.json({ status:"ok" , userExists:true })
        }else{
            return res.json({ status : 404 , userExists:false })
        }
    }catch{
        return res.json({ status : 404 , userExists:false })
    }
})

app.listen(3001 , ()=>{
    console.log("The server is running at http://localhost:3001")
})
