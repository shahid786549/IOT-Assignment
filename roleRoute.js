const express=require("express");
const roleController=require('../controllers/roleController');
const authController=require('../controllers/authController');
const router=express.Router();

//router.param('id',toureController.chieckId); 




router
.route('/')
.get(roleController.getAllRoles)
.post(roleController.postRole);



module.exports=router;