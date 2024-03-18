import express  from "express";
import dotenv  from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
dotenv.config();

const port=process.env.PORT||8000;

const app=express();
app.use(cors());
// const corsOptions ={
//     origin:process.env.ORIGIN_URI, 
//     credentials:true,            
//     optionSuccessStatus:200
// }
// app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/",(req,res)=>{
    res.send("Welcome to the backend");
});

app.listen(port,()=>{
    console.log("server started at port "+port);
})