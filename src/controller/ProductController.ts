import { AppDataSource } from "../data-source"
import { NextFunction, Request, Response } from "express"
import { Product } from "../entity/Product";
import { Store } from "../entity/Store";




module.exports.newProducts=async(req:Request,res:Response)=>{
   

    const user = req.user;
    // console.log(user)
     const userRepository = AppDataSource.getRepository(Product)
     const product = new Product()
     product.name = req.body.name 
     product.quantity = req.body.quantity
     product.category=req.body.category
     product.image=req.file.path
     product.price = req.body.price
     product.user=user.user.id
     
    await userRepository.save(product)

    const allProducts = await userRepository.find({
      relations: {
          user: true,
  
      },
  })
   

    res.json({allProducts})
   
  //  console.log(user)
  //  res.json({ message: 'This is a protected route', user });
   }

   module.exports.allProducts=async(req:Request,res:Response)=>{
    const userRepository = AppDataSource.getRepository(Product)
    const allProducts = await userRepository.find({
      relations: {
          user: true,
  
      },
   })


   res.json({allProducts})

  }

  module.exports.productUser=async(req:Request,res:Response)=>{
    
    const userRepository = AppDataSource.getRepository(Product)
    const allProducts = await userRepository.find({
     where:{
      user:{
       id:req.user.user.id
      }
    }
   })


   res.json({allProducts})

  }


  module.exports.productStore=async(req:Request,res:Response)=>{
   
    const user = req.user;
    // console.log(user)
     const userRepository = AppDataSource.getRepository(Store)
     const store = new Store()
     store.author = user.user.id
     store.product = req.body.id
   
    await userRepository.save(store) 

    const allProducts = await userRepository.find({
      where:{
       author:{
        id:req.user.user.id
       }
     },
     relations: {
      product: true,

  },
    })

   
   
    res.json({allProducts})

  }

  module.exports.getStore=async(req:Request,res:Response)=>{
    const userRepository = AppDataSource.getRepository(Store)
    const allProducts = await userRepository.find({
      where:{
       author:{
        id:req.user.user.id
       }
     },
     relations: {
      product: true,

  },
    })

    res.json({allProducts})
  }


  module.exports.deleteProduct=async(req:Request,res:Response)=>{
    const storeRepository = AppDataSource.getRepository(Store)
   
  await storeRepository
    .createQueryBuilder('store')
    .delete()
    .from(Store)
    .where("authorId = :authorId", { authorId: req.user.user.id })
    .andWhere("productId = :productId", { productId: req.body.prod.id })
    .execute()
 // await storeRepository.delete(photoToRemove)

  const allProducts = await storeRepository.find({
    where:{
     author:{
      id:req.user.user.id
     }
   },
   relations: {
    product: true,

},
  })


  res.json({allProducts})
  }

  module.exports.personelProduct=async(req:Request,res:Response)=>{
    
    const productRepository = AppDataSource.getRepository(Product)
    const product = await productRepository.findOne({
     
     where: { id:JSON.parse(req.params.id) },
     relations: { user:true }
    })

   
   
    res.json({product})


  }


  module.exports.updateProduct=async(req:Request,res:Response)=>{ 
    const productRepository = AppDataSource.getRepository(Product)
    await productRepository
    .createQueryBuilder()
    .update(Product)
    .set({
        name:req.body.name,
        quantity: req.body.quantity,
        price:req.body.price,
        image:req.file.path,
        category:req.body.category
    })
    .where("id = :id", { id: req.body.prodId })
    .execute()


  
    const allProducts = await productRepository.find({
      relations: {
          user: true,
  
      },
   })

   const allProduct = await productRepository.find({
    where:{
     user:{
      id:req.user.user.id
     }
   }
  })


   res.json({allProducts,allProduct})

  }


module.exports.deletedProductUser=async(req:Request,res:Response)=>{
   
    const personelRepository = AppDataSource.getRepository(Product)
   
    await personelRepository
      .createQueryBuilder('product')
      .delete()
      .from(Product)
      .where("id = :id", { id: JSON.parse(req.body.prod.id) })
      .execute()


      const allProducts = await personelRepository.find({
        where:{
         user:{
          id:req.user.user.id
         }
       }
      })


   
   
      res.json({allProducts})

  }