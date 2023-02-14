import {Entity, Unique, PrimaryGeneratedColumn, Column} from "typeorm"

export enum LinkStatusEnum {
  FORWARD_LINKED = "FORWARD_LINKED",
  BACK_LINKED = "BACK_LINKED",
  DOUBLY_LINKED = "DOUBLY_LINKED",
  UNLINKED = "UNLINKED"
}

@Entity({name: "linkedLists"})
@Unique(["problemNumber", "listData"])
export class LinkedListORM {
    @PrimaryGeneratedColumn("uuid")
    listId: string

    @Column("int")
    problemNumber: number

    @Column("int")
    fromExample: number

    @Column("int")
    exampleIndex: number

    @Column({length: 255})
    label: string

    @Column("int", {array: true})
    listData: number[]

    @Column({
      type: "enum",
      enum: LinkStatusEnum,
      default: LinkStatusEnum.FORWARD_LINKED
    })
    linkStatus: LinkStatusEnum
}
