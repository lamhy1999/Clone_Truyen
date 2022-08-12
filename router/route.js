var express = require("express");
var route = express.Router();
var chap= require("../src/schema/infomanga");
const dbConfig = require("../src/config/db.json");
const mongoose = require("mongoose");
var{Schema}= mongoose;
const MovieModel = require("../src/model/manga");
const SerieModel = require("../src/schema/chapter")
route.get("/", async(req, res, next) => {
    const topManga = MovieModel.getTopMovie(12);
   // let list = await SerieModel.find({ Chapter: req.params.Chapter }).select(["LinkImg"]);
    //  let Top = await chap.find()
    //  .populate({ path: "chapters", select: ["slug"] })
    //  .select(["tenChapter","slugChapter","slug"])
    //  .limit(12);
    //  console.log(Top);
  //  const menu = MovieSerieModel.getTopListSerieMovie();
    let [resTop] = await Promise.all([
        topManga,
    ]);
     console.log(topManga);
        // list.map((l) => {
            res.render("index",{
               TopManga: resTop
           // });

    });
});
route.get("/truyen-tranh/:slug",async (req,res)=>{
    let info= await MovieModel.getdetail(req.params.slug);
    let chapter= await MovieModel.getListChapter(req.params.slug);
    res.render("detail",{
        info,
        chap:chapter.chapters
    });
})
route.get("/truyen-tranh/:tenslug/:chapslug", async(req, res, next) => {
    let list = await SerieModel.find({ slugManga: req.params.tenslug ,slug:req.params.chapslug}).select(["LinkImg"])
    let Top = await SerieModel.find({ slugManga: req.params.tenslug ,slug: req.params.chapslug }).select(["tenChapter"])
    const menu = MovieModel.getListChapter(req.params.tenslug);
    let info= await SerieModel.find({ slugManga: req.params.tenslug ,slug:req.params.chapslug});
    let [resMenu] = await Promise.all([
        menu,
    ]);
        list.map((l) => {
            res.render("doctruyen", {
                seriaMovies: l.LinkImg,
                Info: info,
                chapter: resMenu.chapters,
                Top: Top
            });

    });
});

module.exports = route;