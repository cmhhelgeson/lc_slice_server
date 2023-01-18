import {Entity, Unique, PrimaryGeneratedColumn, Column} from "typeorm"
import { ArrayInterpreter} from "../../__generated__/resolvers-types.js"

@Entity({name: "arrays"})
@Unique(["problemNumber", "arrayData"])
export class ArrayORM {
    @PrimaryGeneratedColumn("uuid")
    arrayId: string

    @Column("int")
    problemNumber: number

    @Column("int")
    fromExample: number

    @Column("int")
    exampleIndex: number

    @Column({length: 255})
    label: string

    @Column("int", {array: true})
    arrayData: number[]

    @Column({
      type: "enum",
      enum: ArrayInterpreter,
      default: ArrayInterpreter.Number
    })
    interpretAs: ArrayInterpreter
}