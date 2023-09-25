"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require('express');
var router = express.Router();
var userServices = require('../controller/UserController');
var verifyToken = require('../verifytoken/verrifyToken');
router.post('/register', userServices.register);
router.post('/login', userServices.login);
router.get('/user', verifyToken, userServices.user);
module.exports = router;
//# sourceMappingURL=user.js.map