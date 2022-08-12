const insert= async(info)=>{
    const mongoose = require("mongoose");
    const infomodel = require("../schema/infomanga");
    mongoose
  .connect("mongodb://localhost:27017/truyentop", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false,
  })
  .then((db) => {
    console.log("CONNECT DB SUCCESS....");
  })
  .catch((err) => {
    console.log("ERROR: ", err);
  });
    let newManga= new infomodel(info);
    let res= await newManga.save();
    console.log("INSERT MANGA SUCCESS" , res._id);
    }
module.exports = {
    insert
}