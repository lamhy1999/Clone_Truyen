var express = require("express");
var router = express.Router();
const clone = require("../clone.js");
/* GET users listing. */
router.post("/", async (req, res, next) => {
  const { link } = req.body;
  try {
     await  clone.getLinkmanga(link);
      
    console.log('===CLONE DONE=====');
    res.json({ isDone: true });
  } catch (error) {
    res.status(404).json({ isDone: false });
  }



  
 
});

module.exports = router;
