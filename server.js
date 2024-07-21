const express = require('express');
const mongoose = require('mongoose');
const userRouter = require("./routers/userRouter.js")

const app = express();
const cors = require('cors')
app.use(express.json());
app.use(cors())

// Set strictQuery to suppress the deprecation warning
mongoose.set('strictQuery', false);

// Connection URL
const mongosh_URL = "mongodb+srv://jagadeeshmeesala:jagadeesh_2002@cluster0.jikvrst.mongodb.net/MusicPlatform?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(mongosh_URL)
  .then(() => {
    console.log('connected....');
  })
  .catch(e => {
    console.error('Error connecting to MongoDB:', e.message);
  });

app.listen(5001, () => {
  console.log('server running on port 5001');
});

app.use('/users',userRouter);