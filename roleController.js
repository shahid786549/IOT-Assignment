
const { query } = require('express');
const { QueryCursor } = require('mongoose');
const Role=require('../models/roleModel');
const APIFeatures=require('../utils/apiFeatures');
const catchAsync=require('../utils/catchAsync');
const AppError=require('../utils/appError');


exports.getAllRoles=catchAsync(async (req,res)=>{

    console.log(req.query);
    
    // EXCUTE QUERY
    const features= new APIFeatures(Role.find(), req.query)
    .paginate();
    const roles= await features.query;

    // SEND RESPONSE 
    res.status(200).json({
        status:'success',
       result:roles.length,
         data:{
           roles
        }
    }); 
});

   
   
// post method
exports.postRole=catchAsync(async(req,res,next)=>{
const newRole= await Role.create(req.body);

  res.status(201).json({
      status:'success',
           data:{
               role:newRole
               }
   });
});

       
           
     
    