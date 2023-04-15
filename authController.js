const {promisify}=require('util');
const jwt=require('jsonwebtoken');
const User=require('./../models/userModel');
const catchAsync=require('./../utils/catchAsync');
const AppError=require('./../utils/appError');

const signToken = id =>{
  return jwt.sign({id}, process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRES_IN
    });
}

exports.signup= catchAsync(async(req,res,next)=>{
const newUser=await User.create({
    name:req.body.name,
    email:req.body.email,
    password:req.body.password,
    passwordConfirm:req.body.passwordConfirm
});

const token=signToken(newUser._id);

res.status(200).json({
    status:'success',
    token,
     data:{
       user:newUser
    }
});
});

exports.login=catchAsync(async(req,res,next)=>{
    const {email,password}=req.body;
    //1)check if email and paasword exist
    if(!email||!password){
    return  next(new AppError('please provide email and password!' , 400));
    };

//2)check if user exit and password is correct
    const user= await User.findOne({email}).select('+password');
    
    if(!user||!(await user.correctPassword(password,user.password))){
        return next(new AppError('Incorrect email or password!',401))
    }

// 3) If everything ok, send token to client
   const token=signToken(user._id);
   res.status(200).json({
    status:'success',
    token
   });
});

exports.protect= catchAsync(async(req,res,next)=>{
// 1) Getting token and check if it exit
let token;
  if(
    req.headers.authorization && 
    req.headers.authorization.startsWith('Bearer'))
    {
     token=req.headers.authorization.split(' ')[1];
  }
  if(!token){
    return next(new AppError('You are not logged in please log in to get access.', 401));
  }
  
// 2) Verification token
const decoded= await promisify(jwt.verify)(token, process.env.JWT_SECRET);

// 3) Check if user still exists
const freshUser=await User.findById(decoded.id);
if(!freshUser){
  return next(new AppError('The user belonging to this  token no longre exist.',401));
}
//4) Check If user change password after the token was issue 
freshUser.changedPasswordAfter(decoded.iat);

next();
});