var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
let ProblemInfoORM = class ProblemInfoORM {
};
__decorate([
    PrimaryGeneratedColumn("uuid"),
    __metadata("design:type", String)
], ProblemInfoORM.prototype, "problemId", void 0);
__decorate([
    Column("int", { unique: true }),
    __metadata("design:type", Number)
], ProblemInfoORM.prototype, "problemNumber", void 0);
__decorate([
    Column({ unique: true }),
    __metadata("design:type", String)
], ProblemInfoORM.prototype, "title", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], ProblemInfoORM.prototype, "description", void 0);
__decorate([
    Column("int"),
    __metadata("design:type", Number)
], ProblemInfoORM.prototype, "numExamples", void 0);
__decorate([
    Column({ default: false }),
    __metadata("design:type", Boolean)
], ProblemInfoORM.prototype, "hasGraphs", void 0);
__decorate([
    Column({ default: false }),
    __metadata("design:type", Boolean)
], ProblemInfoORM.prototype, "hasGrids", void 0);
__decorate([
    Column({ default: false }),
    __metadata("design:type", Boolean)
], ProblemInfoORM.prototype, "hasArrays", void 0);
ProblemInfoORM = __decorate([
    Entity({ name: "problemInfo" })
], ProblemInfoORM);
export { ProblemInfoORM };
