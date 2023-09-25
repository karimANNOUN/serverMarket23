import { Entity, PrimaryGeneratedColumn, Column ,Unique ,OneToOne ,JoinColumn,ManyToOne,OneToMany } from "typeorm"
import { User } from "./User"
import { Store } from "./Store"
@Entity()
export class Product {

    @PrimaryGeneratedColumn()
    id: number

    @Column({nullable:true})
    name: string | null

    @Column({ default: () => "NOW()" })
    date: Date 

    @Column({nullable:true})
    quantity: number | null

    @Column({nullable:true})
    category: string | null

    @Column({nullable:true})
    image: string | null

    @Column({nullable:true})
    price: number | null

    @ManyToOne(() => User, (user) => user.products)
    user: User

   

    @OneToMany(() => Store, (store) => store.product) // note: we will create author property in the Photo class below
    store: Store[]
  

} 
   