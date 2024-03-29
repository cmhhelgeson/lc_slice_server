import { Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity({name: "problemInfo"})
export class ProblemInfoORM {
    @PrimaryGeneratedColumn("uuid")
    problemId: string

    @Column("int", {unique: true})
    problemNumber: number

    @Column({unique: true})
    title: string

    @Column()
    description: string

    @Column("int")
    numExamples: number
}