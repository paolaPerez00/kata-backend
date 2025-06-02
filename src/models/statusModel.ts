import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { DigitalAccess } from "./digitalAccessModel";
import { Assignment } from "./assignmentModel";
import { User } from "./userModel";

@Entity()
export class Status{

    @PrimaryGeneratedColumn()
    idStatus: number;

    @Column()
    description: string;

    @OneToMany(() => DigitalAccess, (DigitalAccess) => DigitalAccess.status)
    digitalAccesss: DigitalAccess[];

    @OneToMany(() => Assignment, (assignment) => assignment.status)
    statusAssigment: Assignment[];

    @OneToMany(() => User, (user) => user.status)
    statusUser: User[];
}
