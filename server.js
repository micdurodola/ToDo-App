const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 5000;
const uri = process.env.DB_URL;

mongoose.connect(uri, {
    useNewUrlParser: true,
    useCreateIndex:true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('MongoDB Connected…')
  })
  .catch(err => console.log(err));


const TodoRouter = require('./routes/toDos');
app.use('/todo',TodoRouter);

app.listen(port,()=>{
    console.log(`Server is running in Port:${port}`);
});
module.exports = app;




