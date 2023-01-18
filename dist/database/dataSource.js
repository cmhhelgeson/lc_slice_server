import "reflect-metadata";
import { DataSource } from "typeorm";
import { ArrayORM } from "./entities/arrays.js";
import { GridORM } from "./entities/grids.js";
import { ProblemInfoORM } from "./entities/problemInfo.js";
import { DATABASE_URL, PGPASSWORD, PGPORT, PGUSER, PGDATABASE, PGHOST } from "./environment/envVars.js";
export const AppDataSource = new DataSource({
    url: process.env.DATABASE_URL || DATABASE_URL,
    type: "postgres",
    host: process.env.PGHOST || PGHOST,
    port: parseInt(process.env.PGPORT) || parseInt(PGPORT),
    username: process.env.PGUSER || PGUSER,
    password: process.env.PGPASSWORD || PGPASSWORD,
    database: process.env.PGDATABASE || PGDATABASE,
    synchronize: false,
    logging: true,
    entities: [GridORM, ProblemInfoORM, ArrayORM],
    migrations: [],
    subscribers: [],
});
