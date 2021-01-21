import React, { useCallback, useEffect } from 'react'
import {connect} from 'react-redux'
import URI from 'urijs'
import {
  setFrom,
  setTo,
  setDepartDate,
  setHighSpeed,
  setSearchParsed,

  setTrainList,
  setTicketTypes,
  setTrainTypes,
  setDepartStations,
  setArriveStations,

  prevDate,
  nextDate,

  toggleOrderType,
  toggleHighSpeed,
  toggleOnlyTickets,
  toggleIsFiltersVisible,

  setCheckedTicketTypes,
  setCheckedTrainTypes,
  setCheckedDepartStations,
  setCheckedArriveStations,
  setDepartTimeStart,
  setDepartTimeEnd,
  setArriveTimeStart,
  setArriveTimeEnd} from '../../store/modules/query/actions'
import dayjs from 'dayjs'
import { h0 } from '../../utils'

import HeaderComponent from '../../components/Header'
import NavComponent from '../../components/Nav'
import ListComponent from './List/index'
import BottomComponent from './Bottom/index'
import useNav from '../../components/Nav/useNav'
import './style.styl'

function QueryPage(props) {

  const {
    trainList,
    from,
    to,
    departDate,
    highSpeed,
    searchParsed,
    dispatch,
    orderType,
    onlyTickets,
    isFiltersVisible,
    ticketTypes,
    trainTypes,
    departStations,
    arriveStations,
    checkedTicketTypes,
    checkedTrainTypes,
    checkedDepartStations,
    checkedArriveStations,
    departTimeStart,
    departTimeEnd,
    arriveTimeStart,
    arriveTimeEnd
  } = props

  useEffect(() => {
    const queries = URI.parseQuery(window.location.search)
    const {from, to, highSpeed, date} = queries
    dispatch(setFrom(from))
    dispatch(setTo(to))
    dispatch(setHighSpeed(highSpeed === 'true'))
    dispatch(setDepartDate(h0(dayjs(date).valueOf())))
    dispatch(setSearchParsed(true))
  }, [])

  useEffect(() => {
    if (!searchParsed) {
      return;
    }

    const url = new URI('http://localhost:5000/rest/query')
      .setSearch('from', from)
      .setSearch('to', to)
      .setSearch('date', dayjs(departDate).format('YYYY-MM-DD'))
      .setSearch('highSpeed', highSpeed)
      .setSearch('orderType', orderType)
      .setSearch('onlyTickets', onlyTickets)
      .setSearch('checkedTicketTypes', Object.keys(checkedTicketTypes).join())
      .setSearch('checkedTrainTypes', Object.keys(checkedTrainTypes).join())
      .setSearch('checkedDepartStations', Object.keys(checkedDepartStations).join())
      .setSearch('checkedArriveStations', Object.keys(checkedArriveStations).join())
      .setSearch('departTimeStart', departTimeStart)
      .setSearch('departTimeEnd', departTimeEnd)
      .setSearch('arriveTimeStart', arriveTimeStart)
      .setSearch('arriveTimeEnd', arriveTimeEnd)
      .toString();

    fetch(url)
      .then(response => response.json())
      .then(result => {
        const {
          data: {
            directTrainInfo: {
              trains,
              filter: {
                ticketType,
                trainType,
                depStation,
                arrStation,
              },
            },
          },
        } = result;

        dispatch(setTrainList(trains));
        dispatch(setTicketTypes(ticketType));
        dispatch(setTrainTypes(trainType));
        dispatch(setDepartStations(depStation));
        dispatch(setArriveStations(arrStation));
      });
  }, [
    from,
    to,
    departDate,
    highSpeed,
    searchParsed,
    // orderType,
    // onlyTickets,
    // checkedTicketTypes,
    // checkedTrainTypes,
    // checkedDepartStations,
    // checkedArriveStations,
    // departTimeStart,
    // departTimeEnd,
    // arriveTimeStart,
    // arriveTimeEnd,
  ]);

  const onBack = useCallback(() => {
    window.history.back()
  }, [])

  const {isPrevDisabled, isNextDisabled, prev, next} = useNav(departDate, dispatch, prevDate, nextDate)

  if (!searchParsed) {
    return null
  }

  return (
    <div className={"query-wrapper"}>
      <HeaderComponent title={`${from}->${to}`} onBack={onBack} />
      <NavComponent date={departDate} prev={prev} next={next} isNextDisabled={isNextDisabled} isPrevDisabled={isPrevDisabled}/>
      <div style={{padding: '10px'}}>
        <ListComponent list={trainList}/>
        <BottomComponent />
      </div>
    </div>
  )
}

export default connect(
  function mapStateToProps(state) {
    return state.query
  },
  function mapDispatchToProps(dispatch) {
    return {dispatch}
  }
)(QueryPage)