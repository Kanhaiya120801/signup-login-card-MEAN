let express = require("express");
let router = express.Router();
let path = require('path');

const UserRouter = require('./User/UserRouter');


router.use('/', UserRouter);


module.exports = router;