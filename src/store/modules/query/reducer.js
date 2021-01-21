import {
  ACTION_SET_FROM,
  ACTION_SET_TO,
  ACTION_SET_DEPART_DATE,
  ACTION_SET_HIGH_SPEED,
  ACTION_SET_TRAIN_LIST,
  ACTION_SET_ORDER_TYPE,
  ACTION_SET_ONLY_TICKETS,
  ACTION_SET_TICKET_TYPES,
  ACTION_SET_CHECKED_TICKET_TYPES,
  ACTION_SET_TRAIN_TYPES,
  ACTION_SET_CHECKED_TRAIN_TYPES,
  ACTION_SET_DEPART_STATIONS,
  ACTION_SET_CHECKED_DEPART_STATIONS,
  ACTION_SET_ARRIVE_STATIONS,
  ACTION_SET_CHECKED_ARRIVE_STATIONS,
  ACTION_SET_DEPART_TIME_START,
  ACTION_SET_DEPART_TIME_END,
  ACTION_SET_ARRIVE_TIME_START,
  ACTION_SET_ARRIVE_TIME_END,
  ACTION_SET_IS_FILTERS_VISIBLE,
  ACTION_SET_SEARCH_PARSED,
} from './actionTypes';
import {h0} from '../../../utils'
import { ORDER_DEPART } from './constant'

const defaultStore = {
  from: null,
  to: null,
  departDate: h0(Date.now()),
  highSpeed: false,
  trainList: [],
  orderType: ORDER_DEPART,
  onlyTickets: false,
  ticketTypes: [],
  checkedTicketTypes: {},
  trainTypes: [],
  checkedTrainTypes: {},
  departStations: [],
  checkedDepartStations: {},
  arriveStations: [],
  checkedArriveStations: {},
  departTimeStart: 0,
  departTimeEnd: 24,
  arriveTimeStart: 0,
  arriveTimeEnd: 24,
  isFiltersVisible: false,
  searchParsed: false
}

const reducer = (state=defaultStore, action) => {
  const {type, payload} = action
  const newState = JSON.parse(JSON.stringify(state))
  switch (type) {
    case ACTION_SET_FROM: newState.from = payload; break;
    case ACTION_SET_TO: newState.to = payload; break;
    case ACTION_SET_DEPART_DATE: newState.departDate = payload; break;
    case ACTION_SET_HIGH_SPEED: newState.highSpeed = payload; break;
    case ACTION_SET_TRAIN_LIST: newState.trainList = payload; break;
    case ACTION_SET_ORDER_TYPE: newState.orderType = payload; break;
    case ACTION_SET_ONLY_TICKETS: newState.onlyTickets = payload; break;
    case ACTION_SET_TICKET_TYPES: newState.ticketTypes = payload; break;
    case ACTION_SET_CHECKED_TICKET_TYPES: newState.checkedTicketTypes = payload; break;
    case ACTION_SET_TRAIN_TYPES: newState.trainTypes = payload; break;
    case ACTION_SET_CHECKED_TRAIN_TYPES: newState.checkedTrainTypes = payload; break;
    case ACTION_SET_DEPART_STATIONS: newState.departStations = payload; break;
    case ACTION_SET_CHECKED_DEPART_STATIONS: newState.checkedDepartStations = payload; break;
    case ACTION_SET_ARRIVE_STATIONS: newState.arriveStations = payload; break;
    case ACTION_SET_CHECKED_ARRIVE_STATIONS: newState.checkedArriveStations = payload; break;
    case ACTION_SET_DEPART_TIME_START: newState.departTimeStart = payload; break;
    case ACTION_SET_DEPART_TIME_END: newState.departTimeEnd = payload; break;
    case ACTION_SET_ARRIVE_TIME_START: newState.arriveTimeStart = payload; break;
    case ACTION_SET_ARRIVE_TIME_END: newState.arriveTimeEnd = payload; break;
    case ACTION_SET_IS_FILTERS_VISIBLE: newState.isFiltersVisible = payload; break;
    case ACTION_SET_SEARCH_PARSED: newState.searchParsed = payload; break;
    default: break;
  }
  return newState
}

export default reducer