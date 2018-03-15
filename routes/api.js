var express = require('express');
var router = express.Router();


//มิดเดิ้ลแว อยุ่ข้างบนเสมอ ก่อน get ไว้ทำ log  // เฉพาะ ที่ accessเข้าไฟล์นี้  ดูจากต้นทาง app.ut(/???,....);
// middleware to use for all requests
router.use(function (req, res, next) {
    // do logging
  
    next(); // make sure we go to the next routes and don't stop here
});




router.route('/test')
.get(function (req, res) {

    console.log("test")
});


module.exports = router;