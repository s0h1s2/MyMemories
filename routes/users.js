const express = require('express');
const router = express.Router();
const bcrypt=require('bcrypt');

const database=require('../database');
const upload=require('../fileupload');
const schema=require('../validation/users');
const passport=require('../utility/passport.config');

router.get('/signup', function(req, res, next) {
  res.render('signup',{'title':'M&S | Signup',message:req.flash('success')});
});

router.post('/signup', upload.single('avatar'),function(req, res, next) {
  const {error,value}=schema.validate(req.body);
  if(error){
    req.flash('error',error.details[0].message.replace('"','').replace('"',''));
   return res.redirect('/users/signup');
  }else{
    database.query('SELECT * FROM users WHERE email=?',req.body.email,function(err,results){
      if(results.length==1){
        req.flash('error','email already taken');
        return res.redirect('/users/signup');
      }else{
        const hashedPassword=bcrypt.hashSync(req.body.password,10);
        database.query('insert into users(username,password,avatar,birthday,email) values(?,?,?,?,?)',[req.body.username,hashedPassword,req.file.filename,req.body.date,req.body.email],function(err,results){
          req.flash('message','You are registerd successfully');
          return res.redirect('/users/login');
        });    
      }
    });    
  }
});
router.get('/login',function(req,res,next){
  return res.render('login',{ title:'M&S&Z | Login' });
});
router.post('/login',passport.authenticate('local',{ failureFlash:'Your email or password are wrong ',successRedirect:'/',failureRedirect:'/users/login' }),function(req,res,next){
  return res.redirect('/users/login');
});

module.exports = router;
