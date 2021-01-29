const multer=require('multer');
const path=require('path');
const megabyte=1*1000*1000;
const root=path.resolve(__dirname);
console.log(root);

const storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,root+'/public/profiles/');
    },
    filename:function(req,file,cb){
        cb(null,Date.now()+path.extname(file.originalname));
    },
});
module.exports=multer({storage:storage,limits:{fileSize:megabyte}});
