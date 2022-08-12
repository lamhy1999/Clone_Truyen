const {drive}= require('./config');
const fs = require("fs");
const list= async (mimeType,parentsID)=>{
  
    const FileList = [];
      let NextPageToken = "";
      do {
        const params = {
          
          pageToken: NextPageToken || "",
          pageSize: 100,
          q: `mimeType='${mimeType}'and '${parentsID}' in parents `,
          fields: 'nextPageToken, files(id, name)',
          orderBy:'name_natural'
        };
        const res = await drive.files.list(params);
        Array.prototype.push.apply(FileList, res.data.files);
        NextPageToken = res.data.nextPageToken;
      } while (NextPageToken);
    
      return FileList; 
}

const search= async (name)=>{
  
  const FileList = [];
  
      const params = {
        q: `name:'${name}'`,
        orderBy:'name_natural',
        fields: 'files(id, name)',
      };
      const res = await drive.files.list(params);
     // Array.prototype.push.apply(FileList, res.data);
  
      return res.data.files;
}

const create=async (title,parentsID,mimeType)=>{
  
  var file = {
      name: title,
      parents: [parentsID],
      mimeType:`${mimeType}`,
    };
   const res= await drive.files.create({
      resource: file,
      fields: 'id'
    });
    
    return res.data;
}

module.exports={
    list,
    create,
    search
}