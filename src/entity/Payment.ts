import { Entity, PrimaryGeneratedColumn, Column ,Unique ,OneToOne ,JoinColumn,ManyToOne,OneToMany } from "typeorm"
import { User } from "./User"
@Entity()
export class Payment {

    @PrimaryGeneratedColumn()
    id: number

    @Column({nullable:true})
    cardName: string | null

    @Column({ default: () => "NOW()" })
    date: Date 

    @Column({nullable:true})
    cvc: number | null

    @Column({nullable:true})
    cardNumber: string | null

    @Column({nullable:true})
    expire: Date | null


    @Column({nullable:true})
    totalPrice: string | null

    @ManyToOne(() => User, (user) => user.payment)
    user: User

   

  

} 