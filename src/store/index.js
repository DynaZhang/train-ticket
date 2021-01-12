import { combineReducers, applyMiddleware, createStore } from 'redux'
import homeReducer from './modules/home/reducer'
import thunkMiddleware from 'redux-thunk'

const reducers = combineReducers({
  home: homeReducer
})

const store = createStore(reducers, applyMiddleware(thunkMiddleware))

export default store;
