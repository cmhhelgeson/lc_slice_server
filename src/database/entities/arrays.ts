import {Entity, Unique, PrimaryGeneratedColumn, Column} from "typeorm"
import { ArrayInterpreter, ArrayType} from "../../__generated__/resolvers-types.js"

@Entity({name: "arrays"})
@Unique(["problemNumber", "arrayData"])
export class ArrayORM {
    @PrimaryGeneratedColumn("uuid")
    arrayId: ArrayType["arrayId"]

    @Column("int")
    problemNumber: ArrayType["problemNumber"]

    @Column("int")
    fromExample: ArrayType["fromExample"]

    @Column("int")
    exampleIndex: ArrayType["exampleIndex"]

    @Column({length: 255})
    label: ArrayType["label"]

    @Column("int", {array: true})
    arrayData: ArrayType["arrayData"]

    @Column({
      type: "enum",
      enum: ArrayInterpreter,
      default: ArrayInterpreter.Number
    })
    interpretAs: ArrayInterpreter
}