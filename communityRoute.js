const express=require("express");
const communityController=require('../controllers/communityController');
const authController=require('../controllers/authController');
const router=express.Router();

//router.param('id',toureController.chieckId); 




router
.route('/')
.get(communityController.getAllCommunity)
.post(communityController.postComunity);



module.exports=router;