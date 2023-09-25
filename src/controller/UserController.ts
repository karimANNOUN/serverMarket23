import { AppDataSource } from "../data-source"
import { Request, Response } from "express"
import { User } from "../entity/User"
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
module.exports.register=async (req:Request, res:Response) => {
    try {
        const user = await AppDataSource.getRepository(User).findOneBy({
            email: req.body.email,
        })
      console.log(user)
        if(user){
         res.status(400).json({message:'user email already exist use anothor email '})
        }
        if(user == null){
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const users = new User();
      users.email=req.body.email
      users.userName = req.body.username;
      users.password = hashedPassword;
      const userRepository = AppDataSource.getRepository(User)
      await userRepository.save(users)
     
       
      const token = jwt.sign({ users }, 'kimou',{ expiresIn: '7d' });

     
    
      res.status(201).json({ message: 'User registered successfully.' , token });
        }   
    } catch (error) {
      res.status(500).json({ message: 'An error occurred.' });
    }
  }

  module.exports.login=async (req:Request, res:Response) => {
    try {
      const user = await AppDataSource.getRepository(User).findOneBy({
        email: req.body.email,
    })
      if (!user) {
        return res.status(401).json({ message: 'Invalid credentials.' });
      }
      const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid credentials.' });
      }
      const token = jwt.sign({ user }, 'kimou',{ expiresIn: '7d' });
     
      
      res.json({ token });
    } catch (error) {
      res.status(500).json({ message: 'An error occurred.' });
    }
  }

  module.exports.user=async(req:Request,res:Response)=>{
   
    const user = req.user;
   
    res.json({ message: 'This is a protected route', user });
   }