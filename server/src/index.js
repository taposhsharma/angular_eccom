const express = require('express')

const bodyParser = require('body-parser')
require('./db/mongoose')

const cors = require('cors');
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/users',require('./routes/users'))
app.use('/products',require('./routes/product'))
app.use('/cart',require('./routes/cart'))
const PORT = 3000

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})