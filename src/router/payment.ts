import * as express from "express"
//const express = require('express');
const router = express.Router();
const paymentServices=require('../controller/PaymentController')
const verifyToken=require('../verifytoken/verrifyToken')


router.post('/payment',verifyToken,paymentServices.payment)

router.get('/getpayment',verifyToken,paymentServices.getPayment) 

router.post('/my-server/create-paypal-order',verifyToken,paymentServices.paypalOrder) 

router.post('/my-server/capture-paypal-order',verifyToken,paymentServices.captureOrder)














module.exports = router;