import countryService from '../services/countriesData'

const timeZoneReducer = (state = {}, action) => {
  switch (action.type) {
    case 'GET_TIME_ZONE':
      return action.data
    default:
      return state
  }
}

export const getTimeZone = (location) => {
  return async (dispatch) => {
    const timeZone = await countryService.getTimeZone(location)
    dispatch({
      type: 'GET_TIME_ZONE',
      data: timeZone,
    })
  }
}

export default timeZoneReducer
