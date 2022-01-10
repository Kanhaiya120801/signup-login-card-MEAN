let express = require("express");
let router = express.Router();
var multer = require('multer');
const UserController = require('../../controller/Users/user.controller');
const Authentication = require('../../middleware/authentication');

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
  });
  
  var upload = multer({ storage: storage });    

//Signup
router.post('/signup',upload.single('aadhar'),
    UserController.Signup
);

//Login
router.post('/login', UserController.Login);

router.post('/profile',Authentication.verifyJWT, UserController.Profile);

router.post('/update-profile',upload.single('aadhar'), UserController.UpdateProfile);







module.exports = router;
