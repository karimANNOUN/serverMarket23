import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"
import { Product } from "./entity/Product"
import { Store } from "./entity/Store"
import { Payment } from "./entity/Payment"




export const AppDataSource = new DataSource({
    type:"postgres",
    host:`${process.env.DATABASE_HOST}`,
    port:5432,
    username:`${process.env.DATABASE_USERNAME}`,
    password:`${process.env.DATABASE_PASSWORD}`,
    database:`${process.env.DATABASE_NAME}`,
    synchronize: true,
    logging: false,
    entities: [User,Product,Store,Payment],
    migrations: [],
    subscribers: [],
})
 

