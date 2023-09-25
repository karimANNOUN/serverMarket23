import { Entity, PrimaryGeneratedColumn, Column ,Unique ,OneToOne ,JoinColumn,ManyToOne,OneToMany } from "typeorm"
import { User } from "./User"
import { Product } from "./Product"
@Entity()
export class Store {

    @PrimaryGeneratedColumn()
    id: number


    @ManyToOne(() => User, (author) => author.store)
    author: User

    @ManyToOne(() => Product, (product) => product.store)
    product: Product


   

    


} 