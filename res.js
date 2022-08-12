// const { httpGet, sleep } = require("./src/common");
// const fs = require("fs");
// const path = require("path");
// const { google } = require('googleapis');
// const { SSL_OP_ALLOW_UNSAFE_LEGACY_RENEGOTIATION } = require("constants");
// const { maxHeaderSize } = require("http");
// const CLIENT_ID = '976247298318-klrij7583k3josmpnkafk6v39e8mtj1j.apps.googleusercontent.com';
// const CLIENT_SECRET = 'DGyGCYqaB0FG6zhwe0HinCDc';
// const REDIRECT_URI = 'https://developers.google.com/oauthplayground';
// const { auth } = require("google-auth-library");
// const REFRESH_TOKEN = '1//04DvLtzVSdwSECgYIARAAGAQSNwF-L9Irrf6IgbEotmWBY67dLltr4NFaXMF-NyXYIMvIutX8Rw5dbdAVb3qke-VIGI9-Q-qt2c8';
// let axios= require("axios");
// const oauth2Client = new google.auth.OAuth2(
//   CLIENT_ID,
//   CLIENT_SECRET,
//   REDIRECT_URI
// );

// oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });
// const drive = google.drive({
//   version: 'v3',
//   auth: oauth2Client,
// });
// async function main(drive) {
//   const te=async ()=>{
//     const fileList = [];
//   let NextPageToken = "";
//   do {
//     const params = {
      
//       pageToken: NextPageToken || "",
//       pageSize: 100,
//       q: "mimeType='application/vnd.google-apps.folder'",
//       fields: 'nextPageToken, files(id, name)',
//     };
//     const res = await drive.files.list(params);
//     Array.prototype.push.apply(fileList, res.data.files);
//     NextPageToken = res.data.nextPageToken;
//   } while (NextPageToken);

//   console.log(fileList);  // You can see the number of files here.

//   }
// te();
  


// main(drive);

  
//do{
//  const test=()=>{
//   drive.files.list({
//     pageSize: 100,
//     q: "mimeType='application/vnd.google-apps.folder'",
//     fields: 'nextPageToken, files(id, name)',
//   },(err, res) => {
//     let NextPageToken = "";
//      NextPageToken = res.data.nextPageToken;
//      let array=[];
//      Array.prototype.push.apply(array,res.data.files)
//     te(NextPageToken,array);
//   })
//  }


//   const te=(NextPageToken,array)=>{
//     drive.files.list({
//       pageSize: 100,
//       q: "mimeType='application/vnd.google-apps.folder'",
//       fields: 'nextPageToken, files(id, name)',
//       'pageToken' : NextPageToken
//     },(err, res) => {
//       Array.prototype.push.apply(array,res.data.files)
//       if(res.data.nextPageToken){
//         te(res.data.nextPageToken,array);
//       }
//       else
//       console.log(array)
       
//     })
//   }
//   test();
// }while(NextPageToken!='');



// drive.files.list({
//   q: `mimeType='image/jpeg'and '1WUACymvJqK87QMw2c3u1byjDYr7T_mih' in parents `,
//   fields: 'nextPageToken, files(id, name)',
//   orderBy:'name_natural'
// },async (err, res) => {
//   const files = res.data.files;
//   var a=[];

//     console.log('Files:');
//     // files.map((file) => {
//     //   a.push(file.name);
//     // });
//     console.log(res.data)
// })
// drive.files.list({
//   q: "mimeType='application/vnd.google-apps.folder'",
//   fields: 'nextPageToken, files(id, name)',
// },(err, res) => {
//   if (err) return console.log('The API returned an error: ' + err);
//   const files = res.data.files;
//   var a=[];

//     console.log('Files:');
//     files.map((file) => {
//       console.log(file.name);
//     });
//   })
//  const Drive= require('./ggdrive/ggDrive_API');
// // te.create('i','1mnyj2LJOca7aLQaluz66jzfbCeWC9AZE','application/vnd.google-apps.folder')
// // .then(result=> {
 
// //   console.log(result)

// // })

// Drive.search('khi-bac-si-mo-hack')
// .then(result=> {
 
    
  
//   })

const cheerio = require('cheerio'); // khai báo module cheerio
//let axios= require("axios");
//const request = require('request-promise'); // khai báo module request-promise
const url='http://truyenqqvip.com/truyen-tranh/dai-vuong-tha-mang-8635';
const fs = require("fs");
const axios = require('axios'); 
 var fileName='./images/1.jpg';

const https = require("https");
const rp = require("request-promise-native");
var tr = require('tor-request');
tr.request({
  uri: "http://truyenqqvip.com/truyen-tranh/dai-vuong-tha-mang-8635",
  method: "GET",
  responseType: "text/html",
  headers: {
    
    Referer: "http://truyenqqvip.com/"
  },
  timeout: 1200 * 1000,
}, function (err, res, body) {
  if (!err && res.statusCode == 200) {
    console.log("Your public (through Tor) IP is: " + body);
  }
  else{
    console.log('i9ii')
  }
});

// const downloadImage = async (url, fileName) => {
    
//     const writer = fs.createWriteStream(fileName);
//     const response = await axios({
//       url,
//       method: "GET",
//       responseType: "stream",
      
//       headers: {
//         Referer: "http://truyenqqvip.com/",
        
//       },
//       timeout: 1200 * 1000,
//     });
//     response.data.pipe(writer);
   
//      return new Promise((resolve, reject) => {
//       writer.on("finish", resolve);
//       writer.on("error", reject);
//       console.log(writer);
//      });
    
//   };
//   downloadImage(url,fileName)
