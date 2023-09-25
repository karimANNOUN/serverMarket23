//const express = require('express');
import * as express from "express"
const router = express.Router();
const verifyToken  =require('../verifytoken/verrifyToken')
const productServices=require('../controller/ProductController')
const multer = require('multer');
const {storage}= require('../upload/Cloudinary')
//import * as storage from "../upload/Cloudinary"





const upload = multer({ storage:storage })

router.post('/newproduct',verifyToken,upload.single('file'),productServices.newProducts)

router.get('/allproducts',verifyToken,productServices.allProducts)

router.get('/productuser',verifyToken,productServices.productUser)

router.post('/storeproduct',verifyToken,productServices.productStore) 

router.get('/getstore',verifyToken,productServices.getStore)

router.delete('/deleteproduct',verifyToken,productServices.deleteProduct)

router.get('/product/:id',productServices.personelProduct)

router.put('/updated',verifyToken,upload.single('file'),productServices.updateProduct)


router.delete('/deletepersonel',verifyToken,productServices.deletedProductUser)



























module.exports = router;