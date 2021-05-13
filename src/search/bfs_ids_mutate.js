const goalState = [
    1, 2, 3,
    4, 5, 6,
    7, 8, 0
];

export function startBfsSearch(grid) {
    let Queue = [];
    let visitedNodes = [];
    Queue.push({nodes: grid, path: "", depth: 0, g: 0, h: 0, seen: false});

    while (Queue.length > 0) {
        let visited = Queue.shift();
        visitedNodes.push(visited);

        if (checkEqualArray(visited.nodes, goalState)) {
            console.log("====== FOUND BFS");
            console.log('visitedNodes : ' + visitedNodes.length);
            return visitedNodes.pop();
        }

        let block0Index = visited.nodes.indexOf(0);
        let moves = getPossibleMoves(block0Index);
        let childNodes = getChildNodes(visited, block0Index, moves);

        for (let i = 0; i < childNodes.length; i++) {
            let nodeExist = false;
            nodeExist = checkNodeExist(Queue, childNodes[i]);
            if (!nodeExist) {
                nodeExist = checkNodeExist(visitedNodes, childNodes[i]);
            }

            if (!nodeExist) {
                Queue.push(childNodes[i]);
            }
        }
    }

}

export function startIdsSearch(grid) {
    let depthLimit = 0;
    while (true) {
        let result = startDlsSearch(grid, depthLimit);
        if (result) {
            console.log("====== FOUND IDS");
            console.log('depth : ' + depthLimit);
            return result;
        }
        depthLimit++;
    }
}

function startDlsSearch(grid, depthLimit) {
    let stack = [];
    let visitedNodes = [];
    stack.push({nodes: grid, path: "", depth: 0, g: 0, h: 0, seen: false});

    while (stack.length > 0) {
        let currentState = stack.pop();
        visitedNodes.push(currentState);
        if (checkEqualArray(currentState.nodes, goalState)) {
            return currentState;
        }

        if (currentState.depth < depthLimit) {
            let block0Index = currentState.nodes.indexOf(0);
            let moves = getPossibleMoves(block0Index);
            let childNodes = getChildNodes(currentState, block0Index, moves);

            for (let i = 0; i < childNodes.length; i++) {
                let nodeExist = false;
                for (let j = 0; j < visitedNodes.length; j++) {
                    if (checkEqualArray(childNodes[i].nodes, visitedNodes[j].nodes) &&
                        childNodes[i].depth === visitedNodes[j].depth) {
                        nodeExist = true;
                    }
                }

                if (!nodeExist) {
                    stack.push(childNodes[i]);
                }
            }
        }
    }
}

export function startMutateSearch(grid) {
    let queue1 = [];
    let queue2 = [];
    let visitedNodes1 = [];
    let visitedNodes2 = [];
    queue1.push({nodes: grid, path: "", depth: 0, g: 0, h: 0, seen: false});
    queue2.push({nodes: goalState, path: "", depth: 0, g: 0, h: 0, seen: false});

    while (queue1.length > 0 && queue2.length > 0) {

        let currentState1 = queue1.shift();
        if (!checkNodeExist(visitedNodes1, currentState1)) {
            visitedNodes1.push(currentState1);
            if (checkNodeExist(visitedNodes2, currentState1)) {
                let nodeFromQ2 = findNode(visitedNodes2, currentState1.nodes);
                let path = currentState1.path;
                let path2 = nodeFromQ2.path
                    .split(',')
                    .reverse()
                    .map(value => {
                        return value === 'up' ? 'down'
                            : value === 'down' ? 'up'
                                : value === 'right' ? 'left'
                                    : 'right';
                    })
                    .join(',');
                currentState1.path = path + ' , ' + path2;
                console.log("====== FOUND MUTATE");
                console.log('path : ' + currentState1.path);
                return currentState1;
            }
            let block0Index = currentState1.nodes.indexOf(0);
            let moves = getPossibleMoves(block0Index);
            let childNodes = getChildNodes(currentState1, block0Index, moves);
            queue1.push(...childNodes);
        }

        let currentState2 = queue2.shift();
        if (!checkNodeExist(visitedNodes2, currentState2)) {
            visitedNodes2.push(currentState2);
            if (checkNodeExist(visitedNodes1, currentState2)) {
                let nodeFromQ1 = findNode(visitedNodes1, currentState2.nodes);
                let path = nodeFromQ1.path;
                let path2 = currentState2.path
                    .split(',')
                    .reverse()
                    .map(value => {
                        return value === 'up' ? 'down'
                            : value === 'down' ? 'up'
                                : value === 'right' ? 'left'
                                    : 'right';
                    })
                    .join(',');
                nodeFromQ1.path = path + ' , ' + path2;
                console.log("====== FOUND MUTATE");
                return nodeFromQ1;
            }
            let block0Index = currentState2.nodes.indexOf(0);
            let moves = getPossibleMoves(block0Index);
            let childNodes = getChildNodes(currentState2, block0Index, moves);
            queue2.push(...childNodes);
        }

    }

}

export function startAStareSearch(grid) {
    let array = [];

    array.push({nodes: grid, path: "", depth: 0, g: 0, h: 0, seen: false});

    while (array.length > 0) {
        let bestNode = getBestNode(array);
        bestNode.seen = true;

        if (checkEqualArray(bestNode.nodes, goalState)) {
            console.log("====== FOUND A*");
            console.log('visitedNodes : ' + array.length);
            return bestNode;
        }

        let block0Index = bestNode.nodes.indexOf(0);
        let moves = getPossibleMoves(block0Index);
        let childNodes = getChildNodes(bestNode, block0Index, moves);

        for (let i = 0; i < childNodes.length; i++) {
            let nodeExist = false;
            for (let j = 0; j < array.length; j++) {
                if (checkEqualArray(childNodes[i].nodes, array[j].nodes) &&
                    childNodes[i].g + childNodes[i].h === array[j].g + array[j].h) {
                    nodeExist = true;
                }
            }

            if (!nodeExist) {
                array.push(childNodes[i]);
            }
        }
    }
}

function getBestNode(array) {
    let minNode = null;
    for (let i = 0; i < array.length; i++) {
        if (!array[i].seen) {
            if (minNode === null || array[i].g + array[i].h < minNode.g + minNode.h) {
                minNode = array[i];
            }
        }
    }
    return minNode;
}

function getChildNodes(currentState, block0Index, moves) {
    return moves.map(item => {
        let currentStateCopy = [...currentState.nodes];
        let currentPath = currentState.path;
        let currentDepth = currentState.depth;
        return swap(currentStateCopy, currentPath, currentDepth, block0Index, item.swap, item.move);
    });
}

function swap(value, currentPath, currentDepth, swapFrom, swapTo, move) {
    let temp = value[swapTo];
    value[swapTo] = 0;
    value[swapFrom] = temp;
    let newPath = currentPath ? currentPath + ',' + move : move;
    let h = getH(value);
    return {nodes: value, path: newPath, depth: currentDepth + 1, g: currentDepth + 1, h: h, seen: false};
}

function getPossibleMoves(value) {
    let places = {
        0: [{swap: 1, move: 'right'}, {swap: 3, move: 'down'}],
        1: [{swap: 0, move: 'left'}, {swap: 2, move: 'right'}, {swap: 4, move: 'down'}],
        2: [{swap: 1, move: 'left'}, {swap: 5, move: 'down'}],
        3: [{swap: 0, move: 'up'}, {swap: 4, move: 'right'}, {swap: 6, move: 'down'}],
        4: [{swap: 3, move: 'left'}, {swap: 1, move: 'up'}, {swap: 5, move: 'right'}, {swap: 7, move: 'down'}],
        5: [{swap: 4, move: 'left'}, {swap: 2, move: 'up'}, {swap: 8, move: 'down'}],
        6: [{swap: 3, move: 'up'}, {swap: 7, move: 'right'}],
        7: [{swap: 6, move: 'left'}, {swap: 4, move: 'up'}, {swap: 8, move: 'right'}],
        8: [{swap: 7, move: 'left'}, {swap: 5, move: 'up'}]
    }

    return places[value];
}

function getH(array) {
    let counter = 0;
    for (let i = 0; i < array.length; i++) {
        if (array[i] !== goalState[i]) {
            counter++;
        }
    }
    return counter;
}

function findNode(nodes, array) {
    for (let i = 0; i < nodes.length; i++) {
        if (checkEqualArray(nodes[i].nodes, array)) {
            return nodes[i];
        }
    }
    return null;
}

function checkNodeExist(nodes, checkNode) {
    for (let j = 0; j < nodes.length; j++) {
        if (checkEqualArray(nodes[j].nodes, checkNode.nodes)) {
            return true;
        }
    }
    return false;
}

function checkEqualArray(array1, array2) {
    for (let i = 0; i < array1.length; i++) {
        if (array1[i] !== array2[i]) {
            return false;
        }
    }
    return true;
}
