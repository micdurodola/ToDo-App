const router = require('express').Router();
let User = require('../models/user.models');

router.route('/').get((req,res)=>{
    User.find()
        .then((Users)=>res.json(Users))
        .catch((err)=>res.status(400).json('Error:'+ err));
});

router.route('/register').post((req,res)=>{
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const newUser = new User({
        name,
        email,
        password
    });
    newUser.save()
        .then(()=>res.json('New User Added'))
        .catch(err=>res.status(400).json('Error:' + err));


});

router.route('/:id').get((req,res)=>{
    User.findById(req.params.id)
        .then((user)=>res.json(user))
        .catch((err)=>res.status(400).json('Error:'+ err));
});

module.exports = router;