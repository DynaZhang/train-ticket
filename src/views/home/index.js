import React from 'react';
import './style.styl';

import HeaderComponent from "../../components/Header";
import DepartDateComponent from "./DepartDate";
import HighSpeedComponent from "./HighSpeed";
import JourneyComponent from "./Journey";
import SubmitComponent from "./Submit";

function HomePage(props) {
  return (
    <div>
      <DepartDateComponent />
      <HighSpeedComponent />
      <JourneyComponent />
      <SubmitComponent />
    </div>
  )
}

export default HomePage;
