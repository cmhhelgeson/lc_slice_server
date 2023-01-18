import {Entity, Unique, PrimaryGeneratedColumn, Column} from "typeorm"
import { GridInterpreter } from "../../__generated__/resolvers-types.js"

@Entity({name: "grids"})
@Unique(["problemNumber", "gridData"])
export class GridORM {
    @PrimaryGeneratedColumn("uuid")
    gridId: string

    @Column("int")
    problemNumber: number

    @Column("int")
    fromExample: number

    @Column("int")
    exampleIndex: number

    @Column({length: 255})
    label: string

    @Column("int", {array: true})
    gridData: number[][]

    @Column({
      type: "enum",
      enum: GridInterpreter,
      default: GridInterpreter.Number
    })
    interpretAs: GridInterpreter

    width: number
    height: number
}