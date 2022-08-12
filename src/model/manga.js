const Movies = require("../schema/infomanga");
const SerieModel= require("../schema/chapter");
const getTopMovie = async (top) => {
    return await Movies.find({ group: null })
      .sort([["createdAt", -1]])
      .limit(top);
  };
  const getTopListSerieMovie = async() => {
    return await SerieModel.find()
        .sort({ Chapter: -1 })
        .select(["tenChapter"])

};
const getdetail= async (slug)=>{
  return await Movies.find({slug:slug});
};
const getListChapter = async (slug) => {
  return await Movies.findOne({ slug: slug })
  
  .populate({
    path: "chapters"
  })
};
module.exports = {
getTopMovie,
getTopListSerieMovie,
getdetail,
getListChapter
}