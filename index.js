
const express=require("express");
const bcrypt= require("bcrypt");
const { connection } =require("./Config/db");
const { UserModel } = require("./Model/User.model");
var bodyParser = require('body-parser');
const jwt=require("jsonwebtoken");
const env=require("dotenv")
const cors = require("cors");
const { authenticationMiddleware } = require("./Middlewares/AuthMiddleware");
const { JobRouter } = require("./Routes/Jobs.route");
const app=express();
var jsonParser = bodyParser.json()
env.config();
const port = process.env.PORT || 8080

app.use(express.json())
app.use(cors({
    origin:"*"
}))

app.get("/",(req,res)=>{
   res.send({"WELOCME_MESSAGE":"Hello..! WELCOME TO MOCK 15 API"});
})

app.get("/users",async(req,res)=>{
    const users = await UserModel.find();
    res.send(users);
 })
 
 app.get("/signup",jsonParser,async(req,res)=>{
    res.send("Sorry..! You should make a post request on this route");
 })

 app.get("/login",jsonParser,async(req,res)=>{
    res.send("Sorry..! You should make a post request on this route");
 })

app.post("/signup",jsonParser,async(req,res)=>{
    console.log(req.body)
  let { email, password } = req.body;

  const isUserPresent = await UserModel.findOne({email});

  if(isUserPresent?.email){
            res.send("Please try to Login first, User Already Exist")
  }else{
    try {
        bcrypt.hash(password,3, async function(err,hash){
            const user= new UserModel({email,password:hash})
            await user.save()
            res.send("Congratulations, SignUp Successfull");
        })
    } catch (error) {
        console.log(error);
        res.send("Something went wrong, Please try again later");
    }
  }

})


app.post("/login",jsonParser,async(req,res)=>{
     const {email,password}=req.body;
     try {
        const isUserRegisrered = await UserModel.find({email})
     
        if(isUserRegisrered.length>0){
            const hashed_pass = isUserRegisrered[0].password;
            bcrypt.compare(password,hashed_pass,function(err,result){
                if(result){
                    const token=jwt.sign({"userID":isUserRegisrered[0]._id},process.env.KEY)
                    res.send({"message":"Log In Successfull","Token":token})
                }else{
                    res.send({err,"msg":"Log-In Failed. Please Enter Correct Password"})
                }
            })
        }else{
            res.send("Log-In Failed. Please Sign Up.")
        }
    } catch (error) {
         console.log(error);
        res.send("Something went wrong, Please try again later")
     }
})

app.use(authenticationMiddleware)

app.use("/jobs",JobRouter)


app.listen(port,async()=>{
    try {
        await connection;
        console.log("Connected to DataBase")
    } catch (error) {
        console.log(error);
    }
    console.log(`Listening to port ${port}`)
});