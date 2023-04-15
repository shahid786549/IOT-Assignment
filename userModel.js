const mongoose=require('mongoose');
const validator=require('validator');
const bcrypt=require('bcryptjs');

const userSchema=new mongoose.Schema({
    name:{
        type: String,
        required:[true,'Plese tell us your name!']
    },
    email:{
       type:String,
       required:[true,'Plese provide Your Email'],
       unique:true,
       lowercase:true,
       validate:[validator.isEmail, 'Plese provide valid email!']
    },
    

    password:{
        type:String,
        required:[true,'Plese provide a password!'],
        minlength:8,
        select:false
    },
   
    passwordChangedAt: Date
});
// Incripthing password in database
userSchema.pre('save', async function(next){
if(!this.isModified('password')) return next();

this.password=await bcrypt.hash(this.password,12);

this.passwordConfirm=undefined;
next();
});

userSchema.methods.correctPassword=async function(
    candidatePassword,
    userPassword){
    return await bcrypt.compare(candidatePassword,userPassword);
}

userSchema.methods.changedPasswordAfter=function(JWTTimestamp) {
if(this.passwordChangedAt){
    const changedTimestamp= parseInt(this.passwordChangedAt.getTime()/1000,
    10
    );
    console.log(this.passwordChangedAt,JWTTimestamp);
}

return false;
};   

const User=mongoose.model('User',userSchema);
module.exports=User;