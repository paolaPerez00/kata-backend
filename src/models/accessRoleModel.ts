import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm"
import { Application } from "./applicationModel";
import { Role } from "./roleModel";

@Entity()
export class AccessRole{

    @PrimaryColumn()
    idRole: number;
  
    @PrimaryColumn()
    idApplication: number;

    @Column()
    description: string;

    @ManyToOne(() => Role, (role) => role.accesRole, {
        nullable: false
    } )
    @JoinColumn({name: 'idRole'})
    role: Role;

    @ManyToOne(() => Application, (application) => application.accesRole, {
        nullable: false
    } )
    @JoinColumn({name: 'idApplication'})
    application: Application;
}

