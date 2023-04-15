const fs=require('fs');
const mongoose=require('mongoose');
const dotenv=require('dotenv');
const Tour=require('./../../models/tourModel');
dotenv.config({path:'./config.env'});

const DB=process.env.DATABASE.replace(
    '<PASSWORD>',
    process.env.DATABASE_PASSWORD
);

mongoose.connect(DB,{
    useNewUrlParser: true,
    useCreateIndex:true,
    useFindAndModify:false
})
.then(con =>{
    
    console.log('DB connection successful!')
});

// import data into database
const importData= async ()=>{
    try{
        await Role.create(roles);
        console.log('Data suceees fully loded')
        process.exit();
    }catch(err){
        console.log(err);
    }
};
const deleteData= async ()=>{
    try{
        await Role.deleteMany();
        console.log('Data suceees fully deleted')
        process.exit();
    }catch(err){
        console.log(err);
    }
};

if(process.argv[2]==='--import'){
    importData();
}
else if(process.argv[2]==='--delete'){
    deleteData();
}

console.log(process.argv)