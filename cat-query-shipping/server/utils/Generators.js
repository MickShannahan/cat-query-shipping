
// RegExs
const codeRx = /[A-Z][1-9][1-9]/
const trackingRx = /[A-Z0-9]{3}-[A-Z0-9]{3}-[A-Z0-9]{3}-[A-Z0-9]{3}[a-z]/
const dateRx = /(Sol | Minkow | Tera | Union)[0-9]{4}:[0-9]{2}/
const dateTypes = ['Sol', 'Minkow', 'Tera', 'Union']
const cryptos = ['KITCOIN', 'SCRATCH', 'M0nSER4T', 'SAUCER', 'PETCO', 'MOONCHSE', 'CNIP', 'DOMINION']
const alph = ['A', 'B', 'C', 'E', 'F', 'G', 'K', 'M', 'P', 'Q', 'R', 'S', 'T', 'V', 'W', 'X', 'Y', 'Z']
const nums = ['1', '2', '3', '4', '5', '6', '7', '8', '9']
const shippingTiers = ['1LTYR', '2LTYR', 'METEOR-FREIGHT', 'GALAXY-EXPRESS', 'TELEPORT+', 'INTERPLANETARY/DOMESTIC', 'STANDARD', 'STANDARD+', 'WARP-FREIGHT']
const planets = [
  'Mercury',
  'Venus',
  'Earth',
  'Mars',
  'Jupiter',
  'Saturn',
  'Uranus',
  'Neptune',
  'Phobos',
  'Deimos',
  'Io',
  'Europa',
  'Ganymede',
  'Callisto',
  'Amalthea',
  'Pasiphae',
  'Sinope',
  'Janus',
  'Mimas',
  'Enceladus',
  'Tethys',
  'Dione',
  'Rhea',
  'Titan',
  'Hyperion',
  'Iapetus',
  'Phoebe',
  'Ariel',
  'Titania',
  'Miranda',
  'Oberon',
  'Umbriel',
  'Ceres',
  'Eros',
  'Icarus',
  'Juno',
  'Pallas',
  'Vesta',
  '36',
  'Ophiuchi',
  '40',
  'Eridani',
  '47',
  'Ursae',
  'Majoris',
  '61',
  'Cygni',
  '61',
  'Ursae',
  'Majoris',
  '70',
  'Ophiuchi',
  '82',
  'Eridani',
  '94',
  'Aquarii',
  '107',
  'Piscium',
  'Acamar',
  'Achernar',
  'Aldebaran',
  'Algenubi',
  'Algol',
  'Alhena',
  'Alioth',
  'Alkalurops',
  'Alnilam',
  'Alnitak',
  'Alpha',
  'Centauri',
  'Alpha',
  'Ceti',
  'Alpha',
  'Coronae',
  'Borealis',
  'Alpha',
  'Draconis',
  'Alpha',
  'Hydri',
  'Alpha',
  'Pavonis',
  'Alpha',
  'Sagittarii',
  'Alpha',
  'Serpentis',
  'Alpha',
  'Tucanae',
  'Altair',
  'Antares',
  'Arcturus',
  "Barnard's",
  'Star',
  'Bellatrix',
  'Beta',
  'Andromedae',
  'Beta',
  'Aquarii',
  'Beta',
  'Aquilae',
  'Beta',
  'Aurigae',
  'Beta',
  'Caeli',
  'Beta',
  'Canum',
  'Venaticorum',
  'Beta',
  'Cassiopeiae',
  'Beta',
  'Corvi',
  'Beta',
  'Eridani',
  'Beta',
  'Hydri',
  'Beta',
  'Librae',
  'Beta',
  'Lyrae',
  'Beta',
  'Tauri',
  'Beta',
  'Virginis',
  'Betelgeuse',
  'Canopus',
  'Capella',
  'Chi',
  'Draconis',
  'CY',
  'Aquarii',
  'Delta',
  'Crateris',
  'Delta',
  'Draconis',
  'Delta',
  'Pavonis',
  'Delta',
  'Sagittarii',
  'Deneb',
  'Epsilon',
  'Boötis',
  'Epsilon',
  'Eridani',
  'Epsilon',
  'Gruis',
  'Epsilon',
  'Indi',
  'Epsilon',
  'Pegasi',
  'Epsilon',
  'Scorpii',
  'Eta',
  'Boötis',
  'Eta',
  'Cassiopeiae',
  'Eta',
  'Orionis',
  'Fomalhaut',
  'Gamma',
  'Andromedae',
  'Gamma',
  'Draconis',
  'Gamma',
  'Leporis',
  'Gamma',
  'Serpentis',
  'Gamma',
  'Trianguli',
  'Gamma',
  'Ursae',
  'Majoris',
  'Gliese',
  '687',
  'Gliese',
  '754',
  'Gliese',
  '876',
  'Groombridge',
  '34',
  'Groombridge',
  '1618',
  'HD',
  '69830',
  '(and',
  'its',
  'planet',
  'HD',
  '69830',
  'b)',
  'Iota',
  'Horologii',
  'Kappa',
  'Coronae',
  'Borealis',
  'Kappa',
  'Velorum',
  "Kapteyn's",
  'Star',
  'Kruger',
  '60',
  'Lacaille',
  '9352',
  'Lalande',
  '21185',
  'Lalande',
  '46650',
  'Lambda',
  'Scorpii',
  'Lambda',
  'Serpentis',
  'Luyten',
  '726-8',
  "Luyten's",
  'Star',
  'Maia',
  'Mintaka',
  'Mira',
  'Mizar',
  'and',
  'Alcor',
  'Mu',
  'Capricorni',
  'Mu',
  'Cassiopeiae',
  'Mu',
  'Herculis',
  'Nu',
  'Ophiuchi',
  'Omicron',
  'Persei',
  'p',
  'Eridani',
  'Phi',
  'Ophiuchi',
  'Phi',
  'Orionis',
  'Polaris',
  'Pollux',
  'Procyon',
  'Proxima',
  'Centauri',
  'Regulus',
  'Rigel',
  'Ross',
  '128',
  'Ross',
  '154',
  'Ross',
  '248',
  'Sigma',
  'Draconis',
  'Spica',
  'Sirius',
  'T',
  'Coronae',
  'Borealis',
  'Tau',
  'Ceti',
  'Tau',
  'Coronae',
  'Borealis',
  'Tau',
  'Cygni',
  'Theta',
  'Capricorni',
  'Theta',
  'Centauri',
  'Theta',
  'Hydrae',
  'Theta',
  'Ursae',
  'Majoris',
  'Van',
  'Maanen',
  '2',
  'Vega',
  'Wolf',
  '359',
  'Xi',
  'Puppis',
  'Zeta',
  'Aquilae',
  'Zeta',
  'Draconis',
  'Zeta',
  'Ophiuchi',
  'Zeta',
  'Persei',
  'Zeta',
  'Reticuli',
  'Zeta',
  'Tucanae',
  'Abafar',
  'Alzoc',
  'I',
  'Alzoc',
  'II',
  'Alzoc',
  'III',
  'Mathilde',
  'Jupiter',
  'II',
  'Earth',
  'II',
  'Eurydome',
  'Vogsphere',
  'Cybertron',
  'Allosimanius',
  'Syneca',
  'Argabuthon',
  'Arkintoofle',
  'Minor',
  'Asbleg',
  'Asgard',
  'Lamuella',
  'Lazgar',
  'Beta',
  'Magrathea',
  'Bartledan',
  'Betelgeuse',
  'V',
  'Betelgeuse',
  'VII',
  'Bethselamin',
  'Blagulon',
  'Kappa',
  'Brontitall',
  'Broop',
  'Kidron',
  'Thirteen',
  'Burphon',
  'XII',
  'Nano',
  'Nephologia',
  'NowWhat',
  'Oglaroon',
  'Damogran',
  'Dangrabad',
  'Beta',
  'Poghril',
  'Preliumtarn',
  'Rupert',
  'Fallia',
  'Flargathon',
  'Frogstar',
  'World',
  'A',
  'Frogstar',
  'World',
  'B',
  'Frogstar',
  'World',
  'C',
  'Santraginus',
  'V',
  'Saquo-Pilia',
  'Hensha',
  'Sesefras',
  'Magna',
  'Sqornshellous',
  'Zeta',
  'Striterax',
  'Stug',
  'Gagrakacka',
  'Golgafrincham',
  'Traal',
  'Han',
  'Wavel',
  'Happi-Werld',
  'III',
  'Hawalius',
  'Ursa',
  'Minor',
  'Beta',
  'Jaglan',
  'Beta',
  'Jajazikstak',
  'Jikthroom',
  'Beta',
  'Joltrast',
  '3',
  'Xaxrax',
  'Sigma',
  'Kakrafoon',
  'Kappa',
  'Kria',
  'Krikkit'
]
const planetCodeKey = 4

export function bool() {
  return Math.random() > 0.5
}

export function tracking() {
  let trackingCode = ''
  for (let i = 0; i <= 4; i++) {
    for (let j = 1; j <= 3; j++) {
      const chance = Math.random()
      if (chance > 0.5) {
        trackingCode += alph[Math.floor(Math.random() * alph.length)]
      } else {
        trackingCode += Math.floor(Math.random() * 10)
      }
    }
    trackingCode += '-'
  }
  trackingCode += alph[Math.floor(Math.random() * alph.length)].toLowerCase()
  return trackingCode
}

export function description() {
  return 'place holder description'
}

export function shippingTier() {
  return shippingTiers[Math.floor(Math.random() * shippingTiers.length)]
}

export function postageCost(tier) {
  switch (tier) {
    case '1LTYR':
      return 50
    case '2LTYR':
      return 75
    case 'METEOR-FREIGHT':
      return 125
    case 'GALAXY-EXPRESS':
      return 125
    case 'TELEPORT+':
      return 200
    case 'INTERPLANETARY/DOMESTIC':
      return 25
    case 'STANDARD':
      return 60
    default:
      return 70
  }
}

export function crypto() {
  return cryptos[Math.floor(Math.random() * cryptos.length)]
}

export function spaceDate() {
  let spaceDate = ''

  for (let i = 1; i <= 2; i++) {
    spaceDate += nums[Math.floor(Math.random() * nums.length)]
  }
  return spaceDate
}

export function dateFormat() {
  return dateTypes[Math.floor(Math.random() * dateTypes.length)]
}

export function postalStation() {
  return 'Not yet implemented'
}

export function postalHistory() {
  return 'Not yet implemented'
}

export function insuredAmount(insured, pirate, postage) {
  if (insured) {
    postage *= 2
  }
  if (pirate) {
    postage *= 2.5
  }
  return postage
}

export function code() {
  const code = alph[Math.floor(Math.random() * alph.length)] + nums[Math.floor(Math.random() * nums.length)] + nums[Math.floor(Math.random() * nums.length)]
  return code
}

export function quadrantCode(hasCode) {
  if (!hasCode) return false
  const code = nums[Math.floor(Math.random() * nums.length)] + alph[Math.floor(Math.random() * alph.length)] + alph[Math.floor(Math.random() * alph.length)]
  return code
}

export function planet() {
  return planets[Math.floor(Math.random() * planets.length)]
}

export function planetNumber(planetName) {
  return planets.indexOf(planetName) + '0'
}

export function planetCode(planetName) {
  planetName.replace(/ /g, '')
  const arr = planetName.split('')
  let transcribed = arr.map(c => {
    return String.fromCharCode(c.charCodeAt() + planetCodeKey)
  })
  transcribed = transcribed.length < 4 ? [...transcribed, 0, 0, 0, 0] : transcribed
  return transcribed.join('').toUpperCase().slice(0, 4)
}

export function missingProperties(schemaObject, chance) {
  const keys = Object.keys(schemaObject)
  const missingKeys = keys.map(key => {
    // eslint-disable-next-line no-mixed-operators
    if (Math.random() < 0.5) {
      return key
    }
    return null
  }).filter(n => n)
  return missingKeys
}

export function damageProperties(schemaObject, chance) {
  const dict = {}
  Object.keys(schemaObject).forEach(k => {
    if (Math.random() < chance) dict[k] = damageProperty(schemaObject[k])
  })
  return dict
}

export function damageKeys(schemaObject, chance) {
  const dict = {}
  Object.keys(schemaObject).forEach(k => {
    if (Math.random() < chance) { dict[k] = damageProperty(k) }
  })
  return dict
}

export function damageProperty(prop) {
  switch (typeof prop) {
    case 'string':
      const rand1 = Math.floor(Math.random() * (prop.length / 2))
      const rand2 = Math.floor(Math.random() * (prop.length / 2) + (prop.length / 2))
      return prop.split('').splice(rand1, rand2, '...').join('')
    case 'number' :
      return prop * Math.random()
    case 'boolean':
      const answers = ['yes', 'no', 'maybe', 'unsure']
      return answers[Math.floor(Math.random() * answers.length)]
    default:
      return '...'
  }
}
