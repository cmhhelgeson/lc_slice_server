import "reflect-metadata"
import { DataSource } from "typeorm"
import { GridORM} from "./entities/grids.js"
import { ProblemInfoORM } from "./entities/problemInfo.js"
import { 
  psqlPassword, 
  psqlUsername, 
  psqlDatabase,
  DATABASE_URL,
  PGPASSWORD,
  PGPORT,
  PGUSER,
  PGDATABASE,
  PGHOST
} from "./environment/envVars.js"


/*export const AppDataSource = new DataSource({
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
/*export const AppDataSource = new DataSource({
  url: DATABASE_URL,
  type: "postgres",
  host: PGHOST,
  port: parseInt(PGPORT),
  username: PGUSER,
  password: PGPASSWORD,
  database: PGDATABASE,
  synchronize: true,
  logging: true,
  entities: [GridORM, ProblemInfoORM],
  migrations: [],
  subscribers: [],
}) */

export const AppDataSource = new DataSource({
  url: process.env.DATABASE_URL,
  type: "postgres",
  host: process.env.PGHOST,
  port: parseInt(process.env.PGPORT),
  username: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
  synchronize: true,
  logging: true,
  entities: [GridORM, ProblemInfoORM],
  migrations: [],
  subscribers: [],
}) 
