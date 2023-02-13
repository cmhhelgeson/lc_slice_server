import { readFileSync } from 'fs';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { typeDefs as scalarTypeDefs, resolvers as scalarResolvers, } from 'graphql-scalars';
import { GridORM } from '../database/entities/grids.js';
import { ProblemInfoORM } from '../database/entities/problemInfo.js';
import { createProblemInfoORM } from '../database/utils/ormUtils.js';
import { GraphQLError } from 'graphql';
import { ArrayORM } from '../database/entities/arrays.js';
import { SQLGetDataTypeProblems } from "../database/databaseHelpers.js";
//Create typedefs and default resolver
const typeDefs = readFileSync('./schema.graphql', { encoding: 'utf-8' });
const getGridWidth = ({ gridData }) => {
    return gridData[0].length;
};
const getGridHeight = ({ gridData }) => {
    return gridData.length;
};
const resolvers = {
    Query: {
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
        },
        arrays: (parent, args, contextValue, info) => {
            return contextValue.dataSource.manager.find(ArrayORM);
        },
        gridProblems: (parent, args, contextValue, info) => {
            const { take, skip } = args;
            return contextValue.dataSource.manager.query(SQLGetDataTypeProblems("grids", "ASC"));
        },
        graphProblems: (parent, args, contextValue, info) => {
            return contextValue.dataSource.getRepository(ProblemInfoORM).find({
                order: {
                    problemNumber: {
                        direction: "ASC"
                    }
                },
                skip: 0,
                take: 5
            });
        },
        arrayProblems: (parent, args, contextValue, info) => {
            return contextValue.dataSource.getRepository(ProblemInfoORM).find({
                order: {
                    problemNumber: {
                        direction: "ASC"
                    }
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
                grid.label = label;
                grid.interpretAs = interpretAs;
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
        },
        addArray: async (parent, args, contextValue, info) => {
            const { problemNumber, data, example, interpretAs, label } = args.input;
            console.log(example, label, interpretAs);
            const problemRepo = await contextValue.dataSource.getRepository(ProblemInfoORM);
            const problem = await problemRepo.findOne({
                where: {
                    problemNumber: problemNumber
                }
            });
            if (problem) {
                const arr = new ArrayORM();
                arr.arrayData = data;
                arr.problemNumber = problemNumber;
                arr.exampleIndex = 0;
                arr.fromExample = problem.numExamples;
                arr.label = label;
                arr.interpretAs = interpretAs;
                await contextValue.dataSource.manager.save(arr);
                await contextValue.dataSource
                    .createQueryBuilder()
                    .update(ProblemInfoORM)
                    .set({ numExamples: problem.numExamples + 1 })
                    .where("problemNumber = :problemNumber", { problemNumber: problemNumber })
                    .execute();
                return arr;
            }
            throw new GraphQLError('Invalid problem number');
        }
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
        },
        arrays: async (parent, args, contextValue, info) => {
            const { example } = args;
            let validArrays = example !== undefined ?
                await contextValue.dataSource.getRepository(ArrayORM).find({
                    where: {
                        problemNumber: parent.problemNumber,
                        fromExample: args.example
                    }
                }) :
                await contextValue.dataSource.getRepository(ArrayORM).find({
                    where: {
                        problemNumber: parent.problemNumber
                    }
                });
            return validArrays;
        }
    }
};
export const execSchema = makeExecutableSchema({
    typeDefs: [
        ...scalarTypeDefs,
        typeDefs
    ],
    resolvers: {
        ...scalarResolvers,
        ...resolvers
    }
});
/*const mockedSchema = addMocksToSchema({
  schema,
  mocks: {
    ...scalarMocks
  }
}) */ 
