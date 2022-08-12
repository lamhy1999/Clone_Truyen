let express= require("express");
let app= express();
let path= require("path");
let router=require("./router/route.js");
let admin=require("./router/admin.js");
let clone=require("./router/clone.js");
let common= require("./src/common");
let port=3000;

app.set("views");
app.set("view engine","ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname,"public")));
app.use("/", router);
app.use("/admin", admin);
app.use("/clone", clone);
common.Db();
app.listen(port,()=>{
    console.log(`Listening port ${port}`);
})