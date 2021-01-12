import React, { useCallback } from "react";
import {BrowserRouter as Router,Route} from 'react-router-dom';
import HomePage from './views/home';
import './App.css';
import HeaderComponent from "./components/Header";
import store from "./store";
import {Provider} from "react-redux";


function App() {
  const handleBack = useCallback(() => {
    window.history.back()
  }, [])
  return (
    <Provider store={store}>
      <div className="App">
        <HeaderComponent title={"首页"} onBack={handleBack}/>
        <Router>
          <Route exact path={'/'} component={HomePage} />
        </Router>
      </div>
    </Provider>
  );
}

export default App;
