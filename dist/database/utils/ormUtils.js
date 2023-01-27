import { ProblemInfoORM } from "../entities/problemInfo.js";
import { ValidTypes } from "../../__generated__/resolvers-types.js";
export const createProblemInfoORM = ({ problemNumber, title, description, dataTypes }) => {
    const problem = new ProblemInfoORM();
    problem.problemNumber = problemNumber;
    problem.title = title;
    problem.description = description;
    problem.hasGraphs = dataTypes.includes(ValidTypes.GRAPH);
    problem.hasArrays = dataTypes.includes(ValidTypes.ARRAY);
    problem.hasGrids = dataTypes.includes(ValidTypes.GRID);
    problem.numExamples = 0;
    return problem;
};
