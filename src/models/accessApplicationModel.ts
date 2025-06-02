import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm"
import { Application } from "./applicationModel";
import { Assignment } from "./assignmentModel";

@Entity()
export class AccessApplication{

    @PrimaryColumn()
    idAssignment: number;
  
    @PrimaryColumn()
    idApplication: number;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createDate: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    modifiedDate: Date;

    @ManyToOne(() => Assignment, (assignment) => assignment.accessApplication, {
        nullable: false
    } )
    @JoinColumn({name: 'idAssignment'})
    assignment: Assignment;

    @ManyToOne(() => Application, (application) => application.accessApplication, {
        nullable: false
    } )
    @JoinColumn({name: 'idApplication'})
    application: Application;
}

