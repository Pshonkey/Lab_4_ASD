"use strict";

const randm = (n) => {

    Math.seedrandom(3220);

    let matrix = [];

    for (let i = 0; i < n; i++) {
        let row = [];
        for (let j = 0; j < n; j++) {
            let randomNumber = Math.random() * 2.0;
            row.push(randomNumber);
        }
        matrix.push(row);
    }

    return matrix;
};

const mulmr = (matrix, k) => {

    const result = [];

    for (let i = 0; i < matrix.length; i++) {
        let row = [];
        for (let j = 0; j < matrix[i].length; j++) {
            row.push(matrix[i][j] * k);
            row[j] = row[j] < 1 ? 0 : 1;
        }
        result.push(row);
    }

    return result;
};

const printMatrix = (matrix) => {

    let result = "";
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            result += matrix[i][j] + " ";
        }
        console.log(result);
        result = "";
    }
};

const adjMatrixUnOrGr = (matrix) => {
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            if (matrix[i][j] === 1) matrix [j][i] = 1;
        }
    }
    return matrix;
};

const n3 = 2, n4 = 0;
const n = 10 + n3;
const k1 = 1.0 - n3 * 0.01 - n4 * 0.01 - 0.3

let randomMatrix = randm(n);

let matrixOr = mulmr(randomMatrix, k1); //матриця суміжності орієнтованого графа
console.log('Adjacency matrix for oriented graph #1: ');
printMatrix(matrixOr);

const matrixUnOr = adjMatrixUnOrGr(mulmr(randomMatrix, k1)); //матриця суміжності неорієнтованого графа
console.log('Adjacency matrix for unoriented graph #1: ');
printMatrix(matrixUnOr);

const RADIUS_OF_GRAPH = 200;
const GRAPH_CENTER_X = 300;
const GRAPH_CENTER_Y = 300;
const RADIUS = 20;

class Point {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.index = index;
    }
}

const getArrayOfVertices = () => {
    const vertices = [];
    for (let i = 0; i < n; i++) {
        const angle = Math.PI - Math.PI / 6 * i;
        const x = RADIUS_OF_GRAPH * Math.cos(angle) + GRAPH_CENTER_X;
        const y = RADIUS_OF_GRAPH * Math.sin(angle) + GRAPH_CENTER_Y;
        const vertex = new Point(x, y, i);
        vertices.push(vertex);
    }
    return vertices;
};

const ARRAY_VERTICES = getArrayOfVertices();
const getVertex = (index) => {
    for (let i = 0; i < ARRAY_VERTICES.length; i++) {
        if (i === index) {
            return new Point(ARRAY_VERTICES[i].x, ARRAY_VERTICES[i].y, i);

        }
    }
};

const fillVertex = (point1, point2, context) => {
    context.beginPath();
    context.arc(point1.x, point1.y, RADIUS, 0, 2 * Math.PI, true);
    context.stroke();
    context.fillStyle = 'white';
    context.fill();
    context.font = "14px Arial";
    context.fillStyle = "black";
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillText(point1.index + 1, point1.x, point1.y);
    context.beginPath();
    context.arc(point2.x, point2.y, RADIUS, 0, 2 * Math.PI, true);
    context.stroke();
    context.fillStyle = 'white';
    context.fill();
    context.font = "14px Arial";
    context.fillStyle = "black";
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillText(point2.index + 1, point2.x, point2.y);
};

const drawLoop = (point, context, isOriented) => {
    const angle = Math.PI + point.index * Math.PI / 6;
    let x1 = point.x + 2 * RADIUS * Math.cos(angle);
    let y1 = point.y - 2 * RADIUS * Math.sin(angle);
    const newPoint = new Point(x1, y1, point.index);
    context.beginPath();
    context.arc(x1, y1, RADIUS, 0, 2 * Math.PI, true);
    context.stroke();
    if (isOriented) drawArrowheadLoop(newPoint, context);
};
const drawArrowheadLoop = (point, context) => {

    const Agl = Math.PI / 8 - point.index * (Math.PI / 6);
    const x2 = point.x + RADIUS * Math.cos(Agl);
    const y2 = point.y + RADIUS * Math.sin(Agl);
    context.beginPath();
    context.moveTo(x2, y2);
    context.lineTo(x2 + 10 * Math.cos(Agl + Math.PI / 3), y2 + 10 * Math.sin(Agl + Math.PI / 3)); // right
    context.moveTo(x2, y2);
    context.lineTo(x2 - 10 * Math.cos(Agl - Math.PI / 4), y2 - 10 * Math.sin(Agl - Math.PI / 4)); // left
    context.stroke();
};

const drawEdge = (point1, point2, context) => {
    context.beginPath();
    context.moveTo(point1.x, point1.y);
    context.lineTo(point2.x, point2.y);
    context.stroke();
    fillVertex(point1, point2, context);
};
const drawArrowheadForEdges = (point1, point2, context) => {
    const angle = Math.atan2(point2.y - point1.y, point2.x - point1.x);
    let Agl;
    if (point2.y >= point1.y) {
        Agl = angle;
        const x2 = point2.x - RADIUS * Math.cos(Agl);
        const y2 = point2.y - RADIUS * Math.sin(Agl);
        context.beginPath();
        context.moveTo(x2, y2);
        context.lineTo(x2 - 10 * Math.cos(Agl - Math.PI / 6), y2 - 10 * Math.sin(Agl - Math.PI / 6));
        context.moveTo(x2, y2);
        context.lineTo(x2 - 10 * Math.cos(Agl + Math.PI / 6), y2 - 10 * Math.sin(Agl + Math.PI / 6));
        context.stroke();
    } else {
        Agl = angle + Math.PI;
        const x2 = point2.x + RADIUS * Math.cos(Agl);
        const y2 = point2.y + RADIUS * Math.sin(Agl);
        context.beginPath();
        context.moveTo(x2, y2);
        context.lineTo(x2 + 10 * Math.cos(Agl - Math.PI / 6), y2 + 10 * Math.sin(Agl - Math.PI / 6));
        context.moveTo(x2, y2);
        context.lineTo(x2 + 10 * Math.cos(Agl + Math.PI / 6), y2 + 10 * Math.sin(Agl + Math.PI / 6));
        context.stroke();
    }
};

const drawArc = (point1, point2, context) => {
    const angle = Math.atan((point2.y - point1.y) / (point2.x - point1.x));
    let x0 = RADIUS * Math.cos((Math.PI / 2 - angle));
    let y0 = RADIUS * Math.sin((Math.PI / 2 - angle));
    let x;
    let y;
    if (point1.y > 300 && point2.x <= 300 || point1.y <= 300 && point2.x > 300) {
        x = (point1.x + point2.x) / 2 - 2 * x0;
        y = (point1.y + point2.y) / 2 + 2 * y0;
    } else {
        x = (point1.x + point2.x) / 2 + 2 * x0;
        y = (point1.y + point2.y) / 2 + 2 * y0;
    }
    context.beginPath();
    context.moveTo(point1.x, point1.y);
    context.lineTo(x, y);
    context.lineTo(point2.x, point2.y);
    context.stroke();
    const medium = new Point(x, y, 12);
    fillVertex(point1, point2, context);
    drawArrowheadArcs(medium, point2, context);
};
const drawArrowheadArcs = (point0, point2, context) => {
    const angle = Math.atan2(point2.y - point0.y, point2.x - point0.x);
    let Agl;
    if (point2.y >= point0.y) {
        Agl = angle;
        const x2 = point2.x - RADIUS * Math.cos(Agl);
        const y2 = point2.y - RADIUS * Math.sin(Agl);
        context.beginPath();
        context.moveTo(x2, y2);
        context.lineTo(x2 - 10 * Math.cos(Agl - Math.PI / 6), y2 - 10 * Math.sin(Agl - Math.PI / 6));
        context.moveTo(x2, y2);
        context.lineTo(x2 - 10 * Math.cos(Agl + Math.PI / 6), y2 - 10 * Math.sin(Agl + Math.PI / 6));
        context.stroke();
    } else {
        Agl = angle + Math.PI;
        const x2 = point2.x + RADIUS * Math.cos(Agl);
        const y2 = point2.y + RADIUS * Math.sin(Agl);
        context.beginPath();
        context.moveTo(x2, y2);
        context.lineTo(x2 + 10 * Math.cos(Agl - Math.PI / 6), y2 + 10 * Math.sin(Agl - Math.PI / 6));
        context.moveTo(x2, y2);
        context.lineTo(x2 + 10 * Math.cos(Agl + Math.PI / 6), y2 + 10 * Math.sin(Agl + Math.PI / 6));
        context.stroke();
    }
};

const drawOrientedGraph = () => {
    const canvas = document.getElementById("canvas");
    const context = canvas.getContext("2d");
    const isOriented = true;
    let index = 0;
    const drawVertex = () => {
        const vertex = getVertex(index);
        context.fillStyle = "white";
        context.beginPath();
        context.arc(vertex.x, vertex.y, RADIUS, 0, Math.PI * 2, true);
        context.stroke();
        context.fill();
        index++;
        context.font = "14px Arial";
        context.fillStyle = "black";
        context.textAlign = "center";
        context.textBaseline = "middle";
        context.fillText(index, vertex.x, vertex.y);
        if (index === n) {
            clearInterval(interval_id);
        }
        if (index === n) { // Check if all vertices are drawn
            let j = 0;
            let i = 0;
            const interval_ID = setInterval(() => {
                const vertex1 = getVertex(i);
                const vertex2 = getVertex(j);
                if (i === j && matrixOr[i][j]) {
                    drawLoop(vertex1, context, isOriented);
                    j++;
                } else if (i < j && matrixOr[i][j]) {
                    drawEdge(vertex1, vertex2, context);
                    drawArrowheadForEdges(vertex1, vertex2, context);
                    j++;
                } else if (matrixOr[i][j] && matrixOr[j][i]) {
                    drawArc(vertex1, vertex2, context, isOriented);
                    j++;
                } else if (matrixOr[i][j] && i > j) {
                    drawEdge(vertex1, vertex2, context);
                    drawArrowheadForEdges(vertex1, vertex2, context);
                    j++;
                } else j++;
                if (j === n) {
                    i++;
                    j = 0;
                }
                if (i === n) {
                    clearInterval(interval_ID);
                }
            }, 50);
        }
    };
    const interval_id = setInterval(drawVertex, 50);
};
drawOrientedGraph();

const drawUnorientedGraph = () => {
    const canvas = document.getElementById("canvas2");
    const context = canvas.getContext("2d");
    let index = 0;
    const isOriented = false;
    const drawVertex = () => {
        const vertex = getVertex(index);
        context.fillStyle = "white";
        context.beginPath();
        context.arc(vertex.x, vertex.y, RADIUS, 0, Math.PI * 2, true);
        context.stroke();
        context.fill();
        index++;
        context.font = "14px Arial";
        context.fillStyle = "black";
        context.textAlign = "center";
        context.textBaseline = "middle";
        context.fillText(index, vertex.x, vertex.y);
        if (index === n) {
            clearInterval(interval_id);
        }
        if (index === n) { // Check if all vertices are drawn
            let j = 0;
            let i = 0;
            const interval_ID = setInterval(() => {
                const vertex1 = getVertex(i);
                const vertex2 = getVertex(j);
                if (i === j && matrixOr[i][j]) {
                    drawLoop(vertex1, context, isOriented);
                    j++;
                } else if (i < j && matrixOr[i][j]) {
                    drawEdge(vertex1, vertex2, context);
                    j++;
                } else if (matrixOr[i][j] && matrixOr[j][i]) {
                    j++;
                } else if (matrixOr[i][j] && i > j) {
                    drawEdge(vertex1, vertex2, context);
                    j++;
                } else j++;
                if (j === n) {
                    i++;
                    j = 0;
                }
                if (i === n) {
                    clearInterval(interval_ID);
                }
            }, 50);
        }
    };
    const interval_id = setInterval(drawVertex, 50);
};
drawUnorientedGraph();

// lab 4 code ---------------------------------------------------------------------------------------------
const sumOfRows = (index, matrix, isOriented) => {

    let result = 0;
    for (let j = 0; j < matrix[index].length; j++) {
        if (matrix[index][j]) result++;
        if (!isOriented) if (j === index && matrix[j][index]) result++;
    }
    return result;
};

const sumOfColumns = (index, matrix) => {

    let result = 0;
    for (let j = 0; j < matrix[index].length; j++) {
        if (matrix[j][index]) result++;
    }

    return result;
};

console.log("Unoriented graph #1");
const getArrDegreesUnOr = (array, matrix) => {
    let degrees = [];
    for (const vertex of array) {

        const number = vertex.index + 1;
        console.log("Degree of vertex " + number + " - " + sumOfRows(vertex.index, matrix, false) + "\n");
        degrees.push(sumOfRows(vertex.index, matrix, false));

    }

    return array;
};
const arrayOfDegs1 = getArrDegreesUnOr(ARRAY_VERTICES, matrixUnOr);

const getInOutDegs = (numOfGr, matrix, array) => {

    let degrees = [];
    console.log("\n");
    console.log("Semi-degree of orgraph " + numOfGr);
    for (const vertex of array) {

        const number = vertex.index + 1;
        console.log("\n");
        console.log("Exit degree of vertex " + number + " - " + sumOfRows(vertex.index, matrix, true));
        console.log("Entry deg of vertex " + number + " - " + sumOfColumns(vertex.index, matrix));
        degrees.push([sumOfRows(vertex.index, matrix, true), sumOfColumns(vertex.index, matrix)]);

    }
    return degrees;
}
getInOutDegs(1, matrixOr, ARRAY_VERTICES);

console.log('\n');
const isRegular = (num, array) => {

    if (array[0] === array[1]) console.log('Graph ' + num + ' is regular');
    else {
        console.log('Graph ' + num + " isn't regular");
    }

};
isRegular(1, arrayOfDegs1);

const getIsolatedVertex = (matrix, numOfGr) => {

    let checker = 0;
    let vertices = "";
    for (let i = 0; i < matrix.length; i++) {
        if (!sumOfRows(i, matrix, true) && !sumOfColumns(i, matrix)) {
            const num = i++;
            vertices += num + " "
            checker++;
        }
    }
    if (!checker) console.log("There are no isolated vertices in graph #" + numOfGr);
    else {
        console.log("In Graph #" + numOfGr);
        console.log('Isolated vertices are: ' + vertices);
    }
};
getIsolatedVertex(matrixOr, 1);

const getHangingVertex = (matrix, numOfGr) => {

    let checker = 0;
    let vertices = "";
    for (let i = 0; i < matrix.length; i++) {
        if (sumOfRows(i, matrix, true) === 1 && sumOfColumns(i, matrix) === 1) {
            const num = i++;
            vertices += num + " "
            checker++;
        }
    }
    if (!checker) console.log("There are no hanging vertices in graph #" + numOfGr);
    else {
        console.log("In Graph #" + numOfGr);
        console.log('Hanging vertices are: ' + vertices);
    }
};
getHangingVertex(matrixOr, 1);

// ------------------------------------------------------------------------------------------------------------------

const k2 = 1.0 - n3 * 0.005 - n4 * 0.005 - 0.27;

console.log('\n');

let matrixOr2 = mulmr(randomMatrix, k2);
console.log('Adjacency matrix for modified graph #2: ');
printMatrix(matrixOr2);

console.log("\n");
console.log('Modified graph');

const drawOrGr2 = () => {
    const canvas = document.getElementById("canvas3");
    const context = canvas.getContext("2d");
    const isOriented = true;
    let index = 0;
    const drawVertex = () => {
        const vertex = getVertex(index);
        context.fillStyle = "white";
        context.beginPath();
        context.arc(vertex.x, vertex.y, RADIUS, 0, Math.PI * 2, true);
        context.stroke();
        context.fill();
        index++;
        context.font = "14px Arial";
        context.fillStyle = "black";
        context.textAlign = "center";
        context.textBaseline = "middle";
        context.fillText(index, vertex.x, vertex.y);
        if (index === n) {
            clearInterval(interval_id);
        }
        if (index === n) { // Check if all vertices are drawn
            let j = 0;
            let i = 0;
            const interval_ID = setInterval(() => {
                const vertex1 = getVertex(i);
                const vertex2 = getVertex(j);
                if (i === j && matrixOr2[i][j]) {
                    drawLoop(vertex1, context, isOriented);
                    j++;
                } else if (i < j && matrixOr2[i][j]) {
                    drawEdge(vertex1, vertex2, context);
                    drawArrowheadForEdges(vertex1, vertex2, context);
                    j++;
                } else if (matrixOr2[i][j] && matrixOr2[j][i]) {
                    drawArc(vertex1, vertex2, context, isOriented);
                    j++;
                } else if (matrixOr2[i][j] && i > j) {
                    drawEdge(vertex1, vertex2, context);
                    drawArrowheadForEdges(vertex1, vertex2, context);
                    j++;
                } else j++;
                if (j === n) {
                    i++;
                    j = 0;
                }
                if (i === n) {
                    clearInterval(interval_ID);
                }
            }, 50);
        }
    };
    const interval_id = setInterval(drawVertex, 50);
};
drawOrGr2();

getInOutDegs(2, matrixOr2, ARRAY_VERTICES);

const matrixMultiply = (matrix1, matrix2) => {

    let result = [];
    for (let i = 0; i < matrix1.length; i++) { // множення рядків на стовпці
        let row = [];
        for (let j = 0; j < matrix2.length; j++) { //множення рядка на стовпці
            let sum = 0;
            for (let k = 0; k < matrix2.length; k++) { //множення елементів і їх сумування
                sum += matrix1[i][k] * matrix2[k][j];
            }
            row.push(sum);
        }
        result.push(row);
    }
    return result;
};

const matrixOr2Twice = matrixMultiply(matrixOr2, matrixOr2);
console.log("Second degree matrix");
console.log(matrixOr2Twice);
const getPaths2 = (matrixAdj, matrixSquare) => {

    const paths = [];
    for (let i = 0; i < matrixSquare.length; i++) {
        for (let j = 0; j < matrixSquare.length; j++) {
            if (matrixSquare[i][j] > 0) {
                for (let k = 0; k < matrixAdj.length; k++) {
                    if (matrixAdj[i][k] && matrixAdj[k][j]) {
                        const first = i + 1;
                        const second = k + 1;
                        const third = j + 1;
                        paths.push([first, second, third]);
                    }
                }
            }
        }
    }
    return paths;
};

const TWO_PATHS = getPaths2(matrixOr2, matrixOr2Twice);
const printPaths = (arrayOfPaths) => {
    let stpath = "";
    let counter = 0;
    for (let path of arrayOfPaths) {
        stpath += " ( " + path + " ) ";
        counter++;
        if (counter === 5) {
            console.log(stpath);
            stpath = "";
            counter = 0;
        }
    }
};
console.log("\n Paths with length 2: ");
printPaths(TWO_PATHS);

const matrixOr2Cube = matrixMultiply(matrixOr2Twice, matrixOr2);
console.log("Third degree matrix");
console.log(matrixOr2Cube);
const getPaths3 = (matrixAdj, matrixSquare, matrixCube) => {
    const paths = [];
    for (let i = 0; i < matrixSquare.length; i++) {
        for (let j = 0; j < matrixSquare.length; j++) {
            if (matrixCube[i][j] > 0) {
                for (let k = 0; k < matrixSquare.length; k++) {
                    if (matrixSquare[i][k]) {
                        for (let m = 0; m < matrixSquare.length; m++) {
                            if (matrixSquare[k][m] && matrixSquare[m][j] && matrixAdj[i][k] && matrixAdj[k][m] && matrixAdj[m][j]) {
                                const first = i + 1;
                                const second = k + 1;
                                const third = m + 1;
                                const fourth = j + 1;
                                paths.push([first, second, third, fourth]);
                            }
                        }
                    }
                }
            }
        }
    }
    return paths;
};

const THREE_PATHS = getPaths3(matrixOr2, matrixOr2Twice, matrixOr2Cube);
console.log('\nPaths with length 3: ');
printPaths(THREE_PATHS);

const matrixSum = (matrix1, matrix2) => {

    let result = [];
    for (let i = 0; i < matrix1.length; i++) {
        let row = [];
        for (let j = 0; j < matrix1.length; j++) {
            row.push(matrix1[i][j] + matrix2[i][j]);
        }
        result.push(row);
    }
    return result;
};
const boolCorrection = (matrix) => {
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            if (matrix[i][j] > 0) matrix[i][j] = 1;
        }
    }
    return matrix;
};

let I = [];
for (let i = 0; i < n; i++) {
    let row = [];
    for (let j = 0; j < n; j++) {
        row.push(i === j ? 1 : 0);
    }
    I.push(row);
} //Get identity matrix;

const getReachabilityMatrix = (matrixAdj) => {

    let matrixReach = matrixAdj;
    let sum = matrixAdj;
    for (let c = 0; c < n; c++) {
        matrixReach = matrixMultiply(matrixReach, matrixAdj);
        sum = matrixSum(sum, matrixReach);
    }
    matrixReach = matrixSum(sum, I);
    matrixReach = boolCorrection(matrixReach);

    return matrixReach;
};
const reachabilityMatrix = getReachabilityMatrix(matrixOr2);
console.log('Reachability matrix:');
console.log(reachabilityMatrix);

const transposeMatrix = (matrix) => {

    let result = [];
    for (let i = 0; i < matrix.length; i++) {
        let column = [];
        for (let j = 0; j < matrix.length; j++) {
            column.push(matrix[j][i]);
        }
        result.push(column);
    }

    return result;
};

const transReachMatrix = transposeMatrix(reachabilityMatrix);

let connectedMatrix = matrixMultiply(reachabilityMatrix, transReachMatrix);
connectedMatrix = boolCorrection(connectedMatrix);

console.log('\nConnected matrix:');
console.log(connectedMatrix);

let isVisited = new Array(12).fill(false);

let destination = [];
for (let i = 0; i < n; i++) {
    let row = [];
    for (let j = 0; j < n; j++) {
        if (connectedMatrix) row.push(j + 1);
    }
    destination.push(row);
} //get list of visited vertices from each vertex

let unvisitedVertex = [1];
const checkIfAllVisited = () => {
    for (const vertex of isVisited)
        if (!vertex) {
            unvisitedVertex.push(vertex);
            return false;
        }
    return true;
};

let componentsNums = [];
for (let i = 0; i < destination.length; i++) {
    if (!checkIfAllVisited()) {
        console.log('Component №' + destination[i][i]);
        let str = '';
        for (let j = 0; j < destination[i].length; j++) {
            if (!isVisited[j]) {
                str += destination[i][j] + ' ';
                isVisited[j] = true;
            }
        }
        componentsNums.push(i + 1);
        console.log(str + '\n');
    }
}
//____________________________________________________________________________________________________________

const getCondensationMatrix = (components) => {

    let result = [];
    for (let i = 0; i < components.length; i++) {
        let row = [];
        for (let j = 0; j < components.length; j++) {
            if (matrixOr2[i][j] && i !== j) row.push(1);
            else row.push(0);
        }
        result.push(row);
    }
    return result;
};

const condensationMatrix = getCondensationMatrix(componentsNums);
console.log('\nCondensation matrix:');
printMatrix(condensationMatrix);

const getArrayOfVertices2 = (matrix) => {
    const vertices = [];
    for (let i = 0; i < matrix.length; i++) {
        const angle = Math.PI - Math.PI / 6 * i;
        const x = RADIUS_OF_GRAPH * Math.cos(angle) + GRAPH_CENTER_X;
        const y = RADIUS_OF_GRAPH * Math.sin(angle) + GRAPH_CENTER_Y;
        const vertex = new Point(x, y, i);
        vertices.push(vertex);
    }
    return vertices;
};
const getVertex2 = (index, array) => {
    for (let i = 0; i < array.length; i++) {
        if (i === index) {
            return new Point(array[i].x, array[i].y, i);
        }
    }
};

const drawCodensationGraph = () => {
    const canvas = document.getElementById("canvas4");
    const context = canvas.getContext("2d");
    const ARRAY_V = getArrayOfVertices2(condensationMatrix);
    const isOriented = true;
    let index = 0;
    const drawVertex = () => {
        const vertex = getVertex2(index, ARRAY_V);
        context.fillStyle = "white";
        context.beginPath();
        context.arc(vertex.x, vertex.y, RADIUS, 0, Math.PI * 2, true);
        context.stroke();
        context.fill();
        index++;
        context.font = "14px Arial";
        context.fillStyle = "black";
        context.textAlign = "center";
        context.textBaseline = "middle";
        context.fillText(index, vertex.x, vertex.y);
        if (index === ARRAY_V.length) {
            clearInterval(interval_id);
        }
        if (index === condensationMatrix.length) { // Check if all vertices are drawn
            let j = 0;
            let i = 0;
            const interval_ID = setInterval(() => {
                const vertex1 = getVertex2(i, ARRAY_V);
                const vertex2 = getVertex2(j, ARRAY_V);
                if (i === j && condensationMatrix[i][j]) {
                    j++;
                } else if (i < j && condensationMatrix[i][j]) {
                    drawEdge(vertex1, vertex2, context);
                    drawArrowheadForEdges(vertex1, vertex2, context);
                    j++;
                } else if (condensationMatrix[i][j] && condensationMatrix[j][i]) {
                    j++;
                } else if (condensationMatrix[i][j] && i > j) {
                    drawEdge(vertex1, vertex2, context);
                    drawArrowheadForEdges(vertex1, vertex2, context);
                    j++;
                } else j++;
                if (j === condensationMatrix.length) {
                    i++;
                    j = 0;
                }
                if (i === condensationMatrix.length) {
                    clearInterval(interval_ID);
                }
            }, 50);
        }
    };
    const interval_id = setInterval(drawVertex, 50);
};
drawCodensationGraph();