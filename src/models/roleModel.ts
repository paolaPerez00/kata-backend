import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { User } from "./userModel";
import { AccessRole } from "./accessRoleModel";

@Entity()
export class Role{

    @PrimaryGeneratedColumn()
    idRole: number;

    @Column()
    description: string;

    @OneToMany(() => User, (user) => user.role )
    @JoinColumn()
    users: User[];

    @OneToMany(() => AccessRole, (accesRole) => accesRole.role)
    accesRole: AccessRole[];
}

