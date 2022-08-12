let cheerio= require("cheerio");
let axios= require("axios");
let common = require("./src/common.js");
const fs = require("fs");
let url="http://truyenqqtop.com";
const { removeVI } = require("jsrmvi");
const getLinkmanga= async (linkManga)=>{
  //var linkManga="http://truyenqqtop.com/truyen-tranh/tokimeki-no-ikenie-8848";
    //console.log(`=====BẮT ĐẦU LẤY LINK TỪ ${url}=====`);
    let home=  await common.httpGet(url);
    let buf= home.toString("utf-8");
    let $= cheerio.load(buf);
   // let getlink= $(".story-item");
    //for( i= 3;i<4;i++){
       // let linkManga= $(getlink[i]).find("a").attr("href");
       // console.log(`=====TRUYỆN ${i+1}=====`);
       //-- await getInfo(linkManga);
       //-- await common.sleep(3);
         await getChapter(linkManga)
         
    //}
    //console.log(`Tổng link Truyện ${i} Truyện`);
}

const getInfo= async (linkManga)=>{

    console.log(`=====ĐANG LẤY THÔNG TIN TRUYỆN ${linkManga}=====`);
  
   let home= await common.httpGet(linkManga);
   let buf= home.toString("utf-8");
   let $=cheerio.load(buf);
   let hinh=$(".left img").attr("src");
    let mangaThumb= await common.cloneImage(hinh);
   let ten= $(".block01 h1").text();
   let slug= removeVI(ten);
   let tenkhac=buf.match(/<span class="info-item">Tên Khác.+?<\/span>/gm);
   if(tenkhac==null){
       tenkhac=`Tên Khác: ${ten}`;
   }else{
       tenkhac= tenkhac[0].split(">")[1].split("<")[0];
   }
   let tacgia=`Tác giả: ${$(".txt p a").text()}`;
   let tinhtrang=buf.match(/<p class="info-item">Tình trạng.+?<\/p>/gm)[0].split(">")[1].split("<")[0];
   let t=$(".list01 li a"); 
   let loai=[];
   for(let i=0;i<t.length;i++){
       let tl=$(t[i]).text();
      loai.push(tl);
   }
   console.log(loai);
   let theloai=loai;
   
   let thongke=$(".sp01").text().split(" ");

   let likes=thongke[1];
   let tym=thongke[2];
   let views=thongke[3];
   let m=$(".txt");
   let gt=[];
   for(let i=0;i<m.length;i++){
       let mt=$(m[i]).text();
       gt.push(mt);
   }
   let mo=gt[1].split(".");
   let g=[];

   for(let i=0;i<mo.length;i++){
   let ta=mo[i].replace("TruyenQQ","TruyenTranh");
       g.push(ta);
   }
    var date = new Date();
    var month= date.getMonth()+1; 
   let updatedAt=date.getDate() + '/'+month+'/'+date.getFullYear();
   let mota= g.join(".");
   let info= {
    theloai,
    tacgia,
    tinhtrang,
    ten,
    slug,
    tenkhac,
    views,
    likes,
    tym,
    updatedAt,
    mota,
    mangaThumb//hinh
   }
   //console.log(info);
    await common.InsertInfo(info);
}
const Drive= require('./ggdrive/ggDrive_API');

const getChapter = async (link) => {
  
    const directory="./images";
     
    let buf = await common.httpGet(link);
    let content = buf.toString("utf-8");
    const $ = cheerio.load(content);
    let chapterList = $(".works-chapter-list a");
    let originalTitle ;
    let titleChapter;
    let dirImg;
    if (chapterList.length > 0) {
      originalTitle = $('h1[itemprop="name"]').text();
      titleChapter = removeVI(originalTitle);
       dirImg = `${directory}/${titleChapter}`;
     
     Drive.list('application/vnd.google-apps.folder','1mnyj2LJOca7aLQaluz66jzfbCeWC9AZE')
       .then(result=>{
        var a=[];
        result.find((user)=>{
           a.push(user.name);
         })
         //if(!a.includes(titleChapter)){

            if (!fs.existsSync(dirImg)) {
                  fs.mkdir(dirImg, { recursive: true }, (err) => {
                      console.log("Directory is created.");
                  });
              }

              Drive.create(titleChapter,'1mnyj2LJOca7aLQaluz66jzfbCeWC9AZE','application/vnd.google-apps.folder')
                .then(async fileID=> {
                
                  console.log(fileID.id)

                    for (let i = 0; i < chapterList.length; i++) {
                      await getImageChapter(
                        $(chapterList[i]).attr("href"),
                        titleChapter,
                        directory,
                        fileID.id,
                        originalTitle
                      );
                      await common.sleep(3);
                    }
                  
                });

          // }else{
          //   console.log(`${titleChapter} Đã tồn tại trong GOOGLE DRIVE !`)
          // }

         })
  
     } 
   
  };

  const getImageChapter = async (link, parent, directory,id,originalTitle) => {
    let buf = await common.httpGet(link);
    let content = buf.toString("utf-8");
    const $ = cheerio.load(content);
  
    let tit = $(".detail-title").text();
    
    var title = removeVI(tit);
   
    let folderChapter = title;

    if (parent) {
      folderChapter = parent + "/" + title;
    }
    
    let dirImg = `${directory}/${folderChapter}`;
    if (!fs.existsSync(dirImg)) {
      fs.mkdirSync(dirImg);
    }
    let listImg = $(".story-see-content .lazy");
    var img=listImg.length-1;
    
    
    Drive.create(title,id,'application/vnd.google-apps.folder')
    .then(async fileID=> {
                
      let localImage='';
      for (let i = 0; i < listImg.length; i++) {
        let urlImg = $(listImg[i]).attr("src");
        let splitNameImg = urlImg.split("?")[0].split("/");
        let imgName = splitNameImg[splitNameImg.length - 1];
        if (!urlImg.includes("http")) {
          urlImg = "http:" + urlImg;
        }
      
     
         localImage = `${directory}/${folderChapter}/${imgName}`;
        try {
            await downloadImage(urlImg, localImage);
            await gg(fileID.id,imgName,localImage);
        } catch (error) {
         await downloadImage(urlImg, localImage);
          console.log(error.message);
        }
        
     };
     
    // console.log(`------------Tải lên Drive Thành công '${fileID.name}'--------------------`);
    //   setTimeout(async ()=>{ 
    //     await list(fileID.id,tit,originalTitle,localImage);
    //      await check();
    //   }, 8000);

    
    });
       let numberImg={
      title,
      img,
    }
    // setTimeout(async ()=>{ 
    //  await check(numberImg,tit,originalTitle);
    //     }, 3000);
};

const check= async(number,tit,originalTitle)=>{
  await  Drive.search(number.title)
    .then(result=>{
     result.find(async (user)=>{
      var interval = setInterval(async()=>{
        await common.sleep(3);
       await Drive.list('image/jpeg',user.id)
        .then(async res=>{
          
            if(user.name==number.title && res.length-1==number.img){
              
              var LinkImg=[];
              res.find((file)=>{
                  LinkImg.push(`https://drive.google.com/uc?id=${file.id}`);
              })
              await list(LinkImg,tit,originalTitle)
              clearInterval(interval);
              //await unlink();
              }
              else{
               
              }
        })
      },3000);
    })
  
  })
  }
  const downloadImage = async (url, fileName) => {
    
    const writer = fs.createWriteStream(fileName);
    const response = await axios({
      url,
      method: "GET",
      responseType: "stream",
      headers: {
        Referer: "http://truyenqqtop.com/",
      },
      timeout: 1200 * 1000,
    });
    response.data.pipe(writer);
    
    return new Promise((resolve, reject) => {
      writer.on("finish", resolve);
      writer.on("error", reject);
    });
    
  };

  const gg=  async(dataid,imgName,fileName)=>{
    var name=imgName.split(".")[0];
    
    Drive.upLoad(name,dataid,'image/jpeg',fileName)
    
  }
    
  const list=async (LinkImg,folderChapter,Title)=>{
 
      

      var na=folderChapter.split(" ");
      var tenChapter=`Chap ${na[na.length-1]}`;
      var slug= removeVI(tenChapter);
      var slugManga = removeVI(Title);
      var date = new Date();
      var month= date.getMonth()+1; 
      var updatedAt= date.getHours()+':'+ date.getMinutes()+' '+ date.getDate()+'/'+ month+'/' +date.getFullYear();
      var chap={
        Title,
        tenChapter,
        slug,
        slugManga,
        LinkImg,
        updatedAt
      };
      await common.InsertChapter(chap);
     console.log(chap);
     console.log(LinkImg.length-1);
  
      
  
  }
  const unlink= ()=>{
    console.log("xóa");
    const dir = 'images';
    fs.readdir(dir, (err, files) => {
      //console.log(files.length);
      files.map(fi=>{
       fs.rmdirSync(dir+"/"+fi, { recursive: true });
      })
      
    });
  }

//getChapter();
module.exports={
    getLinkmanga,
    unlink
   // getChapter,
    // getimg
}