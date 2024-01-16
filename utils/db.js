const mongoose=require('mongoose');

mongoose.connect(process.env.MONGODB_URI, {
    dbName: 'evently',
}).then(()=>{
    console.log('MongoDB Connected..!');
}).catch((err)=>{
    console.log(err);
});