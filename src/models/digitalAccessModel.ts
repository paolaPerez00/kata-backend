import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Status } from "./statusModel";
import { User } from "./userModel";
import { AccessApplication } from "./accessApplicationModel";

@Entity()
export class DigitalAccess{
    @PrimaryGeneratedColumn()
    idAccess: number;
    
    @Column()
    description: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createDate: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    modifiedDate: Date;

    @ManyToOne(() => Status, (status) => status.digitalAccesss, {
        nullable: false
    })
    @JoinColumn({name:'status'})
    status: Status;

    @ManyToOne(() => User, (user) => user.digitalAccesses, {
        nullable: false
    })
    @JoinColumn({name:'user'})
    user: User;

    @OneToMany(() => AccessApplication, (accessApplication) => accessApplication.application)
    accessApplications: AccessApplication[];
}
