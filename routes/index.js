var express = require('express');
var router = express.Router();
var ensureLoggedIn=require('connect-ensure-login');
const database = require('../database');

/* GET home page. */
router.get('/',ensureLoggedIn.ensureLoggedIn({redirectTo:'/users/login'}), function(req, res, next) {
  
  const query='SELECT * FROM memories WHERE user_id=? ORDER BY id DESC';

  database.query(query,[req.user[0].id],function(err,results){
    return res.render('index', { title: 'M&S&Z | Home' ,user:req.user[0],memories:results});
  });

});
router.post('/memories',ensureLoggedIn.ensureLoggedIn({ redirectTo:'/users/login' }),function(req,res,next){
  const current=(new Date().toJSON().slice(0,10).replace(/-/g,'/'));
  console.log(current);

  const query='INSERT INTO memories(description,user_id,publish_date) values (?,?,?)';
  database.query(query,[req.body.memories,req.user[0].id,current],function(err,results,fields){
    return res.redirect('/');
  });
});
router.get('/myprofile',ensureLoggedIn.ensureLoggedIn({redirectTo:'/users/login'}),function(req,res,next){
  const query='SELECT * FROM memories WHERE user_id=? ORDER BY id DESC';
  database.query(query,[req.user[0].id],function(err,results){
    return res.render('myprofile',{ user:req.user[0],title:"M&S | My profile",memories:results });  
  });
});
router.post('/delete/:id',ensureLoggedIn.ensureLoggedIn({redirectTo:'/users/login'}),function(req,res,next){
  const query='DELETE FROM memories WHERE id=? AND user_id=?';
  database.query(query,[req.params.id,req.user[0].id],function(err,results){
    return res.redirect('/myprofile');
  });
  

});
module.exports = router;
