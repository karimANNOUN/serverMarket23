import { Entity, PrimaryGeneratedColumn, Column ,Unique ,OneToMany,OneToOne,JoinColumn,ManyToOne  } from "typeorm"
import { Product } from "./Product"
import {Payment} from "./Payment"
import { Store } from "./Store"
 
@Entity()
@Unique(['email'])
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column({nullable:true})
    email: string | null

    @Column({nullable:true})
    userName: string | null

    @Column({nullable:true})
    password: string | null

    @Column({nullable:true}) 
    image: string | null

    @OneToMany(() => Product, (product) => product.user) // note: we will create author property in the Photo class below
    products: Product[]

    @OneToMany(() => Store, (store) => store.author) // note: we will create author property in the Photo class below
    store: Store[]

    @OneToMany(() => Payment, (payment) => payment.user) // note: we will create author property in the Photo class below
    payment: Payment[]


}
