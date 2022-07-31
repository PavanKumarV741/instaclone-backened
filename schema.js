const mongoose=require("mongoose")

const dataSchema=new mongoose.Schema({
    name: String,
    images:{
        type:String,
        required:true
    },
    location: String,
    description: String

})

const dataModel=new mongoose.model("insta",dataSchema)

module.exports=dataModel