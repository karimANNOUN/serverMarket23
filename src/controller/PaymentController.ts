
import { AppDataSource } from "../data-source"
import {  Request, Response } from "express"
import { Product } from "../entity/Product";
import { Payment } from "../entity/Payment";
import { Store } from "../entity/Store";
const fetch = require("node-fetch");



module.exports.payment=async(req:Request,res:Response)=>{
    const stores = req.body.store
     const userRepository = AppDataSource.getRepository(Payment)
     const payment = new Payment()
     payment.cardName = req.body.cardName 
     payment.cvc = req.body.cvc
     payment.cardNumber=req.body.cardNumber
     payment.expire=req.body.expire
     payment.totalPrice = req.body.total
     payment.user=req.user.user.id
     
    await userRepository.save(payment)
 
  const productRepository = AppDataSource.getRepository(Product)
  for (const store of stores) {
  await productRepository
     .createQueryBuilder()
     .update(Product)
     .set({
         quantity: () => "quantity - 1" ,
     })
     .where("id = :id", { id: store.product.id })
     .execute()
   }
 
   const paymenttRepository = AppDataSource.getRepository(Payment)
   const payments = await paymenttRepository.find({
    
     where: { user:{
     id:  req.user.user.id
     } },
     relations: { user:true }
    })
 
    
    res.json({payments})
 
   }


   module.exports.getPayment=async(req:Request,res:Response)=>{
    const paymenttRepository = AppDataSource.getRepository(Payment)
    const payment = await paymenttRepository.find({
     
      where: { user:{
      id:  req.user.user.id
      } },
      relations: { user:true }
     })

     
     res.json({payment})
  }

  const { PAYPAL_CLIENT_ID, PAYPAL_CLIENT_SECRET } = process.env;
const base = "https://api-m.sandbox.paypal.com";


const generateAccessToken = async () => {
  try {
    if (!PAYPAL_CLIENT_ID || !PAYPAL_CLIENT_SECRET) {
      throw new Error("MISSING_API_CREDENTIALS");
    }
    const auth = Buffer.from(
      PAYPAL_CLIENT_ID + ":" + PAYPAL_CLIENT_SECRET,
    ).toString("base64");
    const response = await fetch(`${base}/v1/oauth2/token`, {
      method: "POST",
      body: "grant_type=client_credentials",
      headers: {
        Authorization: `Basic ${auth}`,
      },
    });

    const data : any = await response.json();
    return data.access_token;
  } catch (error) {
    console.error("Failed to generate Access Token:", error);
  }
};

async function handleResponse(response) {
    try {
      const jsonResponse = await response.json();
      return {
        jsonResponse,
        httpStatusCode: response.status,
      };
    } catch (err) {
      const errorMessage = await response.text();
      throw new Error(errorMessage);
    }
  }



  const createOrder = async ({store,total}) => {
    // use the cart information passed from the front-end to calculate the purchase unit details
   
    const accessToken = await generateAccessToken();
    const url = `${base}/v2/checkout/orders`;
    const payload = {
      intent: "CAPTURE",
      purchase_units: [ 
        {
          amount: {
            currency_code: "USD",
            value:total,
          },
        },
      ],
    };
  
   
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
        // Uncomment one of these to force an error for negative testing (in sandbox mode only). Documentation:
        // https://developer.paypal.com/tools/sandbox/negative-testing/request-headers/
        // "PayPal-Mock-Response": '{"mock_application_codes": "MISSING_REQUIRED_PARAMETER"}'
        // "PayPal-Mock-Response": '{"mock_application_codes": "PERMISSION_DENIED"}'
        // "PayPal-Mock-Response": '{"mock_application_codes": "INTERNAL_SERVER_ERROR"}'
      },
      method: "POST",
      body: JSON.stringify(payload),
    });
  
    return handleResponse(response);
  };
  
  
  
  const captureOrder = async (orderID) => {
    const accessToken = await generateAccessToken();
    const url = `${base}/v2/checkout/orders/${orderID}/capture`;
  
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
        // Uncomment one of these to force an error for negative testing (in sandbox mode only). Documentation:
        // https://developer.paypal.com/tools/sandbox/negative-testing/request-headers/
        // "PayPal-Mock-Response": '{"mock_application_codes": "INSTRUMENT_DECLINED"}'
        // "PayPal-Mock-Response": '{"mock_application_codes": "TRANSACTION_REFUSED"}'
        // "PayPal-Mock-Response": '{"mock_application_codes": "INTERNAL_SERVER_ERROR"}'
      },
    });
  
    return handleResponse(response);
  };

  module.exports.paypalOrder=async(req:Request,res:Response)=>{
    try {
      const productRepository = AppDataSource.getRepository(Product)
   //   console.log(req.body)
      // use the cart information passed from the front-end to calculate the order amount detals
      const { store,total } = req.body;
      const { jsonResponse, httpStatusCode }  = await createOrder({store,total})
     if(httpStatusCode === 201){
      for (const stor of store) {
        await productRepository
           .createQueryBuilder()
           .update(Product)
           .set({
               quantity: () => "quantity - 1" ,
           })
           .where("id = :id", { id: stor.product.id })
           .execute()
         }
       
     }
      res.status(httpStatusCode).json(jsonResponse);
    } catch (error) {
      console.error("Failed to create order:", error);
      res.status(500).json({ error: "Failed to create order." });
    }

  }


  module.exports.captureOrder=async(req:Request,res:Response)=>{
    try {  
      const { orderID } = req.body;
      const { jsonResponse, httpStatusCode } = await captureOrder(orderID);
  
      if(httpStatusCode === 201 ){
        const userRepository = AppDataSource.getRepository(Payment)
        const payment = new Payment()
        payment.cardName = jsonResponse.payer.name.given_name + jsonResponse.payer.name.surname
        payment.cvc = jsonResponse.purchase_units[0].postal_code
        payment.cardNumber=jsonResponse.payment_source.paypal.account_id
        payment.totalPrice = jsonResponse.purchase_units[0].payments.captures[0].amount.value
        payment.user=req.user.user.id
        
       await userRepository.save(payment)


       const storeRepository = AppDataSource.getRepository(Store)
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
       res.json({allProducts});


      }

     
    //  res.status(httpStatusCode).json(jsonResponse);
    } catch (error) {
      console.error("Failed to capture order:", error);
      res.status(500).json({ error: "Failed to capture order." });
    }
  }