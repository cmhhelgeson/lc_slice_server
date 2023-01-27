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
import { ArrayInterpreter } from "../../__generated__/resolvers-types.js";
let ArrayORM = class ArrayORM {
};
__decorate([
    PrimaryGeneratedColumn("uuid"),
    __metadata("design:type", String)
], ArrayORM.prototype, "arrayId", void 0);
__decorate([
    Column("int"),
    __metadata("design:type", Number)
], ArrayORM.prototype, "problemNumber", void 0);
__decorate([
    Column("int"),
    __metadata("design:type", Number)
], ArrayORM.prototype, "fromExample", void 0);
__decorate([
    Column("int"),
    __metadata("design:type", Number)
], ArrayORM.prototype, "exampleIndex", void 0);
__decorate([
    Column({ length: 255 }),
    __metadata("design:type", String)
], ArrayORM.prototype, "label", void 0);
__decorate([
    Column("int", { array: true }),
    __metadata("design:type", Array)
], ArrayORM.prototype, "arrayData", void 0);
__decorate([
    Column({
        type: "enum",
        enum: ArrayInterpreter,
        default: ArrayInterpreter.NUMBER
    }),
    __metadata("design:type", String)
], ArrayORM.prototype, "interpretAs", void 0);
ArrayORM = __decorate([
    Entity({ name: "arrays" }),
    Unique(["problemNumber", "arrayData"])
], ArrayORM);
export { ArrayORM };
