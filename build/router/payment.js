"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
//const express = require('express');
var router = express.Router();
var paymentServices = require('../controller/PaymentController');
var verifyToken = require('../verifytoken/verrifyToken');
router.post('/payment', verifyToken, paymentServices.payment);
router.get('/getpayment', verifyToken, paymentServices.getPayment);
router.post('/my-server/create-paypal-order', verifyToken, paymentServices.paypalOrder);
router.post('/my-server/capture-paypal-order', verifyToken, paymentServices.captureOrder);
module.exports = router;
//# sourceMappingURL=payment.js.map