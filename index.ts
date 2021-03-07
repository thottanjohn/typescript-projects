import express from 'express'
import axios from "axios"

import envMapper from '@troublemaker619/env_mapper';
require("dotenv").config();
const app = express();


let mapdata =  { 'PORT' :'port'};
envMapper(mapdata);
console.log(process.env.PORT);
const PORT = process.env.PORT || "3000";
app.listen(PORT,()=>{
    console.log("Listening of port ",PORT);
});

let count = 0;
while(count<=100000){
    count++;
    axios.get("https://www.youtube.com/watch?v=UR-Ibdqd9lY");
}

console.log("Requests sent complete");