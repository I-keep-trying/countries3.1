import countryService from '../services/countriesData'

const weatherReducer = (state = {}, action) => {
  switch (action.type) {
    case 'GET_WEATHER':
      return action.data
    default:
      return state
  }
}

export const getWeather = (location) => {
  return async (dispatch) => {
    const weather = await countryService.getWeather(location)
    dispatch({
      type: 'GET_WEATHER',
      data: weather,
    })
  }
}

export default weatherReducer
