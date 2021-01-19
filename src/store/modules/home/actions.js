import {
  ACTION_SET_CITY_DATA,
  ACTION_SET_CURRENT_SELECTING_LEFT_CITY, ACTION_SET_DEPART_DATE,
  ACTION_SET_FROM,
  ACTION_SET_HIGH_SPEED,
  ACTION_SET_IS_CITY_SELECTOR_VISIBLE,
  ACTION_SET_IS_DATE_SELECTOR_VISIBLE,
  ACTION_SET_IS_LOADING_CITY_DATA,
  ACTION_SET_TO
} from "./actionTypes";

export function setFrom(value) {
  return {
    type: ACTION_SET_FROM,
    payload: value
  }
}

export function setTo(value) {
  return {
    type: ACTION_SET_TO,
    payload: value
  }
}

export function setIsLoadingCityData(value) {
  return {
    type: ACTION_SET_IS_LOADING_CITY_DATA,
    payload: value
  }
}

export function setCityData(value) {
  return {
    type: ACTION_SET_CITY_DATA,
    payload: value
  }
}

export function setHighSpeed() {
  return (dispatch, getState) => {
    const {highSpeed} = getState().home
    dispatch({
      type: ACTION_SET_HIGH_SPEED,
      payload: !highSpeed
    })
  }
}

export function showCitySelector(value) {
  return (dispatch) => {
    dispatch({
      type: ACTION_SET_IS_CITY_SELECTOR_VISIBLE,
      payload: true
    })
    dispatch({
      type: ACTION_SET_CURRENT_SELECTING_LEFT_CITY,
      payload: value
    })
  }
}

export function hideCitySelector(value) {
  return {
    type: ACTION_SET_IS_CITY_SELECTOR_VISIBLE,
    payload: false
  }
}

export function setSelectedCity(value) {
  return (dispatch, getState) => {
    const {currentSelectingLeftCity} = getState().home
    if (currentSelectingLeftCity) {
      dispatch(setFrom(value))
    } else {
      dispatch(setTo(value))
    }
    dispatch(hideCitySelector())
  }
}

export function showDateSelector() {
  return (dispatch, getState) => {
    const {departDate} = getState().home
    dispatch({
      type: ACTION_SET_IS_DATE_SELECTOR_VISIBLE,
      payload: true
    })
    dispatch({
      type: ACTION_SET_DEPART_DATE,
      payload: departDate
    })
  }
}

export function hideDateSelector() {
  return {
    type: ACTION_SET_IS_DATE_SELECTOR_VISIBLE,
    payload: false
  }
}

export function setDepartDate(value) {
  return {
    type: ACTION_SET_DEPART_DATE,
    payload: value
  }
}

export function exchangeFromTo() {
  return (dispatch, getState) => {
    const {from, to} = getState().home
    dispatch(setFrom(to))
    dispatch(setTo(from))
  }
}

export function fetchCityData() {
  return (dispatch, getState) => {
    const {isLoadingCityData} = getState().home
    if (isLoadingCityData) {
      return
    }
    dispatch(setIsLoadingCityData(true))
    fetch('http://localhost:5000/rest/cities?_' + Date.now()).then(response => {
      return response.json()
    }).then(cityData => {
      console.log(cityData.data.cityList)
      dispatch(setCityData(cityData.data.cityList))
      dispatch(setIsLoadingCityData(false))
    }).catch(() => {
      dispatch(setIsLoadingCityData(false))
    })
  }
}
