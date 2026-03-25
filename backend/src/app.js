const express = require("express");
const multer = require("multer");
const uploadFile = require("./services/storage.service")
const postModel = require("./models/post.model")
const cors = require("cors")

const app = express();
app.use(express.json());//middleware
app.use(cors());

const upload = multer({storage:multer.memoryStorage()})


//create posts
app.post("/create-post", upload.single("image"), async(req,res)=>{
    console.log(req.body)
    console.log(req.file)
    const result = await uploadFile(req.file.buffer);

    const post = await postModel.create({
        image:result.url,
        caption:req.body.caption
    })

    return res.status(201).json({
        message:"post created successfully",
        post
    })
})

//fetch all posts
app.get("/posts",async (req,res)=>{
const posts = await postModel.find();

return res.status(200).json({
    message:"posts fetched successfully",
    post:posts
})
})

app.delete("/post/:index", async(req,res)=>{
    const index = req.params.id;
    const deletedPost = await postModel.findOneAndDelete(index);

    // await postModel.delete(index)

    return res.status(200).json({
        message:"Post delete successfully",
        data: deletedPost
    })
})

module.exports = app;