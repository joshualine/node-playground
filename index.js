const express = require('express');
const path = require('path');
const ejs = require('ejs');

const BlogPost = require('./models/BlogPost.js')
const mongoose = require('mongoose');
const bodyParser = require('body-parser')

// CONTROLLERS
const newPostController = require('./controllers/newPost');
const homeController = require('./controllers/home');
const aboutController = require('./controllers/about');


mongoose.connect('mongodb://localhost/my_database', {useNewUrlParser: true});

const app = express();
app.set('view engine', 'ejs');

app.listen(3000, () =>{
  console.log('App listening on port 3000')
})

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:true }))

// GET
app.get('/posts/new', newPostController);
app.get('/', homeController);
app.get('/about', aboutController);

app.get('/post/:id',async (req,res)=>{
  const blogpost = await BlogPost.findById(req.params.id)
  res.render('post',{
    blogpost
  })
})

// POST
app.post('/posts/store', async (req, res) => {
  await BlogPost.create(req.body)
  res.redirect('/')
})


