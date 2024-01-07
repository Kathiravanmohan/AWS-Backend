import express from 'express'

import { MongoClient } from 'mongodb';

import * as dotenv  from "dotenv";

dotenv.config();
const app =  express()
const PORT=8000
console.log(process.env.Mongo_Url)
const MongoUrl=process.env.Mongo_Url
async function createConnections() {
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

app.listen(PORT,()=>console.log("app is listening in port", PORT))