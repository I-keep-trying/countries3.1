import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import countryReducer, {
  unitReducer,
  menuReducer,
} from './reducers/countryReducer'
import weatherReducer from './reducers/weatherReducer'
import timeZoneReducer from './reducers/timeZoneReducer'

const reducer = combineReducers({
  countries: countryReducer,
  unit: unitReducer,
  weather: weatherReducer,
  time: timeZoneReducer,
  menu: menuReducer,
})

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))

export default store
