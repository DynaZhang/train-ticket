import React from "react";
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {Provider} from "react-redux";
import './App.styl';
import HomePage from './views/home';
import store from "./store";
import QueryPage from "./views/query";


function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <div className={"container-wrapper"}>
          <Router>
            <Route exact path={'/'} component={HomePage} />
            <Route exact path={'/query'} component={QueryPage} />
          </Router>
        </div>
      </div>
    </Provider>
  );
}

export default App;
