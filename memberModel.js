const mongoose=require('mongoose');
//const slugify=require('slugify');
const validator=require('validator');

const memberSchema=new mongoose.Schema({
    community:{
        type: Number,
        required:[true,'Plese tell us your id!']
    },
    user:{
        type: Number,
        required:[true,'Plese tell us your id!']
    },
    role:{
        type:Number,
        required:[true,'Plese tell us your id!']
    }
    
});
const Member=mongoose.model('Member',memberSchema);

module.exports=Member;