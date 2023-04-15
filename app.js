const express=require("express");
const morgan=require("morgan");

const AppError=require('./utils/appError');
const globalErrorHandler=require('./controllers/errorController');
const roleRouter=require('./routes/roleRoute');
const userRouter=require('./routes/userRoute');
const communityRouter=require('./routes/communityRoute');
const memberRouter=require('./routes/memberRoute');

const app=express();

// MIDDLE WARE

if(process.env.NODE_ENV==='development'){
    app.use(morgan('dev')); 
    }

app.use(express.json());
app.use(express.static(`${__dirname}/public`));

 app.use((req,res,next)=>{
    req.requestTime=new Date().toISOString();
    console.log(req.headers);
    next();
 });

 //2)ROUTES

app.use('/api/v1/role',roleRouter);
app.use('/api/v1/users',userRouter);
app.use('/api/v1/community',communityRouter);
app.use('/api/v1/member',memberRouter);



app.all('*',(req,res,next)=>{

    next(new AppError(`Can't find ${req.originalUrl} on this server! `,404));
});

app.use(globalErrorHandler);

//run server on local host

module.exports= app;