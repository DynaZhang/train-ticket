import React, {useCallback, useMemo} from 'react';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import './style.styl';
import {
  exchangeFromTo,
  hideCitySelector,
  showCitySelector,
  fetchCityData,
  setSelectedCity
} from '../../store/modules/home/actions';

import DepartDateComponent from "./DepartDate";
import HighSpeedComponent from "./HighSpeed";
import JourneyComponent from "./Journey";
import SubmitComponent from "./Submit";
import CitySelectorComponent from "../../components/CitySelector";

function HomePage(props) {
  const {from, to, isCitySelectorVisible, cityData, isLoadingCityData, dispatch} = props

  const journeyCbs = useMemo(() => {
    return bindActionCreators({
      exchangeFromTo,
      showCitySelector
    }, dispatch)
  }, [])

  const citySelectorCbs = useMemo(() => {
    return bindActionCreators({
      onBack: hideCitySelector,
      fetchCityData,
      onSelect: setSelectedCity
    }, dispatch)
  }, [])

  return (
    <div className={"home-wrapper"}>
      <DepartDateComponent />
      <HighSpeedComponent />
      <JourneyComponent from={from} to={to} {...journeyCbs}/>
      <SubmitComponent />
      <CitySelectorComponent show={isCitySelectorVisible} cityData={cityData} isLoading={isLoadingCityData} {...citySelectorCbs}/>
    </div>
  )
}

export default connect(
  function mapStateToProps(state) {
    return state.home
  },
  function mapDispatchToProps(dispatch) {
    return {dispatch}
  }
)(HomePage);
