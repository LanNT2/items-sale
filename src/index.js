import React from 'react';
import ReactDOM from 'react-dom';
import Main from './Main';
import { createStore } from "redux";
import { Provider } from "react-redux";
import appReducer from './reducers/appReducer';

const store = createStore(appReducer);

ReactDOM.render(
  <Provider store={store}>
    <Main />
  </Provider>,
  document.getElementById("root")
);
