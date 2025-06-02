import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { AccessRole } from "./accessRoleModel";
import { AccessApplication } from "./accessApplicationModel";

@Entity()
export class Application{

    @PrimaryGeneratedColumn()
    idApplication: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @OneToMany(() => AccessRole, (accesRole) => accesRole.application)
    accesRole: AccessRole[];

    @OneToMany(() => AccessApplication, (accessApplication) => accessApplication.application)
    accessApplication: AccessApplication[];

}

