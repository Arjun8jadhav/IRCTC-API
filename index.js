import express from "express";
import bodyParser from "body-parser";
import useRouters from './Routes/router.js'
const app= express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/users',useRouters);

app.get('/',(req,res)=>{
    res.send("hello world");
})

app.listen(8000,()=>{
    console.log("server has been started")
})