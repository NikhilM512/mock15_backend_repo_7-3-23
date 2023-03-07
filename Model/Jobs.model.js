

const mongoose=require("mongoose");

const jobsSchema = mongoose.Schema({
    name : String,
    position : String,
    contract : String,
    location : String,
});

const JobsModel = mongoose.model("jobs",jobsSchema)

module.exports={ JobsModel }