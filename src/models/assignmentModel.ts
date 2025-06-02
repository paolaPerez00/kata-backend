import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Status } from "./statusModel";
import { User } from "./userModel";
import { Device } from "./deviceModel";
import { AccessApplication } from "./accessApplicationModel";

@Entity()
export class Assignment{
    @PrimaryGeneratedColumn()
    idAssignment: number;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createDate: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    modifiedDate: Date;

    @ManyToOne(() => Status, (status) => status.statusAssigment, {
        nullable: false
    })
    @JoinColumn({name: 'status'})
    status: Status;

    @ManyToOne(() => Device, (device) => device.assignments, {
        nullable: false
    })
    @JoinColumn({name: 'device'})
    device: Device;


    @ManyToOne(() => User, (user) => user.assigments , {
        nullable: false
    })
    @JoinColumn({name: 'user'})
    user: User;

    @OneToMany(() => AccessApplication, (accessApplication) => accessApplication.application)
    accessApplication: AccessApplication[];
    
}
