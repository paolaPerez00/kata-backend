import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm"
import { Role } from "./roleModel";
import { Department } from "./departmentModel";
import { DigitalAccess } from "./digitalAccessModel";
import { Assignment } from "./assignmentModel";
import { Device } from "./deviceModel";
import { Status } from "./statusModel";

@Entity()
export class User{
    @PrimaryGeneratedColumn()
    idUser: number;

    @Column()
    name: string;
    
    @Column()
    lastname: string;

    @Column()
    email: string;

    @Column()
    user: string;

    @ManyToOne(() => Role, (role) => role.users, {
        nullable: false
    })
    @JoinColumn({name: 'role'})
    role: Role;

    @OneToOne(() => Device, {
        nullable: true
    })
    @JoinColumn({name: 'device'})
    device: Device | null

    @ManyToOne(() => Department, (department) => department.users,  {
        nullable: false
    })
    @JoinColumn({name: 'department'})
    department: Department;

    @ManyToOne(() => Status, (status) => status.statusUser, {
        nullable: false
    })
    @JoinColumn({name: 'status'})
    status: Status;

    @OneToMany(() => DigitalAccess, (digitalAccess) => digitalAccess.user)
    digitalAccesses: DigitalAccess[];

    @OneToMany(() => Assignment, (assignment) => assignment.user)
    assigments: Assignment[];

}
