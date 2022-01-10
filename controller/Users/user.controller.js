var fs = require('fs');
var path = require('path');

const User = require('../../models/user');
const Authenticate = require('../../middleware/authentication');


//Signup
exports.Signup = (req, res) => {
    console.log("req body",req.body)
    console.log("req file",req.file)
    const file = req.file
    var data = {
        username: req.body.username,
        password: req.body.password,
        fullname: req.body.fullname,
        email: req.body.email,
    }
    finalObject = {};
    if (req.file) {
        finalObject = {
            ...data, aadhar: {
                data: fs.readFileSync(path.join(__dirname + '../../../public/images/' + req.file.filename)),
                contentType: 'image/png' || 'image/jpeg' || 'image/jpg'
            }
        }
    } else {
        finalObject = { ...data }
    }
    User.create(finalObject)
        .then((user) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json({ user: user, status: 200 });
        }, (err) => {
            res.json({ error: err.message });
        })
        .catch((err) => {
            res.json(err.message);
        });

};


//Login
exports.Login = (req, res) => {
    User.findOne({ username: req.body.username })
        .then((user) => {
            console.log("user0,user",user)
            const token = Authenticate.getToken({ _id: user._id });
            if (user.password === req.body.password) {
                res.json({ user: user, status: 200, token: token });
                return;
            }
            else {
                // res.status = 400;
                res.json({ message: 'Your credential does not match..!',status : 400 });
            }
        }).catch((err) => {
            console.log("error in login",err)
            // res.statusCode = 400;
            res.json({ message: 'Your credential does not match..!',err })
        });
};

//Profile
exports.Profile = (req, res) => {
    const id = req.body.userID
    User.find({ _id: id })
        .then((profile) => {
            res.json({ profile: profile });
        }).catch((err) => {
            res.json({ message: 'Could not fetch the data!!' })
        });
};

exports.UserOtherThanViewingList = (req,res) => {
    console.log("hagsfdghshbdj",req.body.userID)
    const userID = req.body.userID;
    User.find({ _id: { $ne: userID } })
    .then((users) => {
        res.json({ users: users,status:200 });
    }).catch((err) => {
        res.json({ message: 'Could not fetch the users!!' })
    });

}

exports.DeleteUser = (req,res)=> {
    console.log("user id",req.body.userID)
    User.findByIdAndDelete({_id:req.body.userID})
    .then((user) => {
        res.json({ user: user,status:200 });
    }).catch((err) => {
        res.json({ message: 'Could not fetch the users!!' })
    });
}

exports.UpdateProfile = (req, res) => {
    console.log("req body",req.body)
    console.log("req file",req.file)
    var data = {
        username: req.body.username,
        password: req.body.password,
        fullname: req.body.fullname,
        email: req.body.email,
    }
    finalObject = {};
    if (req.file) {
        finalObject = {
            ...data, aadhar: {
                data: fs.readFileSync(path.join(__dirname + '../../../public/images/' + req.file.filename)),
                contentType: 'image/png' || 'image/jpeg' || 'image/jpg'
            }
        }
    } else {
        finalObject = { ...data }
    }
    User.findByIdAndUpdate({_id:req.body.userID},finalObject)
        .then((user) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json({ user: user, status: 200 });
        }, (err) => {
            res.json({ error: err.message });
        })
        .catch((err) => {
            res.json(err.message);
        });

};
