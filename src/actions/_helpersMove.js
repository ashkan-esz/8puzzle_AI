import CODE_KEY from '../constants/keys'
import {startAStareSearch, startBfsSearch, startIdsSearch, startMutateSearch} from "../search/bfs_ids_mutate";

const symbolToMove = s => {
    // eslint-disable-next-line default-case
    switch (s) {
        case 'up':
        case '^':
            return CODE_KEY.DOWN;
        case 'down':
        case 'v':
            return CODE_KEY.UP;
        case 'left':
        case '<':
            return CODE_KEY.RIGHT;

        case 'right':
        case '>':
            return CODE_KEY.LEFT;
    }
}

const solveGrid = (grid, searchMethod) => {
    let result;
    if (searchMethod === 'bfs') {
        result = startBfsSearch(grid);
    } else if (searchMethod === 'ids') {
        result = startIdsSearch(grid);
    } else if (searchMethod === 'mutate') {
        result = startMutateSearch(grid);
    } else {
        result = startAStareSearch(grid);
    }

    return {
        ...result,
        moves: result.path.split(',').map(move => symbolToMove(move.trim()))
    }
}

const helpers = {
    solveGrid
}

export default helpers;
