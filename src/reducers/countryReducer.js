import countryService from '../services/countriesData'

/* ---------- Reducers ------------- */
const countryReducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_COUNTRIES':
      // Find countries from restcountries.com api with missing keys
      const noCapitals = action.data.filter(
        (item) =>
          item.name.common === 'Antarctica' ||
          item.name.common === 'Bouvet Island' ||
          item.name.common === 'Heard Island and McDonald Islands' ||
          item.name.common === 'Macau' ||
          item.name.common === 'United States Minor Outlying Islands' ||
          item.name.common === 'South Georgia' ||
          item.name.common === 'French Southern and Antarctic Lands'
      )

      // Create replacements inserting missing keys
      const antarctica = noCapitals
        .filter((c) => c.name.common === 'Antarctica')
        .map((c) => {
          return { ...c, capital: ['No Capital City'], subregion: 'Antarctic' }
        })

      const bouvetIsland = noCapitals
        .filter((c) => c.name.common === 'Bouvet Island')
        .map((c) => {
          return { ...c, capital: ['Oslo'], subregion: 'Antarctic' }
        })

      const heardIsland = noCapitals
        .filter((c) => c.name.common === 'Heard Island and McDonald Islands')
        .map((c) => {
          return { ...c, capital: ['Bern'], subregion: 'Antarctic' }
        })

      const macau = noCapitals
        .filter((c) => c.name.common === 'Macau')
        .map((c) => {
          return { ...c, capital: ['Macau'] }
        })

      const usMinor = noCapitals
        .filter((c) => c.name.common === 'United States Minor Outlying Islands')
        .map((c) => {
          return { ...c, capital: ['Washington DC'] }
        })

      const southGeorgia = noCapitals
        .filter((c) => c.name.common === 'South Georgia')
        .map((c) => {
          return { ...c, subregion: 'Antarctic' }
        })

      const frenchSouthern = noCapitals
        .filter((c) => c.name.common === 'French Southern and Antarctic Lands')
        .map((c) => {
          return { ...c, subregion: 'Antarctic' }
        })

      // Remove defective country objects
      const otherCountries = action.data.filter(
        (item) =>
          item.name.common !== 'Antarctica' &&
          item.name.common !== 'Bouvet Island' &&
          item.name.common !== 'Heard Island and McDonald Islands' &&
          item.name.common !== 'Macau' &&
          item.name.common !== 'United States Minor Outlying Islands' &&
          item.name.common !== 'South Georgia' &&
          item.name.common !== 'French Southern and Antarctic Lands'
      )

      // Insert replacement objects with keys in place
      const initialCountries = [
        ...otherCountries,
        southGeorgia[0],
        heardIsland[0],
        macau[0],
        usMinor[0],
        antarctica[0],
        bouvetIsland[0],
        frenchSouthern[0],
      ]
      return {
        initialCountries,
        filter: {
          input: '',
          country: '',
          continent: 'All',
          region: 'All',
          subregion: '',
          reset: false,
        },
        filtered: [],
      }
    case 'FILTER_COUNTRIES':
      if (action.input === '') {
        return {
          ...state,
          filter: {
            input: '',
            country: '',
            continent: 'All',
            region: 'All',
            subregion: '',
            reset: false,
          },
          filtered: [],
        }
      } else if (action.input) {
        const toSearch = {
          ...state,
          filter: {
            ...state.filter,
            input: action.input.toLowerCase(),
          },
        }
        const filtered = toSearch.initialCountries.filter((c) =>
          c.name.common.toLowerCase().startsWith(toSearch.filter.input)
        )
        return filtered.length === 1
          ? {
              ...toSearch,
              filter: {
                ...toSearch.filter,
                country: filtered[0].name.common,
                continent: filtered[0].continents[0],
                region: filtered[0].region,
                subregion: filtered[0].subregion,
              },
              filtered: filtered,
            }
          : { ...toSearch, filtered: filtered }
      } else if (action.country) {
        const toSearch = {
          ...state,
          filter: {
            ...state.filter,
            country: action.country.name.common.toLowerCase(),
            continent: action.country.continents[0].toLowerCase(),
            region: action.country.region,
            subregion: action.country.subregion,
          },
        }
        const filtered = toSearch.initialCountries.filter((c) =>
          c.name.common.toLowerCase().startsWith(toSearch.filter.country)
        )
        return { ...toSearch, filtered: filtered }
      } else if (action.continent) {
        const selectContinent = {
          ...state,
          filter: {
            ...state.filter,
            continent: action.continent.toLowerCase(),
          },
        }
        const continentFiltered =
          selectContinent.filter.continent === 'All'
            ? selectContinent.initialCountries
            : selectContinent.initialCountries.filter(
                (c) =>
                  c.continents[0].toLowerCase() ===
                  selectContinent.filter.continent
              )
        const countriesFiltered = {
          ...selectContinent,
          filtered: continentFiltered,
          filter: {
            ...selectContinent.filter,
            input: '',
            country: '',
            continent: action.continent.toLowerCase(),
            region: 'All',
            subregion: '',
          },
        }
        return countriesFiltered
      } else if (action.region) {
        const selectRegion = {
          ...state,
          filter: { ...state.filter, region: action.region.toLowerCase() },
        }

        const regionFiltered =
          selectRegion.filter.region === 'all'
            ? selectRegion.initialCountries
            : selectRegion.initialCountries.filter(
                (c) => c.region.toLowerCase() === selectRegion.filter.region
              )

        return {
          ...selectRegion,
          filtered: regionFiltered,
        }
      } else if (action.subregion) {
        const selectSubRegion = {
          ...state,
          filter: {
            ...state.filter,
            subregion: action.subregion.toLowerCase(),
          },
        }
        const subregionFiltered = selectSubRegion.initialCountries.filter(
          (s) => s.subregion?.toLowerCase() === selectSubRegion.filter.subregion
        )
        const newState = { ...selectSubRegion, filtered: subregionFiltered }
        return newState
      } else {
        return state
      }

    case 'RESET_FILTER':
      return {
        ...state,
        filter: {
          input: '',
          country: '',
          continent: '',
          region: 'All',
          subregion: '',
          reset: true,
        },
        filtered: [],
      }
    default:
      return state
  }
}

export const unitReducer = (state = { unit: 'metric' }, action) => {
  switch (action.type) {
    case 'UNIT_TOGGLE':
      const unit = state.unit === 'metric' ? 'imperial' : 'metric'
      return { ...state, unit: unit }
    default:
      return state
  }
}

export const menuReducer = (state = { show: false }, action) => {
  switch (action.type) {
    case 'MENU_TOGGLE':
      const show = state.show === false ? true : false
      return { ...state, show: show }
    default:
      return state
  }
}

/* ------------ Actions ------------- */

export const initializeCountries = () => {
  return async (dispatch) => {
    const countries = await countryService.getAll()
    dispatch({
      type: 'INIT_COUNTRIES',
      data: countries,
    })
  }
}

export const toggleUnit = (unit) => {
  return {
    type: 'UNIT_TOGGLE',
    unit: unit,
  }
}

export const toggleMenu = (show) => {
  return {
    type: 'MENU_TOGGLE',
    show: show,
  }
}

export const resetFilter = (reset) => {
  return {
    type: 'RESET_FILTER',
    reset: reset,
  }
}

export const searchCountries = (input) => {
  return {
    type: 'FILTER_COUNTRIES',
    input,
  }
}

export const filterCountries = (country) => {
  return {
    type: 'FILTER_COUNTRIES',
    country,
  }
}

export const filterCountriesByContinent = (continent) => {
  return {
    type: 'FILTER_COUNTRIES',
    continent,
  }
}

export const filterCountriesByRegion = (region) => {
  return {
    type: 'FILTER_COUNTRIES',
    region,
  }
}

export const filterCountriesBySubRegion = (subregion) => {
  return {
    type: 'FILTER_COUNTRIES',
    subregion,
  }
}

export default countryReducer
