 
 const User=require('./../models/userModel');
 const catchAsync=require('./../utils/catchAsync');
 
 exports.getUser= catchAsync(async (req,res,next)=>{
    
    const user =await User.findById(req.params.id);
    if(!user){
    return next(new AppError('No tour found with that id', 404))
    }
    res.status(200).json({
     status:'success',
      data:{
        users
     }
 });
});

