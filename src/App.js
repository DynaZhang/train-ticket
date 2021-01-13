import React, { useCallback } from "react";
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {Provider} from "react-redux";
import './App.styl';
import HomePage from './views/home';
import HeaderComponent from "./components/Header";
import store from "./store";


function App() {
  const handleBack = useCallback(() => {
    window.history.back()
  }, [])
  return (
    <Provider store={store}>
      <div className="App">
        <div className="header-wrapper">
          <HeaderComponent title={"首页"} onBack={handleBack}/>
        </div>
        <div className={"container-wrapper"}>
          <Router>
            <Route exact path={'/'} component={HomePage} />
          </Router>
        </div>
      </div>
    </Provider>
  );
}

export default App;
