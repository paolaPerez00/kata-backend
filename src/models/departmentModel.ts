import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { User } from "./userModel";

@Entity()
export class Department{

    @PrimaryGeneratedColumn()
    idDepartment: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @OneToMany(() => User, (user) => user.department)
    users: User[];
}
