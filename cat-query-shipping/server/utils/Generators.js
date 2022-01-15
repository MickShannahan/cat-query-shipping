import { logger } from './Logger'

// RegExs
export const codeReg = /[A-Z][1-9][1-9]/
export const trackingReg = /[A-Z0-9]{3}-[A-Z0-9]{3}[a-z]/
export const dateReg = /(Sol | Minkow | Tera | Union)[0-9]{4}:[0-9]{2}/
export const dateTypes = ['Sol', 'Minkow', 'Tera', 'Union']
export const cryptos = ['Union', 'KITCOIN', 'M0nSER4T', 'Scratch', 'Ca+N!p']
const alph = ['A', 'B', 'C', 'E', 'F', 'G', 'K', 'M', 'P', 'Q', 'R', 'S', 'T', 'V', 'W', 'X', 'Y', 'Z']
const nums = ['1', '2', '3', '4', '5', '6', '7', '8', '9']
const sectorAlph = ['A', 'C', 'V', 'X', 'Z']
const sectorNums = ['01', '22', '42', '67', '99']
export const shippingTiers = ['1LTYR', '2LTYR', 'METEOR-FREIGHT', 'GALAXY-EXPRESS', 'INTERPLANETARY/DOMESTIC', 'WARP', 'WARP+', 'WARP-FREIGHT']
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
const glitchFills = ['ᵒ⋏ᵒ', '/ᐠ.ꞈ.ᐟ\\', '*_', '..', '_-', '^~', '៱˳_˳៱']
const planetCodeKey = 4
const items = {
  consumable: { brands: ['Birman Brand', 'Javan Jack\'s', ' Xiao Mao'], items: ['Gormet Smoked Salmon', 'Non-perishable Tuna', 'Coffee', 'Earth II Bovine Milk', 'Cat nip', 'Synthetic Milk Substitute'] },
  furniture: { brands: ['Kot', 'Iapetus Kat Elegant Appliances', 'Bombay', 'Havana Brown'], items: ['3-level Carpeted tree', 'Cardboard box', '2-level kitten tree', 'Coverd Bed', 'Tunnel'] },
  electronics: { brands: ['CREX', 'Deveon', 'Korat Electronics', 'Meo', 'Toyger'], items: ['Automatic Mouse', 'Hair Filter', '24inch Virtual Fish Pond', 'Re-winding Yarn Ball', 'Tooth-brush', 'Self-Rolling Felt Ball', 'Personal Space Pod', 'Auto-Stroller', 'Collar bell with 24 ringing sounds', 'CAT-BOUND Radio Transmitter'] },
  homeGood: { brands: ['Ms. Maine\'s', 'laPerm', 'Manx Manufacturing', 'Munchkin'], items: ['Scratch Board', 'Scratch Board with self healing inserts', 'Classic Yarn Ball', 'Fish Cologne', 'Warm Pad', 'Self-Filling Food Bowl', 'Telescope', 'Gift Card', 'Synthetic wool-lined booties', 'Sequien dress', 'Denim Pants', 'Water Fountain', 'Ol time mouse shaped toy', '"Real Tounge" Grooming brush'] },
  collectable: { brand: ['Super Neko Spirit'], items: ['Gato Figurine', 'Mace Figurine', 'Gato Poster', 'Mace Poster'] }
}
const desc = ['2 %B% brand, %I%s', 'A %I%, made by the %B% company', 'One %B% style %I%', 'Some %I%s, by %B%', 'A Dozen %I%s of vaious brands', 'A Broken %I%', 'A Pair of %B% %I%s', 'Just some generic %I%', 'A Home-made %I%', 'It\'s just and empty box']
const flavors = ['. The quality looks shotty.', '. The quality is supreme.', ' of average quality.', 'These are rare, you wonder where they were ordered from.', '. Quite ordinary', '. This Sector gets a lot of these...', '. You used to have one just like it.', ', along with a strange smell.', ', along with poorly written note. If only you could read Burmese.', '. By looks, probably knock-offs.', '. Meow.', '. "Daring aren\'t we."', '']

export function bool() {
  return Math.random() > 0.5
}

function randArr(arr, count = 1) {
  let out = ''
  for (let i = 0; i < count; i++) {
    out += arr[Math.floor(Math.random() * arr.length)]
  }
  return out
}

export function tracking() {
  let trackingCode = ''
  for (let i = 0; i <= 2; i++) {
    for (let j = 1; j <= 3; j++) {
      const chance = Math.random()
      if (chance > 0.5) {
        trackingCode += randArr(alph)
      } else {
        trackingCode += randArr(nums)
      }
    }
    trackingCode += '-'
  }
  trackingCode += randArr(alph).toLowerCase()
  return trackingCode
}

export function description() {
  return 'place holder description'
}

export function shippingTier() {
  return randArr(shippingTier)
}

export function shippingCost(tier) {
  let cost = 0
  switch (tier) {
    case 'INTERPLANETARY/DOMESTIC':
      cost = 25; break
    case '2LTYR':
      cost = 50; break
    case '1LTYR':
      cost = 70; break
    case 'METEOR-FREIGHT':
      cost = 50; break
    case 'GALAXY-EXPRESS':
      cost = 40; break
    case 'WARP':
      cost = 75; break
    case 'WARP+':
      cost = 95; break
    case 'WARP-FREIGHT':
      cost = 100; break
    default:
      cost = 50; break
  }
  return cost
}
export function totalCost(tier, insured, pCoverage, currency) {
  let cost = 0
  switch (tier) {
    case 'INTERPLANETARY/DOMESTIC':
      cost = 25; break
    case '2LTYR':
      cost = 50; break
    case '1LTYR':
      cost = 70; break
    case 'METEOR-FREIGHT':
      cost = 50; break
    case 'GALAXY-EXPRESS':
      cost = 40; break
    case 'WARP':
      cost = 75; break
    case 'WARP+':
      cost = 95; break
    case 'WARP-FREIGHT':
      cost = 100; break
    default:
      cost = 50; break
  }
  if (insured) cost += 50
  if (pCoverage) cost += 25
  switch (currency) {
    case 'Union':
      // eslint-disable-next-line no-self-assign
      cost = cost; break
    case 'KITCOIN':
      cost *= 2; break
    case 'M0ns3R4T':
      cost *= 0.5; break
    case 'Scratch':
      cost *= 4
      cost += 10; break
    case 'Ca+N!p':
      cost *= 3
  }
  return cost
}

export function crypto() {
  return randArr(cryptos)
}

export function spaceDate() {
  let spaceDate = ''

  for (let i = 1; i <= 2; i++) {
    spaceDate += randArr(nums)
  }
  return spaceDate
}

export function dateFormat() {
  return randArr(dateTypes)
}

export function postalStation() {
  return 'Not yet implemented'
}

export function postalHistory() {
  return 'Not yet implemented'
}

export function code() {
  const code = randArr(alph) + randArr(nums) + randArr(nums)
  return code
}

export function sector(planetName) {
  const index = planets.findIndex(p => p === planetName)
  const row = Math.floor((index / 15) / 5)
  const col = Math.floor((index / 15) % 5)
  const alph = sectorAlph[row]
  const code = sectorNums[col]

  return alph + code.toString()
}

export function quadrantCode(hasCode) {
  if (!hasCode) return false
  const code = randArr(nums) + randArr(alph) + randArr(alph)
  return code
}

export function planet() {
  return randArr(planets)
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
    if (Math.random() < chance) {
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
  const randomFill = randArr(glitchFills)
  const rand1 = Math.floor(Math.random() * (prop.length / 2))
  const rand2 = Math.floor(Math.random() * (prop.length / 2) + (prop.length / 2))
  const answers = ['not yet decided', 'maybe', 'unsure', 'ask again later']
  switch (typeof prop) {
    case 'string':
      prop = prop.split('')
      prop.splice(rand1, rand2, randomFill)
      return prop.join('')
    case 'number' :
      return prop.toString().split('').reverse().join('')
    case 'boolean':
      return randArr(answers)
    default:
      return '...'
  }
}
export function difficultyRating(mProps = [], dProps = {}, dKeys = {}) {
  let difficulty = 0
  const hasTracking = !mProps.includes('trackingNumber')
  const damagedTrackingNumber = Object.keys(dProps).includes('trackingNumber')
  logger.log(hasTracking, damagedTrackingNumber)
  if (hasTracking && !damagedTrackingNumber) return 1
  if (!hasTracking && damagedTrackingNumber) difficulty -= 3
  difficulty += (mProps.length * 0.5)
  difficulty += (Object.keys(dProps).length * 0.5)
  difficulty += (Object.keys(dKeys).length * 0.1)
  return difficulty > 20 ? 20 : difficulty < 0 ? 1 : Math.round(difficulty)
}
