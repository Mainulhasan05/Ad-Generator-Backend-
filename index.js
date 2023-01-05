const express = require('express');
const MongoClient=require("mongodb").MongoClient;
const app = express();
const cors=require('cors')
const mongoose=require("mongoose")
const data=require('./data.json')
const PORT=5000||process.env.PORT;
const {decode}=require('html-entities')
const Auth=require("./Routes/Auth")
const DB_URL="mongodb+srv://user:user@cluster0.ayogb.mongodb.net/ShoppingCorner?retryWrites=true&w=majority"
const client=new MongoClient(DB_URL);
const User=require("./Models/userSchema")
const Products=require("./Routes/Products")
const session = require('express-session')

app.use(session({
  secret: 'your-secret-key',
  resave: false,
  cookie:{maxAge:30000},
  saveUninitialized: false
}))
app.use(cors())
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));
app.use(express.json());
app.use("/auth",Auth)
app.use("/products",Products)


mongoose.set('strictQuery',true)
mongoose.connect(DB_URL,{
  useNewUrlParser: true,
  useUnifiedTopology: true,
  
})
.then(()=>{
    console.log("Database Connected");
})

app.get("/remove/:id",(req,res)=>{
    // const input = '<p style="color: red;">Hello, World!asdsds</p>';
    const input = data.data[req.params.id].description;
    const output = input
    
    res.send(removeHtmlAndCss(decode("https:\/\/i0.wp.com\/shoppingcorner.com.bd\/image\/catalog\/robin choose\/314418299_1278276682993754_8306993337885084035_n.jpg"))) 
})

function removeHtmlAndCss(htmlString) {
    // Use a regular expression to match and remove HTML tags
    const strippedHtml = htmlString.replace(/<[^>]+>/g, '');
  
    // Use a regular expression to match and remove CSS styles
    const strippedCss = strippedHtml.replace(/\s*style=['"].*?['"]/g, '');
  
    return strippedCss;
  }


app.get("/loaddata",async(req,res)=>{
  let result=await client.connect();
  let db=result.db("ShoppingCorner")
  let collection=db.collection("products")
  const data=await collection.find().toArray();
  res.json(data)
})
  // loading data to mongodb
app.get('/nevervisitthisagain', async(req, res) => {
  const arr=data.data
    for(let i=0; i<arr.length; i++){
        arr[i].description=removeHtmlAndCss(decode(arr[i].description))
        arr[i].image=removeHtmlAndCss(decode(arr[i].image))
        await dbObj.collection("products").insertOne(arr[i],(err,res)=>{
            console.log("inserted successfully")
          })
    }
  res.send("received")
});

app.get('/updateall', async(req, res) => {
  // const arr=data.data
  let result=await client.connect();
  let db=result.db("ShoppingCorner")
  let collection=db.collection("products")
  console.log("getting request")
  await collection.updateMany({},{$set:{"user":"shoppingcorner@gmail.com"}})
  res.send("updated")
});

app.listen(PORT, () => {
  console.log('Express app listening on port '+PORT);
});
