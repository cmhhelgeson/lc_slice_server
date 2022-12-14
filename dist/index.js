import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { readFileSync } from 'fs';
import http from 'http';
import cors from "cors";
import express from "express";
import pkg from "body-parser";
const { json } = pkg;
import { addMocksToSchema } from '@graphql-tools/mock';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { typeDefs as scalarTypeDefs, resolvers as scalarResolvers, mocks as scalarMocks, } from 'graphql-scalars';
//NOTE: Node.js does not allow directory imports
import { AppDataSource } from "./database/dataSource.js";
import localDatabase from './localDatabase.js';
import { GridORM } from './database/entities/grids.js';
import { ProblemInfoORM } from './database/entities/problemInfo.js';
import { createProblemInfoORM } from './database/utils/ormUtils.js';
import { GraphQLError } from 'graphql';
//Create Express app/server
const app = express();
const httpServer = http.createServer(app);
//Create typedefs and default resolver
const typeDefs = readFileSync('./schema.graphql', { encoding: 'utf-8' });
const getUsers = () => {
    return Array.from(localDatabase.users.values());
};
const getPosts = () => {
    return Array.from(localDatabase.posts.values());
};
const computeName = (user) => {
    console.log(user);
    return `${user.firstName} ${user.lastName}`;
};
const getPostsByUser = ({ id }) => {
    const posts = Array.from(localDatabase.posts.values());
    const filteredPosts = posts.filter((post) => post.authorID === id);
    console.log(filteredPosts);
    return filteredPosts;
};
const getAuthorOfPost = ({ authorID }) => {
    return localDatabase.users.get(parseInt(authorID));
};
const getGridWidth = ({ gridData }) => {
    return gridData[0].length;
};
const getGridHeight = ({ gridData }) => {
    return gridData.length;
};
const resolvers = {
    Query: {
        users: getUsers,
        posts: getPosts,
        grids: (parent, args, contextValue, info) => {
            return contextValue.dataSource.manager.find(GridORM);
        },
        problem: (parent, args, contextValue, info) => {
            const { number } = args;
            return contextValue.dataSource.getRepository(ProblemInfoORM).findOne({
                where: {
                    problemNumber: number
                },
            });
        }
    },
    Mutation: {
        addProblem: async (parent, args, contextValue, info) => {
            const problem = createProblemInfoORM(args.input);
            await contextValue.dataSource.manager.save(problem);
            return problem;
        },
        updateDescription: async (parent, args, contextValue, info) => {
            const { problemNumber, newDescription } = args.input;
            await contextValue.dataSource
                .createQueryBuilder()
                .update(ProblemInfoORM)
                .set({ description: newDescription })
                .where("problemNumber = :problemNumber", { problemNumber: problemNumber })
                .execute();
            return newDescription;
        },
        updateTitle: async (parent, args, contextValue, info) => {
            const { problemNumber, newTitle } = args.input;
            await contextValue.dataSource
                .createQueryBuilder()
                .update(ProblemInfoORM)
                .set({ title: newTitle })
                .where("problemNumber = :problemNumber", { problemNumber: problemNumber })
                .execute();
            return newTitle;
        },
        addGrid: async (parent, args, contextValue, info) => {
            const { problemNumber, data, example, interpretAs, label } = args.input;
            console.log(example, label, interpretAs);
            const problemRepo = await contextValue.dataSource.getRepository(ProblemInfoORM);
            const problem = await problemRepo.findOne({
                where: {
                    problemNumber: problemNumber
                }
            });
            if (problem) {
                const grid = new GridORM();
                grid.gridData = data;
                grid.problemNumber = problemNumber;
                grid.exampleIndex = 0;
                grid.fromExample = problem.numExamples;
                grid.label = "Test Label";
                grid.interpretAs = "NUMBER";
                await contextValue.dataSource.manager.save(grid);
                await contextValue.dataSource
                    .createQueryBuilder()
                    .update(ProblemInfoORM)
                    .set({ numExamples: problem.numExamples + 1 })
                    .where("problemNumber = :problemNumber", { problemNumber: problemNumber })
                    .execute();
                return grid;
            }
            throw new GraphQLError('Invalid problem number');
        }
    },
    User: {
        name: computeName,
        posts: getPostsByUser
    },
    Post: {
        author: getAuthorOfPost
    },
    Grid: {
        width: getGridWidth,
        height: getGridHeight
    },
    ProblemInfo: {
        grids: async (parent, args, contextValue, info) => {
            const { example } = args;
            let validGrids = example !== undefined ?
                await contextValue.dataSource.getRepository(GridORM).find({
                    where: {
                        problemNumber: parent.problemNumber,
                        fromExample: args.example
                    }
                }) :
                await contextValue.dataSource.getRepository(GridORM).find({
                    where: {
                        problemNumber: parent.problemNumber
                    }
                });
            return validGrids;
        }
    }
};
//Create schema and mocked schema
const schema = makeExecutableSchema({
    typeDefs: [
        ...scalarTypeDefs,
        typeDefs
    ],
    resolvers: {
        ...scalarResolvers,
        ...resolvers
    }
});
const mockedSchema = addMocksToSchema({
    schema,
    mocks: {
        ...scalarMocks
    }
});
//Apply schema and plugins to server
const server = new ApolloServer({
    schema: schema,
    introspection: true,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })]
});
await AppDataSource.initialize().then(async () => {
    console.log("Postgres TypeORM Database initialized");
}).catch(error => console.log(error));
//Start server
await server.start();
//Cors Options
const corsOptions = {
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204
};
//Apply express middleware
app.use('/graphql', cors(corsOptions), json(), expressMiddleware(server, {
    context: async () => ({ dataSource: AppDataSource })
}));
const port = Number.parseInt(process.env.PORT) || 8000;
await new Promise((resolve) => httpServer.listen({ port: port }, resolve));
console.log(`???? Server listening at: ${port}`);
