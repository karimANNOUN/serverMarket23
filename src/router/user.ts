const express = require('express');
const router = express.Router();
import { Request, Response } from "express"
const userServices=require('../controller/UserController')
const verifyToken=require('../verifytoken/verrifyToken')

router.post('/register' ,userServices.register);
router.post('/login' ,userServices.login);
router.get('/user',verifyToken,userServices.user)

























module.exports = router;