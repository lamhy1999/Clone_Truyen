const http = require("http");
const https = require("https");
let cheerio= require("cheerio");
var imgbbUploader = require("imgbb-uploader");
 const fetch = require("node-fetch");
 const fs = require("fs");
 const path = require("path");
 const axios = require("axios");

const InfoModel = require("./schema/infomanga");
const ChapterModel = require("./schema/chapter");
const Db = () => {
  const dbConfig = require("./config/db.json");
  const mongoose = require("mongoose");
  //CONNECT DB
  mongoose
    .connect(dbConfig.DB_CONNECTION_DEV, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useFindAndModify: false,
    })
    .then(() => {
      console.log("CONNECT DB SUCCESS....");
    })
    .catch((err) => {
      console.log("ERROR: ", err);
    });
};

const httpGet = async (url) => {
    return new Promise((resolve, reject) => {
  
      let client = http;
  
      if (url.toString().indexOf("https") === 0) {
        client = https;
      }
  
      client
        .get(url, (resp) => {
          let chunks = [];
  
          // A chunk of data has been recieved.
          resp.on("data", (chunk) => {
            chunks.push(chunk);
          });
  
          // The whole response has been received. Print out the result.
          resp.on("end", () => {
            resolve(Buffer.concat(chunks));
          });
        })
        .on("error", (err) => {
          reject(err);
        });
    });
  };

  function sleep(s) {
    return new Promise((resolve) => {
      setTimeout(resolve, s*1000);
    });
  }   


 const cloneImage = async (urlImage) => {
  const API_IMG_BB = "357d646f56b5bc53597262a6ae48172d";
  
  let splitNameImg = null;
  if (urlImage.includes("?")) {
    splitNameImg = urlImage.split("?")[0].split("/");
  } else {
    splitNameImg = urlImage.split("/");
  }
  let imgName = splitNameImg[splitNameImg.length - 1];
  let localImage = `/images/${imgName}`;
  const imgTmp = path.join(__dirname, localImage);
  console.log(urlImage);
  try {
    await downloadImage(urlImage, imgTmp);
    // fs.writeFileSync(imgTmp, buffer);
  } catch (error) {
    console.error(error.message);
    return {
      full: "/img/placeholder-medium.png",
      thumb: "/img/placeholder.png",
      medium: "/img/placeholder-medium.png",
    };
  }

  try {
    let imgUpload = await imgbbUploader(API_IMG_BB, imgTmp);
    fs.unlinkSync(imgTmp);
    const { image, thumb, medium } = imgUpload;
    let thumbUrl = thumb ? thumb.url : image.url;
    let mediumUrl = medium ? medium.url : image.url;
    return {
      full: image.url,
      thumb: thumbUrl,
      medium: mediumUrl,
    };
  } catch (error) {
    console.log("Error UPLOAD: ", error.message);
    return {
      full: "/img/placeholder-medium.png",
      thumb: "/img/placeholder.png",
      medium: "/img/placeholder-medium.png",
    };
  }
};
const downloadImage = async (url, fileName) => {
  
    const writer = fs.createWriteStream(fileName);
    const response = await axios({
      url,
      method: "GET",
      responseType: "stream",
      headers: {
        Referer: "http://truyenqq.net/",
      },
      timeout: 1200 * 1000,
    });
    response.data.pipe(writer);
    
    return new Promise((resolve, reject) => {
      writer.on("finish", resolve);
      writer.on("error", reject);
    });
    
};

const InsertInfo= async(info)=>{
     Db();
    let newInfo= new InfoModel(info);
    let res= await newInfo.save();
    console.log("==INSERT INFO MANGA SUCCESS==" , res._id);
}

const InsertChapter= async(info)=>{
      Db();
     let newChapter= new ChapterModel(info);
     let re= await newChapter.save();
     console.log("==INSERT CHAPTER MANGA SUCCESS==" , re._id);
     }
module.exports={
    httpGet,
    sleep,
    cloneImage,
    downloadImage,
    InsertInfo,
    InsertChapter,
    Db
}