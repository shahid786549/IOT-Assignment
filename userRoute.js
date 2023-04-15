const express=require("express");
const userController=require('./../controllers/userController');
const authController=require('./../controllers/authController');
const router=express.Router();


router.post('/signup',authController.signup);
router.post('/signin',authController.login);


router.route('/:id')
.get(userController.getUser)


module.exports=router;
