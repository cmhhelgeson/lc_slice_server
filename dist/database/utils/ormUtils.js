import { ProblemInfoORM } from "../entities/problemInfo.js";
export const createProblemInfoORM = ({ problemNumber, title, description, dataTypes }) => {
    const problem = new ProblemInfoORM();
    problem.problemNumber = problemNumber;
    problem.title = title;
    problem.description = description;
    problem.numExamples = 0;
    return problem;
};
