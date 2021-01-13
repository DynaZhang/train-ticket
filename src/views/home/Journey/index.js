import React from "react";
import PropTypes from "prop-types";
import './style.styl';
import switchImage from '../../../assets/imgs/switch.svg'

function JourneyComponent(props) {
  const { from, to, exchangeFromTo, showCitySelector } = props
  return (
    <div className={"journey"}>
      <div className={"journey-station"} onClick={() => {showCitySelector(true)}}>
        <input type={"text"} readOnly name={"from"} value={from} className={"journey-input journey-from"} />
      </div>
      <div className={"journey-switch"} onClick={() => {exchangeFromTo()}}>
        <img src={switchImage} width={"70"} height={"40"} alt={"switch"}/>
      </div>
      <div className={"journey-station"} onClick={() => {showCitySelector(false)}}>
        <input type={"text"} readOnly name={"to"} value={to} className={"journey-input journey-to"} />
      </div>
    </div>
  )
}

JourneyComponent.propTypes = {
  from: PropTypes.string,
  to: PropTypes.string,
  exchangeFromTo: PropTypes.func,
  showCitySelector: PropTypes.func
}

export default JourneyComponent;
