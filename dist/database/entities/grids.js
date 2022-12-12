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
export var GridInterpreter;
(function (GridInterpreter) {
    GridInterpreter["NUMBER"] = "NUMBER";
    GridInterpreter["BOOLEAN"] = "BOOLEAN";
    GridInterpreter["NORMALIZED"] = "NORMALIZED";
})(GridInterpreter || (GridInterpreter = {}));
let GridORM = class GridORM {
};
__decorate([
    PrimaryGeneratedColumn("uuid"),
    __metadata("design:type", String)
], GridORM.prototype, "gridId", void 0);
__decorate([
    Column("int"),
    __metadata("design:type", Number)
], GridORM.prototype, "problemNumber", void 0);
__decorate([
    Column("int"),
    __metadata("design:type", Number)
], GridORM.prototype, "fromExample", void 0);
__decorate([
    Column("int"),
    __metadata("design:type", Number)
], GridORM.prototype, "exampleIndex", void 0);
__decorate([
    Column({ length: 255 }),
    __metadata("design:type", String)
], GridORM.prototype, "label", void 0);
__decorate([
    Column("int", { array: true }),
    __metadata("design:type", Array)
], GridORM.prototype, "gridData", void 0);
__decorate([
    Column({
        type: "enum",
        enum: GridInterpreter,
        default: GridInterpreter.NUMBER
    }),
    __metadata("design:type", String)
], GridORM.prototype, "interpretAs", void 0);
GridORM = __decorate([
    Entity({ name: "grids" }),
    Unique(["problemNumber", "gridData"])
], GridORM);
export { GridORM };
