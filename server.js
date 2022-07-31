const express=require("express")
const mongoose=require("mongoose")
const path=require("path")
const dataModel = require("./schema")
const cors=require("cors")
const multer=require("multer")

const app=express()

const photo=path.join(__dirname,"/images")
app.use(express.static(photo))

const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"./images")
    },
    filename:(req,file,cb)=>{
        console.log(file)
        cb(null,Date.now()+"__"+file.originalname)
    }
})

const upload=multer({storage:storage})

// middlewares
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cors())

app.listen(5000 || PORT,(err)=>{
    if(!err){
        console.log("server is running at port 5000")
    }
})

mongoose.connect("mongodb://localhost/instaclonefinal",()=>{
    console.log("connected to db")
},(err)=>{
    console.log(err)
})

app.get("/",(req,res)=>{
    res.status(200).send("home page")
})

app.get("/insta/data" ,async(req,res)=>{
    try{
        const result=await dataModel.find()
        res.send(result)
        console.log(result)
    }
    catch(err){
        console.log(err)
    }
})

app.post("/insta/data",upload.single("images"),(req,res)=>{
    dataModel.create({name:req.body.name,location:req.body.location,images:req.file.filename,description:req.body.description}).then((data)=>{
        res.status(200).send("data added successfully")
    }).catch((err)=>{
        console.log(err)
    })
})