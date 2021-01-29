const mysql=require('mysql');
module.exports=mysql.createConnection({
    host:'localhost',
    user:'mrprogrammez',
    password:'toor',
    database:'mydairy',
    dateStrings:true
});
