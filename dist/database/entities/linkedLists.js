var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, Unique, PrimaryGeneratedColumn, Column } from "typeorm";
export var LinkStatusEnum;
(function (LinkStatusEnum) {
    LinkStatusEnum["FORWARD_LINKED"] = "FORWARD_LINKED";
    LinkStatusEnum["BACK_LINKED"] = "BACK_LINKED";
    LinkStatusEnum["DOUBLY_LINKED"] = "DOUBLY_LINKED";
    LinkStatusEnum["UNLINKED"] = "UNLINKED";
})(LinkStatusEnum || (LinkStatusEnum = {}));
let LinkedListORM = class LinkedListORM {
};
__decorate([
    PrimaryGeneratedColumn("uuid"),
    __metadata("design:type", String)
], LinkedListORM.prototype, "listId", void 0);
__decorate([
    Column("int"),
    __metadata("design:type", Number)
], LinkedListORM.prototype, "problemNumber", void 0);
__decorate([
    Column("int"),
    __metadata("design:type", Number)
], LinkedListORM.prototype, "fromExample", void 0);
__decorate([
    Column("int"),
    __metadata("design:type", Number)
], LinkedListORM.prototype, "exampleIndex", void 0);
__decorate([
    Column({ length: 255 }),
    __metadata("design:type", String)
], LinkedListORM.prototype, "label", void 0);
__decorate([
    Column("int", { array: true }),
    __metadata("design:type", Array)
], LinkedListORM.prototype, "listData", void 0);
__decorate([
    Column({
        type: "enum",
        enum: LinkStatusEnum,
        default: LinkStatusEnum.FORWARD_LINKED
    }),
    __metadata("design:type", String)
], LinkedListORM.prototype, "linkStatus", void 0);
LinkedListORM = __decorate([
    Entity({ name: "linkedLists" }),
    Unique(["problemNumber", "listData"])
], LinkedListORM);
export { LinkedListORM };
