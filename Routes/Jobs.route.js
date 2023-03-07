const express=require("express");
const { JobsModel } = require("../Model/Jobs.model");

const JobRouter=express.Router();

JobRouter.get("/",async(req,res)=>{
    try {
        let totalJobs = await JobsModel.find();
    let totalLength=totalJobs.length;
    let page = +(req.query.page) || 1;
    let skip = (page - 1) * 4;
    console.log(req.query.key,totalLength)
        // if(req.query){
        if(req.query.name){
            let filter_query=req.query.name;
        let jobs = await JobsModel.find({name:filter_query}).skip(skip).limit(4);
        let totalLength=jobs.length;
        res.send({data:jobs,total:totalLength});
        }
        else if(req.query.location){
            let filter_query=req.query.location;
            let jobs = await JobsModel.find({location:filter_query}).skip(skip).limit(4);
            let totalLength=jobs.length;
            res.send({data:jobs,total:totalLength});
        }else if(req.query.contract){
        let filter_query=req.query.contract;
        let jobs = await JobsModel.find({contract:filter_query}).skip(skip).limit(4);
        let totalLength=jobs.length;
        res.send({data:jobs,total:totalLength});
        }
        // }
        else{
            let jobs = await JobsModel.find().skip(skip).limit(4);
            res.send({data:jobs,total:totalLength});
        }
    } catch (error) {
        console.log(error);
        res.send({"err" : "Something went wrong"})
    }
    
});

JobRouter.patch("/update/:jobID", async (req, res) => {
    try {
        const jobID = req.params.jobID
        const userID = req.body.userID;
        let payload=req.body
        const job = await JobsModel.findOne({_id:jobID})
    // if(userID !== job.userID){
    //     res.send({"msg" : "Sorry, Not Authorised..!"})
    // }
    // else{
        await JobsModel.findByIdAndUpdate({_id : jobID},payload)
        res.send({"msg" : " Job updated successfully"})
    // }
    } catch (error) {
        console.log(error);
        res.send({"err" : "Something went wrong"})
    }
    
});

JobRouter.delete("/delete/:jobID", async (req, res) => {
    try {
    const jobID = req.params.jobID
    const userID = req.body.userID
    const job = await JobsModel.findOne({_id:jobID})
    console.log(job)
    // if(userID !== job.userID){
    //     res.send({"msg" : "Sorry, Not Authorised..!"})
    // }
    // else{
        await JobsModel.findByIdAndDelete({_id : bugsID})
        res.send({"msg" : "Job deleted successfully"})
    // }
} catch (error) {
    console.log(error);
    res.send({"err" : "Something went wrong"})
}
})

JobRouter.post("/post",async(req,res)=>{
    console.log(req.body)
try{
  let job = await new JobsModel(req.body);
  await job.save();
  res.send({"msg":"Hurray...Posted Sucessfully!"});
}
catch(err){
    console.log(err)
    res.send({"err" : "Something went wrong"})
}
});

module.exports={JobRouter}