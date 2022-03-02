import axios from 'axios'

const baseUrl = '/api/countries'
//const baseUrl = 'https://sheltered-scrubland-08732.herokuapp.com/api/countries'
const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const getWeather = async (params) => {
  const res = await axios.get(
    `/api/weather/lat/${params.location[0]}/lng/${params.location[1]}/unit/${params.unit}`
  )
  return res.data
}

const getTimeZone = async (params) => {
  const res = await axios.get(
    `/api/time/lat/${params.location[0]}/lng/${params.location[1]}`
  )
  return res.data
}

export default { getAll, getWeather, getTimeZone }
