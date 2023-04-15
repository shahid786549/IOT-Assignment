const express=require("express");
const memberController=require('../controllers/memberController');
const authController=require('../controllers/authController');
const router=express.Router();

//router.param('id',toureController.chieckId); 




router
.route('/')
.get(memberController.getAllmember)
.post(memberController.postMember);

router.route('/:id')
.delete(memberController.deleteMember);



module.exports=router;