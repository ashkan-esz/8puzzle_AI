import React from 'react';
import ReactDOM from 'react-dom';
import {createGlobalStyle} from "styled-components/macro";
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import App from './App';
import {STYLE} from './styles';
import './index.css';
import reportWebVitals from './reportWebVitals';

const store = createStore(rootReducer, applyMiddleware(thunk));

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    background-color: ${STYLE.backgroundColor};
  }
`;

ReactDOM.render(
    <Provider store={store}>
        <React.Fragment>
            <App/>
            <GlobalStyle/>
        </React.Fragment>
    </Provider>,
    document.getElementById('root')
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
