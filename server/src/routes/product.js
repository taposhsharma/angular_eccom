const express = require('express');


const Product = require('../model/product')

const router = express.Router();



router.get('/allProducts', async (req, res) => {
 
  try{
    const products = await Product.find();
    
    res.status(200).send(products)      
}catch(e){
     res.status(400).send(e)
}

});

module.exports = router;