const mongoose = require('mongoose');
const MongoClient=require("mongodb").MongoClient;
const bcrypt=require("bcrypt");
var jwt = require('jsonwebtoken');
const User=require("../Models/userSchema")
const DB_URL="mongodb+srv://user:user@cluster0.ayogb.mongodb.net/ShoppingCorner?retryWrites=true&w=majority"
const client=new MongoClient(DB_URL);


const getProducts=async(req,res)=>{
    
    if(req.headers.email){
        let result=await client.connect();
        let db=result.db("ShoppingCorner")
        let collection=db.collection("products")
        const query={"user":req.headers.email}
        const data=await collection.find(query).toArray();
        
        res.json(data)    
    }
    else{
        res.status(400).json({
            'msg':"Please fill all the fields"
        })
    }
    
}

const uploadProducts=async(req,res)=>{
    let result=await client.connect();
    let db=result.db("ShoppingCorner")
    let collection=db.collection("products")
    const data=req.body.data
    for(let i=0; i<data.length; i++)
    {
        if(data[i].product_id && data[i].model && data[i].name){
            const newObj={...data[i],["user"]:req.headers.email}
            const exists=await collection.findOne(newObj)
            if(!exists){
                collection.insertOne(newObj)
            }
        }
    }
    res.status(200).json({"msg":"Inserted Successfully"})
}


module.exports={
    getProducts,uploadProducts
}