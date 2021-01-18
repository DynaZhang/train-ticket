import {
  ACTION_SET_CITY_DATA,
  ACTION_SET_TO,
  ACTION_SET_CURRENT_SELECTING_LEFT_CITY,
  ACTION_SET_FROM,
  ACTION_SET_HIGH_SPEED,
  ACTION_SET_IS_CITY_SELECTOR_VISIBLE,
  ACTION_SET_IS_DATE_SELECTOR_VISIBLE,
  ACTION_SET_IS_LOADING_CITY_DATA, ACTION_SET_DEPART_DATE
} from './actionTypes'

const defaultStore = {
  from: '北京',
  to: '上海',
  isCitySelectorVisible: false,
  currentSelectingLeftCity: false,
  cityData: null,
  isLoadingCityData: false,
  isDateSelectorVisible: false,
  departDate: 0,
  highSpeed: false
}

const reducer = (state=defaultStore, action) => {
  const {type, payload} = action
  const newState = JSON.parse(JSON.stringify(state))
  switch (type) {
    case ACTION_SET_FROM: newState.from = payload; break;
    case ACTION_SET_TO: newState.to = payload; break;
    case ACTION_SET_IS_CITY_SELECTOR_VISIBLE: newState.isCitySelectorVisible = payload; break;
    case ACTION_SET_CURRENT_SELECTING_LEFT_CITY: newState.currentSelectingLeftCity = payload; break;
    case ACTION_SET_CITY_DATA: newState.cityData = payload; break;
    case ACTION_SET_IS_LOADING_CITY_DATA: newState.isLoadingCityData = payload; break;
    case ACTION_SET_IS_DATE_SELECTOR_VISIBLE: newState.isDateSelectorVisible = payload; break;
    case ACTION_SET_HIGH_SPEED: newState.highSpeed = payload; break;
    case ACTION_SET_DEPART_DATE: newState.departDate = payload; break;
    default: break;
  }
  return newState
}

export default reducer;
