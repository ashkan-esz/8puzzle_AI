import React, {useEffect} from 'react';
import styled from "styled-components/macro";
import {connect} from 'react-redux';
import movesAction from './actions/moves';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
// Components ==================
import Grid from './components/GridSquares';
import Button from './components/Button';
import ButtonSet from './components/ButtonSet';
import Title from './components/Title';
import Hint from './components/Hint';
// Assets ======================
import playIcon from './assets/icons/play.svg';
import resetIcon from './assets/icons/reset.svg';
import titleImg from './assets/imgs/title.svg';
import hintImg from './assets/imgs/hint.svg';

import CODE_KEY from './constants/keys';

const _keyHandler = (event, state, callback) => {
    const code = event.keyCode !== 0 ? event.keyCode : event.charCode;
    if (!state.isSolving) {
        callback(code)
    } else {
        console.log('STOP!')
    }
}

const _resolveCode = (code, actions) => {
    switch (code) {
        case CODE_KEY.LEFT:
        case CODE_KEY.A:
            actions.goRight();
            break;
        case CODE_KEY.W:
        case CODE_KEY.UP:
            actions.goDown();
            break;
        case CODE_KEY.D:
        case CODE_KEY.RIGHT:
            actions.goLeft();
            break;
        case CODE_KEY.S:
        case CODE_KEY.DOWN:
            actions.goUp();
            break;
        case CODE_KEY.ENTER:
            actions.start();
            break;
        default:
            console.log(code);
    }
}

const App = ({
                 className,
                 start,
                 reset,
                 goDown,
                 goLeft,
                 goRight,
                 goUp,
                 setSearchMethod,
                 grid,
                 isSolving,
                 isComputing,
                 solvingData,
                 searchMethod
             }) => {
    const actions = {
        start, reset, goLeft, goRight, goUp, goDown
    }

    const resolveCode = (code) => _resolveCode(code, actions)

    useEffect(() => {
        const keyHandler = (e) => _keyHandler(e, {isSolving}, resolveCode)
        document.addEventListener('keydown', keyHandler)
        return () => document.removeEventListener('keydown', keyHandler)
    }, []);

    return (
        <div className={className}>
            <div className='mid'>
                <Title img={titleImg}/>
                <Grid grid={grid} squareShift={90}/>

                <ButtonSet margin={5}>
                    <Button
                        icon={''}
                        active={searchMethod === 'bfs'}
                        onClick={() => {
                            setSearchMethod('bfs');
                        }}> BFS </Button>
                    <Button
                        icon={''}
                        active={searchMethod === 'ids'}
                        onClick={() => {
                            setSearchMethod('ids');
                        }}> IDS </Button>
                    <Button
                        icon={''}
                        active={searchMethod === 'mutate'}
                        onClick={() => {
                            setSearchMethod('mutate');
                        }}> MUTATE </Button>
                </ButtonSet>

                <ButtonSet margin={10}>
                    <Button icon={playIcon} onClick={start}/>
                    <Button icon={resetIcon} onClick={reset}/>
                </ButtonSet>

            </div>
            <Hint text='Moves' img={hintImg} className='hint'/>
            {
                isComputing && <div className={'loaderContainer'}>
                    <Loader
                        type="BallTriangle"
                        color="#00BFFF"
                        height={100}
                        width={100}
                    />
                </div>
            }
            {
                solvingData && <div className={'pathContainer'}>
                    <h1> {solvingData.path.replace(/,/g, ' , ')} </h1>
                </div>
            }
        </div>
    )
};

// Redux ===================================
const mapStateToProps = state => ({
    grid: state.moves.grid,
    isSolving: state.moves.isSolving,
    isComputing: state.moves.isComputing,
    solvingData: state.moves.solvingData,
    searchMethod: state.moves.searchMethod,
})

const mapDispatchToProps = dispatch => ({
    goLeft: () => dispatch(movesAction.goLeft()),
    goRight: () => dispatch(movesAction.goRight()),
    goDown: () => dispatch(movesAction.goDown()),
    goUp: () => dispatch(movesAction.goUp()),
    start: () => dispatch(movesAction.start()),
    reset: () => dispatch(movesAction.goReset()),
    setSearchMethod: (method) => dispatch(movesAction.searchMethod(method))
})

const _App = connect(
    mapStateToProps,
    mapDispatchToProps
)(App)


// Styles ==================================
const AppStyled = styled(_App)`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  flex-direction: row;

  .mid {
    width: 400px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    margin-left: 100px;
  }

  .hint {
    margin-top: 140px;
  }

  @media (max-width: 640px) {
    .mid {
      margin-left: 0;
    }

    .hint {
      padding: 0 100px;
      clear: both;
      width: 100px;
      margin-top: 20px;
    }
  }

  .name {
    text-align: center;
    width: 100%;
  }

  @media (max-width: 480px) {
    .mid {
      width: 300px;
    }
  }

  .loaderContainer {
    justify-content: center;
    align-items: center;
    text-align: center;
    width: 100vw;
    margin-top: 20px;
  }

  .pathContainer {
    flex-wrap: wrap;
    flex-direction: row;
    width: 70vw;
  }
`;

export default AppStyled;
