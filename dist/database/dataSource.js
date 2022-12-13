import "reflect-metadata";
import { DataSource } from "typeorm";
import { GridORM } from "./entities/grids.js";
import { ProblemInfoORM } from "./entities/problemInfo.js";
/* export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: `${psqlUsername}`,
    password: `${psqlPassword}`,
    database: `${psqlDatabase}`,
    synchronize: false,
    logging: true,
    entities: [GridORM, ProblemInfoORM],
    migrations: [],
    subscribers: [],
}) */
//Setup for railway deployment
export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: `${process.env.PGUSER}`,
    password: `${process.env.PGPASSWORD}`,
    database: `${process.env.PGDATABASE}`,
    synchronize: true,
    logging: true,
    entities: [GridORM, ProblemInfoORM],
    migrations: [],
    subscribers: [],
});
