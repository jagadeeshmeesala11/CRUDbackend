const express = require('express');
const mongoose = require('mongoose');
const userRouter = require("./routers/userRouter.js")
const dotenv = require('dotenv')
dotenv.config();

const app = express();
const cors = require('cors')
app.use(express.json());
app.use(cors())

// Set strictQuery to suppress the deprecation warning
mongoose.set('strictQuery', false);

// Connection URL
const mongosh_URL = process.env.MOGOSH;

mongoose.connect(mongosh_URL)
  .then(() => {
    console.log('connected....');
  })
  .catch(e => {
    console.error('Error connecting to MongoDB:', e.message);
  });

  const port = process.env.PORT || 5001;

app.listen(port, () => {
  console.log('server running on port 5001');
});

app.use('/users',userRouter);