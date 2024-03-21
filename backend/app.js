import express  from "express";
import dotenv  from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import axios from "axios";
import mysql from "mysql";
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


// connection.connect((err)=>{
//     if (err) {
//       console.log('error connecting: ' + err);
//       return;
//     }
//     console.log('connected as id ' + connection.threadId);
// });

var sql = "CREATE TABLE IF NOT EXISTS data ( username TEXT(100) , codelanguage TEXT(10), stdin TEXT(10000), code TEXT(50000), submissiondate DATETIME, stdout TEXT(10000) );";
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

app.get("/",(req,res)=>{
    res.send("Welcome to the backend");
});


app.post("/submit",async(req,res)=>{
    console.log(req.body.user);
    console.log(req.body.lang);
    console.log(req.body.stdin);
    console.log(req.body.code);


    const options = {
        method: 'POST',
        url: 'https://judge0-ce.p.rapidapi.com/submissions',
        params: {
          base64_encoded: 'true',
          fields: '*'
        },
        headers: {
          'content-type': 'application/json',
          'Content-Type': 'application/json',
          'X-RapidAPI-Key': process.env.X_RapidAPI_Key,
          'X-RapidAPI-Host': process.env.X_RapidAPI_Host
        },
        data: {
          language_id: 52,
          source_code: req.body.code,
          stdin: req.body.stdin
        }
      };
      
      try {
          const response = await axios.request(options);
          console.log(response.data);
      } catch (error) {
          console.error(error);
      }




    // const q="INSERT INTO data (username, codelanguage, stdin, code) VALUES ("+req.body.user+","+req.body.lang+","+req.body.stdin+","+req.body.code+")";
    const q = "INSERT INTO data (username, codelanguage, stdin, code) VALUES (?, ?, ?, ?)";
    const values = [req.body.user, req.body.lang, req.body.stdin, req.body.code];
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