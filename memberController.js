const Member=require('../models/memberModel');
const APIFeatures=require('../utils/apiFeatures');
const catchAsync=require('../utils/catchAsync');
const AppError=require('../utils/appError');


// post method
exports.postMember=catchAsync(async(req,res,next)=>{
    const newMember= await Member.create(req.body);
    
      res.status(201).json({
          status:'success',
               data:{
                   member:newMember
                   }
       });
    });


    exports.getAllmember=catchAsync(async (req,res)=>{

        console.log(req.query);
        
        // EXCUTE QUERY
        const features= new APIFeatures(Member.find(), req.query)
        .paginate();
        const members= await features.query;
    
        // SEND RESPONSE 
        res.status(200).json({
            status:'success',
           result:members.length,
             data:{
                members
            }
        }); 
    });
    exports.deleteMember=catchAsync( async (req,res,next)=>{    
    
        const member= await Member.findByIdAndDelete(req.params.id);
         if(!member){
             return next(new AppError('No tour found with that id', 404))
             }
          res.status(204).json({
         status:'success',
        data:{
            data: null
        }
           });
        
 });  