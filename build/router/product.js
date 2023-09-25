"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//const express = require('express');
var express = require("express");
var router = express.Router();
var verifyToken = require('../verifytoken/verrifyToken');
var productServices = require('../controller/ProductController');
var multer = require('multer');
var storage = require('../upload/Cloudinary').storage;
//import * as storage from "../upload/Cloudinary"
var upload = multer({ storage: storage });
router.post('/newproduct', verifyToken, upload.single('file'), productServices.newProducts);
router.get('/allproducts', verifyToken, productServices.allProducts);
router.get('/productuser', verifyToken, productServices.productUser);
router.post('/storeproduct', verifyToken, productServices.productStore);
router.get('/getstore', verifyToken, productServices.getStore);
router.delete('/deleteproduct', verifyToken, productServices.deleteProduct);
router.get('/product/:id', productServices.personelProduct);
router.put('/updated', verifyToken, upload.single('file'), productServices.updateProduct);
router.delete('/deletepersonel', verifyToken, productServices.deletedProductUser);
module.exports = router;
//# sourceMappingURL=product.js.map