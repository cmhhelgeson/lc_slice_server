import { ApolloServer } from '@apollo/server';
import {expressMiddleware} from "@apollo/server/express4"
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { readFileSync } from 'fs';
import { Post, Resolvers, User, Grid, GridInterpreter, ArrayInterpreter} from '__generated__/resolvers-types';
import http from 'http'
import cors from "cors"
import express from "express"
import pkg from "body-parser"
const {json} = pkg;
import { addMocksToSchema } from '@graphql-tools/mock';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { 
  typeDefs as scalarTypeDefs,
  resolvers as scalarResolvers,
  mocks as scalarMocks,
} from 'graphql-scalars';

//NOTE: Node.js does not allow directory imports
import { AppDataSource } from "./database/dataSource.js"
import localDatabase from './localDatabase.js';
import {GridORM} from './database/entities/grids.js';
import {ProblemInfoORM} from './database/entities/problemInfo.js';
import { createProblemInfoORM } from './database/utils/ormUtils.js';
import { GraphQLError } from 'graphql';
import { ArrayORM } from './database/entities/arrays.js';
import { execSchema } from 'execSchema/execSchema.js';


interface MyContext {
  dataSource: typeof AppDataSource
}

//Create Express app/server
const app = express();
const httpServer = http.createServer(app);

//Apply schema and plugins to server
const server = new ApolloServer<MyContext>({
  schema: execSchema,
  introspection: true,
  plugins: [ApolloServerPluginDrainHttpServer({httpServer})]
});

await AppDataSource.initialize().then(async () => {
  console.log("Postgres TypeORM Database initialized");
}).catch(error => console.log(error));

//Start server
await server.start();

//Cors Options
const corsOptions: cors.CorsOptions = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
  optionsSuccessStatus: 204
}

//Apply express middleware
app.use(
  '/graphql',
  cors<cors.CorsRequest>(corsOptions),
  json(),
  expressMiddleware(server, {
    context: async () => ({dataSource: AppDataSource})
  })
) 

const port = Number.parseInt(process.env.PORT) || 8000

await new Promise<void>((resolve) => httpServer.listen({port: port}, resolve));
console.log(`🚀 Server listening at: ${port}`);