const express = require ('express')
const db = require ('./config/db')
const Post = require('./models/post') 
const User = require('./models/user')
const app = express();

const port = process.env.PORT || 3000;

app.use(express.json()); //middleware

db().then(()=>console.log('successfully connected to db')).catch(err => console.log(err))


// to the check the health of API
app.get('/api',(req,res)=>{
     res.status(200).json({message:"api is working"})
})

//fetching all the post
app.get('/api/posts',(req,res)=>{
     Post.find({}).then((data)=>{
        console.log(data)
        res.status(200).json({data})
     }).catch((err)=>{
        console.log(err);
        res.status(500).json({message:err})
     })
})

// get a specific post
app.get('/api/posts/:id',(req,res)=>{
    let postid = req.params.id;
    Post.find({_id:postid}).then((data)=>{
        console.log(data)
        res.status(200).json({data})
     }).catch((err)=>{
        console.log(err);
        res.status(500).json({message:err})
     })

})

app.post('/api/posts/',(req,res)=>{

    let newPost = new Post({
        title: req.body.title,
        description: req.body.description
    })

    newPost.save().then((data)=>{
        console.log(data)
        res.status(200).json({message:"post created succesfully",data: data})
    }).catch((err)=>{
        console.log(err)
        res.status(500).json({message:err})
    })
})

// updating a specific post
app.put('/api/posts/:id', (req, res)=>{
    let postid = req.params.id;

    let newInfo = {
        title: req.body.title,
        description: req.body.description
    }

    Post.findByIdAndUpdate(postid, newInfo).then((data)=>{
        res.status(200).json({message:"post updated succesfully"})
    }).catch((err)=>{
        res.status(500).json({message:err})
    })

})

// deleting a specific post
app.delete('/api/posts/:id',(req,res)=>{
    let postid = req.params.id;
    Post.findByIdAndDelete(postid).then(()=>{
        res.status(200).json({message:"post deleted succesfully"})
    }).catch((err)=>{
        res.status(500).json({message: err})
    })

})

app.listen(port,(err)=>{
    if(!err) {
        console.log(`server is up and running at ${port}`)
    }
})