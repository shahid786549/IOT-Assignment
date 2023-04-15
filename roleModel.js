const mongoose=require('mongoose');
//const slugify=require('slugify');
const validator=require('validator');

const roleSchema=new mongoose.Schema({
    name:{
        type: String,
        required:[true,'A role must have name'],
        unique:true,
        trim:true,
        maxlength:[40,'A tour name must have less or equal to 40 characters'],
        minlength:[10,'A tour name must have more or equal to 10 characters']
       // validate:[validator.isAlpha, 'Tour name must only contain charcter'] 
    },
    roleCreatedAt: Date
    
});
const Role=mongoose.model('Role',roleSchema);

module.exports=Role;