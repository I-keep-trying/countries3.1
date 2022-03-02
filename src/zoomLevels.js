  const zoomLevel = (country => {
    switch (true) {
      case country.name.common === 'Antarctica':
        return 2
        
      case country.name.common === 'British Indian Ocean Territory':
        return 4
        
      case country.name.common === 'French Guiana' ||
        country.name.common === 'Switzerland' ||
        country.name.common === 'Congo' ||
        country.name.common === 'Spain' ||
        country.name.common === 'Central African Republic' ||
        country.name.common === 'France':
        return 5
        
      case country.name.common === 'Oman' ||
        country.capital[0] === 'Yamoussoukro' ||
        country.name.common === 'Germany' ||
        country.name.common === 'Indonesia' ||
        country.name.common === 'DR Congo':
        return 5.5
        
      case country.name.common === 'Mozambique':
        return 6
        
      case country.name.common === 'Palestine' ||
        country.name.common === 'Dominican Republic' ||
        country.name.common === 'Croatia' ||
        country.name.common === 'Togo' ||
        country.name.common === 'Azerbaijan' ||
        country.name.common === 'Serbia' ||
        country.name.common === 'Jordan' ||
        country.name.common === 'Honduras' ||
        country.name.common === 'Nicaragua' ||
        country.name.common === 'Suriname':
        return 6.5
        
      case country.name.official === 'Bonaire, Sint Eustatius and Saba' ||
        country.name.common === 'United States Virgin Islands' ||
        country.name.common === 'Barbados' ||
        country.name.common === 'Saint Lucia' ||
        country.name.common === 'Montenegro' ||
        country.name.common === 'Saint Helena, Ascension and Tristan da Cunha':
        return 7
        
      case country.name.common === 'Pitcairn' ||
        country.name.common === 'Mayotte' ||
        country.name.common === 'Martinique' ||
        country.name.common === 'Guadeloupe' ||
        country.name.common === 'Bahrain' ||
        country.name.common === 'Réunion' ||
        country.name.common === 'South Georgia and the South Sandwich Islands':
        return 7.5
        
      case country.name.common === 'Antigua and Barbuda' ||
        country.name.common === 'Åland Islands':
        return 8
        
      case country.name.common === 'Curaçao' || country.name.common === 'Isle of Man':
        return 9
        
      case country.name.common === 'Guernsey' ||
        country.name.common === 'Jersey' ||
        country.name.common === 'Saint Barthélemy':
        return 10
        
      case country.name.common === 'Cocos (Keeling) Islands':
        return 12
        
      case country.name.common === 'Nauru' || country.name.common === 'Tuvalu':
        return 13
        
      case country.area < 1:
        return 14
        
      case country.area > 2 && country.area < 5.9:
        return 13
        
      case country.area > 5.9 && country.area < 52:
        return 12
        
      case country.area > 52 && country.area < 55:
        return 10.5
        
      case country.area > 55 && country.area < 179:
        return 7
        
      case country.area > 179 && country.area < 40000:
        return 6
        
      case country.area > 40000 && country.area < 270000:
        return 5
        
      case country.area > 270000 && country.area < 9629092:
        return 4
        
      case country.area > 9640010 && country.area < 10000000:
        return 3
        
      default:
        return 0
        
    }
  })

export default zoomLevel