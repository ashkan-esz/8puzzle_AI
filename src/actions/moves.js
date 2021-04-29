import CODE_KEY from '../constants/keys';
import helpers from './_helpersMove';

const SHIFT = {
    LEFT: {x: 1, y: 0},
    RIGHT: {x: -1, y: 0},
    UP: {x: 0, y: 1},
    DOWN: {x: 0, y: -1}
}

function verifyMove(shift) {
    return {type: 'VERIFY_MOVE', shift}
}

function setMove() {
    return {type: 'SET_MOVE'}
}

function solving(bool) {
    return {type: 'SOLVING', bool}
}

function solvingData(solvingData) {
    return {type: 'SOLVING_DATA', solvingData}
}

function computing(bool) {
    return {type: 'COMPUTING', bool}
}

function searchMethod(method) {
    return {type: 'SEARCH_METHOD', method}
}

function reset() {
    return {type: 'RESET'}
}

function goReset() {
    return (dispatch, getState) => {
        const {
            moves: {isSolving}
        } = getState()

        if (!isSolving) {
            dispatch(reset())
        } else {
            console.log("Is Solving! You can't reset now!");
        }
    }
}

function start() {
    return async (dispatch, getState) => {
        const {
            moves: {gridData, isSolving, searchMethod},
        } = getState();
        console.log(gridData, isSolving, ' => ', searchMethod);

        if (!isSolving) {
            dispatch(computing(true));
            dispatch(solvingData(null));
            let solveData;
            await new Promise(resolve => {
                setTimeout(() => {
                    solveData = helpers.solveGrid(gridData, searchMethod);
                    resolve();
                }, 500);
            })
            dispatch(computing(false));
            console.log(solveData)
            dispatch(solvingData(solveData));

            return new Promise(resolve => {
                let i = 0
                dispatch(solving(true));
                const exec = setInterval(function () {
                    if (i === solveData.moves.length) {
                        clearInterval(exec);
                        dispatch(solving(false));
                        resolve();
                    }
                    // eslint-disable-next-line default-case
                    switch (solveData.moves[i++]) {
                        case CODE_KEY.LEFT:
                            dispatch(goLeft());
                            break
                        case CODE_KEY.RIGHT:
                            dispatch(goRight());
                            break
                        case CODE_KEY.UP:
                            dispatch(goUp());
                            break
                        case CODE_KEY.DOWN:
                            dispatch(goDown());
                            break
                    }
                }, 260)
            })
        } else {
            console.log('ALREADY SOLVING! :D');
        }
    }
}

function go(shift) {
    return (dispatch, getState) => {

        dispatch(verifyMove(shift));

        const {
            moves: {canAnimate}
        } = getState();

        if (canAnimate) {
            dispatch(setMove())
        }
    }
}

const goRight = () => go(SHIFT.RIGHT)
const goLeft = () => go(SHIFT.LEFT)
const goDown = () => go(SHIFT.DOWN)
const goUp = () => go(SHIFT.UP)

export default {
    goLeft,
    goRight,
    goUp,
    goDown,
    goReset,
    start,
    searchMethod,
}
