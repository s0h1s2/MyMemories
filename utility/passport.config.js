var passport=require('passport');
var Strategy=require('passport-local').Strategy;
var database=require('../database');
var bcrypt=require('bcrypt');

passport.use(new Strategy(
    {
        usernameField:'email',
        passwordField:'password'
    },
    function(username,password,cb){
    database.query('SELECT * FROM users where email=? limit 1',username,function(err,user){
        if(err){
            return cb(err);
        }
        else if (user.length!=1) 
        {
            return cb(null,false);
        }else if(!bcrypt.compareSync(password,user[0].password))
        {
            return cb(null,false);
        }
        return cb(null,user[0]);

    });
}));
passport.serializeUser(function(user,cb){
    cb(null,user.id)
});
passport.deserializeUser(function(id,cb){
    database.query('SELECT * FROM users WHERE id=? LIMIT 1',id,function(err,results){
        if(err) return cb(err);
        return cb(null,results);
    });
});
module.exports=passport;
