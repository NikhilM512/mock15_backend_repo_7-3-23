
const mongoose=require("mongoose");
const env=require("dotenv")
mongoose.set("strictQuery", false);
env.config()

const connection = mongoose.connect(process.env.mongoURL);

module.exports = {connection}