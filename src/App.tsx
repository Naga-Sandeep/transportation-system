import React from 'react';
import thunk from "redux-thunk";
import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import reducer from "./redux/reducer";
import Header from "./components/Header";
import ServicesDrawer from "./components/ServicesDrawer";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import ServiceInfo from "./components/ServiceInfo";
import CycleHire from "./components/CycleHire";

const initReduxDevTools = () => (
  window
    // @ts-ignore
    && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    // @ts-ignore
    && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ trace: true, traceLimit: 25 }));

const composeEnhancers = initReduxDevTools() || compose;

function App() {
  // configure middlewares
  const middlewares = [thunk];
  // compose enhancers
  const enhancer = composeEnhancers(applyMiddleware(...middlewares));
  // create store
  const store = createStore(reducer, enhancer);

  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <Header />
          <ServicesDrawer />
          <Switch>
            <Route path="/" exact component={ Home } />
            <Route path="/cycle-hire" exact component={ CycleHire } />
            <Route path="/:serviceId" component={ ServiceInfo } />
          </Switch>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
