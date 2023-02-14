import { link, readFileSync } from 'fs';
import { Resolvers, Grid} from '__generated__/resolvers-types';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { 
  typeDefs as scalarTypeDefs,
  resolvers as scalarResolvers,
  mocks as scalarMocks,
} from 'graphql-scalars';
//NOTE: Node.js does not allow directory imports
import { AppDataSource } from "../database/dataSource.js"
import {GridORM} from '../database/entities/grids.js';
import {ProblemInfoORM} from '../database/entities/problemInfo.js';
import { createProblemInfoORM } from '../database/utils/ormUtils.js';
import { GraphQLError } from 'graphql';
import { ArrayORM } from '../database/entities/arrays.js';
import { SQLGetDataTypeProblems } from "../database/databaseHelpers.js"
import { LinkedListORM } from 'database/entities/linkedLists.js';

export interface MyContext {
  dataSource: typeof AppDataSource
}

//Create typedefs and default resolver
const typeDefs = readFileSync('./schema.graphql', { encoding: 'utf-8' });

const getGridWidth = ({gridData}: Grid) : number => {
  return gridData[0].length;
}

const getGridHeight = ({gridData}: Grid): number => {
  return gridData.length;
}

const resolvers: Resolvers = {
  Query: {
    problem: (parent, args, contextValue: MyContext, info) => {
      const {number} = args;
      return contextValue.dataSource.getRepository(ProblemInfoORM).findOne({
        where: {
          problemNumber: number
        },
      })
    },
    grids: (parent, args, contextValue: MyContext, info) => {
      return contextValue.dataSource.manager.find(GridORM);
    }, 
    linkedLists: (parent, args, contextValue: MyContext, info) => {
      return contextValue.dataSource.manager.find(LinkedListORM)
    },
    arrays: (parent, args, contextValue: MyContext, info) => {
      return contextValue.dataSource.manager.find(ArrayORM)
    },
    gridProblems: (parent, args, contextValue: MyContext, info) => {
      const {take, skip} = args;
      return contextValue.dataSource.manager.query(SQLGetDataTypeProblems("grids", "ASC"));
    },
    graphProblems: (parent, args, contextValue: MyContext, info) => {
      return contextValue.dataSource.getRepository(ProblemInfoORM).find({
        order: {
          problemNumber: {
            direction: "ASC"
          }
        },
        skip: 0,
        take: 5
      })
    },
    arrayProblems: (parent, args, contextValue: MyContext, info) => {
      return contextValue.dataSource.getRepository(ProblemInfoORM).find({
        order: {
          problemNumber: {
            direction: "ASC"
          }
        },
      })
    },
    linkedListProblems: (parent, args, contextValue: MyContext, info) => {
      return contextValue.dataSource.manager.query(SQLGetDataTypeProblems("linkedLists", "ASC"));
    }
  },
  Mutation: {
    addProblem: async (parent, args, contextValue: MyContext, info) => {
      const problem = createProblemInfoORM(args.input);
      await contextValue.dataSource.manager.save(problem);
      return problem;  
    },
    updateDescription: async (parent, args, contextValue: MyContext, info) => {
      const {problemNumber, newDescription} = args.input
      await contextValue.dataSource
        .createQueryBuilder()
        .update(ProblemInfoORM)
        .set({description: newDescription})
        .where("problemNumber = :problemNumber", {problemNumber: problemNumber})
        .execute();
        return newDescription;
    },
    updateTitle: async (parent, args, contextValue: MyContext, info) => {
      const {problemNumber, newTitle} = args.input
      await contextValue.dataSource
        .createQueryBuilder()
        .update(ProblemInfoORM)
        .set({title: newTitle})
        .where("problemNumber = :problemNumber", {problemNumber: problemNumber})
        .execute();
      return newTitle
    },
    addGrid: async (parent, args, contextValue: MyContext, info) => {
      const {problemNumber, data, example, interpretAs, label} = args.input;
      console.log(example, label, interpretAs);
      const problemRepo = await contextValue.dataSource.getRepository(ProblemInfoORM);

      const problem = await problemRepo.findOne({
        where: {
          problemNumber: problemNumber
        }
      })
      if (problem) {
        const grid = new GridORM();
        grid.gridData = data;
        grid.problemNumber = problemNumber
        grid.exampleIndex = 0;
        grid.fromExample = problem.numExamples;
        grid.label = label;
        grid.interpretAs = interpretAs;
        await contextValue.dataSource.manager.save(grid);
        await contextValue.dataSource
          .createQueryBuilder()
          .update(ProblemInfoORM)
          .set({numExamples: problem.numExamples + 1})
          .where(
            "problemNumber = :problemNumber", 
            {problemNumber: problemNumber}
          )
          .execute();
        return grid;
      }
      throw new GraphQLError('Invalid problem number');
    },
    addArray: async (parent, args, contextValue: MyContext, info) => {
      const {problemNumber, data, example, interpretAs, label} = args.input;
      console.log(example, label, interpretAs);
      const problemRepo = await contextValue.dataSource.getRepository(ProblemInfoORM);

      const problem = await problemRepo.findOne({
        where: {
          problemNumber: problemNumber
        }
      })
      if (problem) {
        const arr = new ArrayORM();
        arr.arrayData = data;
        arr.problemNumber = problemNumber
        arr.exampleIndex = 0;
        arr.fromExample = problem.numExamples;
        arr.label = label;
        arr.interpretAs = interpretAs;

        await contextValue.dataSource.manager.save(arr);
        await contextValue.dataSource
          .createQueryBuilder()
          .update(ProblemInfoORM)
          .set({numExamples: problem.numExamples + 1})
          .where(
            "problemNumber = :problemNumber", 
            {problemNumber: problemNumber}
          )
          .execute();
        return arr;
      }
      throw new GraphQLError('Invalid problem number');
    },
    addLinkedList: async (parent, args, contextValue: MyContext, info) => {
      const {problemNumber, data, linkStatus, label} = args.input
      const problemRepo = await contextValue.dataSource.getRepository(ProblemInfoORM);

      const problem = await problemRepo.findOne({
        where: {
          problemNumber: problemNumber
        }
      })
      if (problem) {
        const list = new LinkedListORM();
        list.listData = data;
        list.problemNumber = problemNumber
        list.exampleIndex = 0;
        list.fromExample = problem.numExamples;
        list.label = label;
        list.linkStatus = linkStatus;

        await contextValue.dataSource.manager.save(list);
        await contextValue.dataSource
          .createQueryBuilder()
          .update(ProblemInfoORM)
          .set({numExamples: problem.numExamples + 1})
          .where(
            "problemNumber = :problemNumber", 
            {problemNumber: problemNumber}
          )
          .execute();
        return list;
      }
      throw new GraphQLError('Invalid problem number');
    }
  },
  Grid: {
    width: getGridWidth,
    height: getGridHeight
  },
  ProblemInfo: {
    grids: async (parent, args, contextValue: MyContext, info) => {
      const {example} = args;
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
        })
      ;
      return validGrids;
    },
    arrays: async (parent, args, contextValue: MyContext, info) => {
      const {example} = args;
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
        })
      ;
      return validArrays;
    }
  }
}

export const execSchema = makeExecutableSchema({
  typeDefs: [
    ...scalarTypeDefs,
    typeDefs
  ], 
  resolvers: {
    ...scalarResolvers,
    ...resolvers
  }
})

/*const mockedSchema = addMocksToSchema({
  schema, 
  mocks: {
    ...scalarMocks
  }
}) */