const AppError=require('./../utils/appError');
const handleCastErrorDB=err =>{
    const message=`Invalid ${err.path}: ${err.value}.`;
    return new AppError(message,400);
};
const handleDuplicateFieldsDB=err=>{
    const value=err.errmsg.match(/(["'])(?:(?=(\\?))\2.)*?\1/)[0];
    console.log(value);
    const message=`Duplicate Field value: ${value}. plese use another value!`;
    return new AppError(message,400);
};

const handlJWTError=err=> new AppError('Invalid Tpken Please login agian. ',404);
 const handleJWTExpiredError=err=>new AppError('Your Token has expired! Please login again.',401);
const sendErrorDev=(err,res)=>{
    res.status(err.statusCode).json({
        status:err.status,
        error:err,
        message:err.message,
        stack:err.stack
    });
}
const sendErrorProd=(err,res)=>{
    // Operational, trusted Error: send message to client
    if(err.isOperational){
        res.status(err.statusCode).json({
            status:err.status,
            message:err.message
            
        });
        // programming and unknown error: don't leak error detalis 
    }else {
        // log error
        console.error('ERROR',err);
        // send genric message
        res.status(500).json({
         status:'error',
         message:'Something went very wrong'
        });
    }
    
}
module.exports=(err,req,res,next) => {
    //console.log(err.stack);
    
        err.statusCode=err.statusCode||500;
        err.status=err.status||'error';
    
       if(process.env.NODE_ENV==='development'){
        sendErrorDev(err,res);
       }else if(process.env.NODE_ENV==='production'){
        let error={...err };

        if(error.name==='CastError')error=handleCastErrorDB(error);
        if(error.code===11000)error=handleDuplicateFieldsDB(error);
        if(error.name==='JsonWebTokenError')error=handleJWTError(error);
        if(error.name==='handleJWTExpiredError')error=handleJWTExpiredError(error);
        sendErrorProd(error,res);
       } 
       
    };