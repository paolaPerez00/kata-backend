import { Column, Entity, JoinColumn, OneToMany, PrimaryColumn } from "typeorm"
import { Assignment } from "./assignmentModel";

@Entity()
export class Device{
    @PrimaryColumn()
    serie: string;

    @Column()
    name: string;

    @Column()
    type: string;

    @OneToMany(() => Assignment, (assignments) => assignments.device, {
        nullable: false
    })
    @JoinColumn({name: 'assignments'})
    assignments: Assignment[]

}
