// env variables and database
require('dotenv').config();
require('./utils/db');

// third party modules
const express=require("express");
const cors=require('cors');
const helmet=require('helmet');
const cookieParser=require('cookie-parser');

// routers
const userRouter = require('./routes/user');
const eventRouter = require('./routes/event');
const ticketRouter = require('./routes/ticket');

// error middleware
const errorMW = require("./middlewares/errorMW");

// initialize app
const app=express();

// using third party modules
app.use(cors({
    origin: ['http://localhost:3000', 'https://evently-frontend-nextjs.onrender.com']
}));
app.use(helmet());
app.use(cookieParser());
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// using routers
app.use("/api/user", userRouter);
app.use("/api/event", eventRouter);
app.use("/api/ticket", ticketRouter);

// using error middleware (must be at last)
app.use(errorMW);

// run app listening on port
const port=process.env.PORT || 3000; 
app.listen(port, ()=>{
    console.log(`Listening on port ${port}..!`);
});