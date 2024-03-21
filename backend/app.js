import express  from "express";
import dotenv  from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import axios from "axios";
import mysql from "mysql";
import moment from 'moment-timezone';

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

const connection = mysql.createConnection({
    host     : process.env.MYSQL_ADDON_HOST,
    user     : process.env.MYSQL_ADDON_USER,
    password : process.env.MYSQL_ADDON_PASSWORD,
    database : process.env.MYSQL_ADDON_DB,
    keepAlive: true
})

function connectDB(){
    connection.connect((err)=>{
        if (err) {
            console.log('error connecting: ' + err);
            return;
        }
        console.log('connected as id ' + connection.threadId);
    });
}

var sql = "CREATE TABLE IF NOT EXISTS data ( username TEXT(100) , codelanguage TEXT(10), stdin TEXT(10000), code TEXT(50000), submissiondate TEXT(100) , stdout TEXT(10000) );";
connection.query(sql,(err,result)=>{
    if(err)
    {
        console.log(err);
    }
    else
    {
        console.log(result);
    }
});

app.get("/",async(req,res)=>{
    
    res.send("Welcome to the backend");
});


app.post("/submit",async(req,res)=>{
    console.log(req.body.user);
    console.log(req.body.lang);
    console.log(req.body.stdin);
    console.log(req.body.code);
    console.log(req.body.date);
    const buffer = Buffer.from(req.body.code);
    const code = buffer.toString('base64');

    const buffer2 = Buffer.from(req.body.stdin);
    const stdin = buffer2.toString('base64');
    let langId=54;
    if(req.body.lang=="C++") langId=54;
    if(req.body.lang=="Java") langId=62;
    if(req.body.lang=="JavaScript") langId=63;
    if(req.body.lang=="Python") langId=71;

    let x="";
    const options = {
        // c++ id:54
        //  java id: 62
        //  JS id: 63
        //  py id: 71
        method: 'POST',
        url: 'https://judge0-ce.p.rapidapi.com/submissions',
        params: {
          base64_encoded: 'true',
          wait: 'true',
          fields: '*',
        },
        headers: {
          'content-type': 'application/json',
          'Content-Type': 'application/json',
          'X-RapidAPI-Key': process.env.X_RapidAPI_Key,
          'X-RapidAPI-Host': process.env.X_RapidAPI_Host
        },
        data: {
          language_id: langId,
          source_code: code,
          stdin: stdin
        }
    };
      
    try {
        const response = await axios.request(options);
        console.log(response.data);
        const buffer= Buffer.from(response.data.stdout, 'base64');
        console.log(buffer.toString());
        x=buffer.toString();
    } catch (error) {
        console.error(error);
    }
    
    function dateTime(){
        // const utcDate = new Date(req.body.date);
        const localDate=moment.tz(req.body.date).format('YYYY-MM-DD HH:mm:ss');
        return(localDate);//.substring(0,10)+'T'+localTime.substring(11,19));
    }

    const q = "INSERT INTO data (username, codelanguage, stdin, code, submissiondate, stdout) VALUES (?, ?, ?, ?, ?, ?)";
    const values = [req.body.user, req.body.lang, req.body.stdin, req.body.code,dateTime(req.body.date),x];
    connection.query(q,values,(err,result)=>{
        if(err)
        {
            console.log(err);
        }
        else
        {
            console.log(result);
            res.send("Data added successfully");
        }
    });
    
});

app.get("/allsubmissions",async(req,res)=>{
    const q = "SELECT * from data";


    connection.query(q,(err,result)=>{
        if(err)
        {
            console.log(err);
        }
        else
        {
            console.log(result);
            res.send(result);
        }
    });
});


app.listen(port,()=>{
    console.log("server started at port "+port);
})