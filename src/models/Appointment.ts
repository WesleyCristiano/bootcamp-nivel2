import {Entity, 
        Column, 
        PrimaryGeneratedColumn,
        CreateDateColumn,
        UpdateDateColumn,
        ManyToOne,
        JoinColumn} from 'typeorm'
import User from '../models/User'

@Entity('appointments')
class Appointment{
    
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('uuid')
    provider_id: string;

    @ManyToOne(()=>User) // indica qual é a entidade a ser relacionada muitos agendamentos para um usuario
    @JoinColumn({name: 'provider_id'})//indica qual coluna recebe o relacionamento
    provider: User

    @Column('timestamp with time zone')
    date: Date;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;


}
export default Appointment