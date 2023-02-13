export const ALTER_COLUMN_TYPE = `
  ALTER TABLE grids
  ALTER COLUMN gridid TYPE UUID;
`;
var PSQLDataType;
(function (PSQLDataType) {
    PSQLDataType["BIGINT"] = "BIGINT";
    PSQLDataType["INTEGER_ARRAY"] = "INTEGER[][]";
    PSQLDataType["SMALLINT"] = "SMALLINT";
})(PSQLDataType || (PSQLDataType = {}));
export const addColumnToGrids = (columnName, dataType) => {
    return `ALTER TABLE grids
  ADD COLUMN ${columnName} ${dataType}`;
};
export const changeDimensionsOfGrid = (width, height, pNum) => {
    return `UPDATE grids
  SET width = ${width}, height = ${height}
  WHERE problem_number = 200;
  `;
};
const genreatePSQL2DARRAY = (data) => {
    let retString = ``;
    retString += `{`;
    for (let i = 0; i < data.length; i++) {
        retString += `{`;
        for (let j = 0; j < data[0].length; j++) {
            retString += `${data[i][j]}`;
        }
        if (i !== data.length - 1) {
            retString += `}\n`;
        }
        else {
            retString += `}`;
        }
    }
};
export const createGridOnDatabase = ({ problemNumber, data, label, }) => {
    const dataArray = genreatePSQL2DARRAY(data);
    return `INSERT INTO grids
  VALUES(${problemNumber},
  '${dataArray}',
  ${data[0].length},
  ${data.length},
  '${label}'))`;
};
export const updateExamples = ({ tableName, problemNumber }) => {
    return `CREATE TEMPORARY SEQUENCE updt MINVALUE 0 START 0;
  UPDATE ${tableName} set "fromExample"=nextVal('updt') 
  WHERE "problemNumber"=${problemNumber}
  `;
};
export const deleteAllDSFromNumber = (tableName, problemNumber) => {
    return `DELETE from ${tableName} WHERE "problemNumber"=${problemNumber}`;
};
export const constrainProblemNumberAndData = (tableName) => {
    return `ALTER TABLE ${tableName} ADD CONSTRAINT UNIQUE("problemNumber", "data")`;
};
export const SQLGetDataTypeProblems = (dataTypeTable, order) => {
    return `SELECT "problemNumber", title, description, "problemId", "numExamples"
  FROM "problemInfo"
  INNER JOIN "${dataTypeTable}" USING ("problemNumber")
  GROUP BY "problemNumber", title, description, "problemId", "numExamples"
  ORDER BY "problemNumber" ${order};`;
};
