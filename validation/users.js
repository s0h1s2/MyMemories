const Joi=require('joi');

const schema=Joi.object({
    username:Joi.string().alphanum().min(3).max(50).required(),
    password:Joi.string().alphanum().min(5).required(),
    confirm_password:Joi.ref('password'),
    birthday:Joi.date().required(),
    email:Joi.string().email(),
    avatar:Joi.string().optional()
});
module.exports=schema;
