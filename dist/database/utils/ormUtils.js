import { ProblemInfoORM } from "../entities/problemInfo.js";
import { ValidTypes } from "../../__generated__/resolvers-types.js";
export const createProblemInfoORM = ({ problemNumber, title, description, dataTypes }) => {
    const problem = new ProblemInfoORM();
    problem.problemNumber = problemNumber;
    problem.title = title;
    problem.description = description;
    problem.hasGraphs = dataTypes.includes(ValidTypes.Graph);
    problem.hasArrays = dataTypes.includes(ValidTypes.Array);
    problem.hasGrids = dataTypes.includes(ValidTypes.Grid);
    problem.numExamples = 0;
    return problem;
};
