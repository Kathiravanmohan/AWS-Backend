import express from 'express'

import { MongoClient } from 'mongodb';

import * as dotenv  from "dotenv";
import cors from 'cors';

import router from './Auth/login.cjs';
//

dotenv.config();
const app =  express()
const PORT=8000

app.use(express.json())
app.use('/login', router)
app.use(cors())
console.log(process.env.Mongo_Url)

async function createConnections() {
    const MongoUrl=process.env.Mongo_Url
    const client = new MongoClient(MongoUrl);
     await client.connect()
     console.log("Mongodb is connected")
    return client;
}

const client = await createConnections();

app.get('/',async(req,res)=>{
 const repository=await client.db("AWS")
 .collection("reposiory")
 .find().toArray();

 res.send(repository)
});

app.post('/',async(req,res)=>{
    const newrepository=req.body
    const repository=await client.db("AWS")
    .collection("reposiory")
    .insertMany(newrepository);
    res.send(newrepository)

 res.send(repository)
})

app.get('/item',async(req,res)=>{
    const item=await client.db("AWS")
    .collection("item")
    .find().toArray();
   
    res.send(item)
   });

app.post('/item',async(req,res)=>{
    const newitem=req.body
    const item=await client.db("AWS")
    .collection("item")
    .insertMany(newitem);
    

 res.send(item)
})



app.listen(PORT,()=>console.log("app is listening in port", PORT))