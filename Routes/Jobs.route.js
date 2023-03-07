const express=require("express");
const { JobsModel } = require("../Model/Jobs.model");

const JobRouter=express.Router();

JobRouter.get("/",async(req,res)=>{
    let totalJobs = await JobsModel.find();
    let totalLength=totalJobs.length;
    let page = +(req.query.page) || 1;
    let skip = (page - 1) * 4;
    console.log(req.query.key,totalLength)
    if(req.query){
      if(req.query.name){
        let filter_query=req.query.name;
      let jobs = await JobsModel.find({name:filter_query}).skip(skip).limit(4);
      res.send({data:jobs,total:totalLength});
      }
      else if(req.query.location){
        let filter_query=req.query.location;
        let jobs = await JobsModel.find({location:filter_query}).skip(skip).limit(4);
        res.send({data:jobs,total:totalLength});
      }else if(req.query.contract){
        let filter_query=req.query.contract;
        let jobs = await JobsModel.find({contract:filter_query}).skip(skip).limit(4);
        res.send({data:jobs,total:totalLength});
      }
  }else{
    let jobs = await JobsModel.find().skip(skip).limit(4);
    res.send({data:jobs,total:totalLength});
  }
});


JobRouter.post("/post",async(req,res)=>{
  let job = await new JobsModel(req.body);
  await job.save();
  res.send({"msg":"Hurray...Posted Sucessfully!"});
});

module.exports={JobRouter}