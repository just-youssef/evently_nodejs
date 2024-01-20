const mongoose=require('mongoose');

mongoose.connect(process.env.MONGODB_URI, {
    dbName: 'evently_kinde',
}).then(()=>{
    console.log('MongoDB Connected..!');
}).catch((err)=>{
    console.log(err);
});