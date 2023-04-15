const Comunity=require('../models/communityModel');
const APIFeatures=require('../utils/apiFeatures');
const catchAsync=require('../utils/catchAsync');
const AppError=require('../utils/appError');


// post method
exports.postComunity=catchAsync(async(req,res,next)=>{
    const newComunity= await Comunity.create(req.body);
    
      res.status(201).json({
          status:'success',
               data:{
                   tour:newComunity
                   }
       });
    });

    exports.getAllCommunity=catchAsync(async (req,res)=>{

        console.log(req.query);
        
        // EXCUTE QUERY
        const features= new APIFeatures(Comunity.find(), req.query)
        .paginate();
        const comunities= await features.query;
    
        // SEND RESPONSE 
        res.status(200).json({
            status:'success',
           result:comunities.length,
             data:{
                comunities
            }
        }); 
    });