import { logger } from './Logger'

// RegExs
export const codeReg = /[A-Z][1-9][1-9]/
export const trackingReg = /[A-Z0-9]{3}-[A-Z0-9]{3}-[a-z]/
export const dateReg = /(Sol|Minkow|Tera|Union):[0-9]{2}/
// Consts
const trackingChance = 0.25
export const dateTypes = ['Sol', 'Minkow', 'Tera', 'Union']
export const cryptos = ['Union', 'KITCOIN', 'M0nSER4T', 'Scratch', 'Ca+N!p']
const az = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
const digits = ['0', '2', '3', '4', '5', '6', '7', '8', '9', '10']
const alph = ['A', 'B', 'C', 'E', 'F', 'G', 'K', 'M', 'P', 'Q', 'R', 'S', 'T', 'V', 'W', 'X', 'Y', 'Z']
const nums = ['1', '2', '3', '4', '5', '6', '7', '8', '9']
const sectorAlph = ['A', 'C', 'V', 'X', 'Z']
const sectorNums = ['01', '22', '42', '67', '99']
export const glitches = ['jumper', 'scrambler', 'burner', 'timer', 'printer', 'trapper', 'speller']
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
const diffCodeMap = {
  0.5: ['insured', 'pirateCoverage', 'containsHazard',
    'inQuadrant', 'fragile', 'galaxy'],
  1: ['dateFormat', 'currency', 'shippingCost'],
  2: ['sector', 'shippingTier'],
  5: ['shippingDate', 'planet', 'planetCode', 'planetNumber', 'totalCost', 'recipient', 'recipient', 'recipient'],
  6: ['trackingNumber']
}
const items = {
  consumable: { brands: ['Birman Brand', 'Javan Jack\'s', 'Xiao Mao'], items: ['Gormet Smoked Salmon', 'Non-perishable Tuna', 'Coffee', 'Earth II Bovine Milk', 'Organic Cat nip', 'Synthetic Milk Substitute', 'Nip Chips', 'Fish Paste', 'Microwavable Hairball', 'Butt Flavor Breath Mints', 'Flash Frozen Bird', 'Caviar', 'Snack Sized Zucchini', 'Bread Slice with a hole already in it', 'Fabricated Yellow Cheese', '12Pack of Pre-Captured Mice'] },
  furniture: { brands: ['Kot', 'Iapetus Kat Elegant Appliances', 'Bombay', 'Havana Brown'], items: ['3-level Carpeted tree', 'Cardboard box', '2-level kitten tree', 'Coverd Bed', 'Tunnel', 'Cardboard Tube', 'Folding Cardboard Duplex', 'Excersize Wheel', 'Sock Hamper', 'Heated Keyboard Nap Pad'] },
  electronics: { brands: ['CREX', 'Deveon', 'Korat Electronics', 'Meo', 'Toyger'], items: ['Automatic Mouse', 'Hair Filter', '24inch Virtual Fish Pond', 'Re-winding Yarn Ball', 'Tooth-brush', 'Self-Rolling Felt Ball', 'Personal Space Pod', 'Auto-Stroller', 'Collar bell with 24 ringing sounds', 'CAT-BOUND Radio Transmitter', 'Retractable Feather Wand', 'Scoop Free Automated Litter Box', 'Scoop Free Automated Litter Box+ (25tb)', 'Dryer', 'Holo-Fishbowl', 'Self-Righting Light Tree'] },
  homeGood: { brands: ['Ms. Maine\'s', 'laPerm', 'Manx Manufacturing', 'Munchkin'], items: ['Scratch Board', 'Scratch Board with self healing inserts', 'Classic Yarn Ball', 'Fish Cologne', 'Warm Pad', 'Self-Filling Food Bowl', 'Telescope', 'Gift Card', 'Synthetic wool-lined booties', 'Sequien dress', 'pair of Denim Pants', 'Water Fountain', 'Ol time mouse shaped toy', '"Real Tounge" Grooming brush', 'False Whiskers', 'Bird Bone Hair Brush', 'Synthetic Cactus Plant', 'Litter Box', 'No Sand Litter Box', 'Children\'s Sandbox', 'Hydrophobic Pant', 'Top Hat & Monocle', 'Opera Glasses', 'Eye-Shaped Sunglasses', 'Watermelon Print Helmet', '"Hang In There" Poster', 'Rapier and boots', 'Real Fur Mane'] },
  collectable: { brands: ['Super Neko Spirit'], items: ['Fighter Figurine', 'Mage Figurine', 'Fighter Poster', 'Mage Poster', 'Fighter keychain'] }
}
const desc = ['%I% by %B%', '2 %B% brand %I%s', 'A %I%, made by the %B% company', 'One %B% style %I%', 'Some %I%s by %B%', 'A Dozen %I%s of vaious brands', 'One Broken %I%', 'A Pair of %B% %I%s', 'Just some generic %I%', 'A Home-made %I%', 'It\'s just and empty box', 'The %B% %I%', 'One %I%, made by %B%', 'A Simple %I%', 'A Charred %I%', 'A wet %B% %I%', 'One Fresh %B% %I%', 'An assortment of %I%s', 'A bunch of broken %B% %I%s', 'A Single Vintage %I% by the %B% company', 'A Spraypainted %I%, probably %B% in make', 'A Damaged %B% %I%', 'Just the empty box for a %B% %I%', 'A Box of %B% %I%s', 'A mold covered %I%']
const flavors = ['. The quality looks shotty.', '. The quality is supreme.', ' of average quality.', '. These are rare, you wonder where they were ordered from.', '. Quite ordinary', '. This Sector gets a lot of these...', '. You used to have one just like it.', ', along with a strange smell.', ', along with poorly written note. If only you could read Burmese.', '. By the looks, probably knock-off.', '. Meow.', '. "Daring aren\'t we."', '. Wonder what it tastes like.', '. Bet they are missing that.', '. What kind of Cat would order this.', '. Probably better this stays missing.', '. Reminds you of home.', '. You wonder if this is hazardous.', '. There is a hole in the box...', '.  The box is pretty beat up.', '. It looks like it was burned at some point.', ' and a little vommit.', '. Should return this one to the sender.', ' covered in hair.', '. Should Rush Ship this one next time.', '. Outside of the box says "FRAGILE".', '. The box is kinda soggy.', ' and it stinks.', ' but it seems to be missing something', ' and a note from grandma.', '. The Box has a warning label.', ' and a now long dead mouse.', '. The box is filled with trash.', '.  You wonder how this got lost.', ' in an oversized box.', ' stuffed into a box that is clearly too small.']

function random(arr, count = 1) {
  let out = ''
  for (let i = 0; i < count; i++) {
    out += arr[Math.floor(Math.random() * arr.length)]
  }
  return out
}

function chance(prob) {
  return Math.round(Math.random() * 100) < prob * 100
}

function randI(arr) {
  return Math.floor(Math.random() * arr.length)
}

function indexWrap(arr, start, move) {
  return arr[((start + arr.length) + move) % arr.length]
}
export function bool() {
  return Math.random() > 0.5
}

export function description() {
  const type = Object.keys(items)[randI(Object.keys(items))]
  const brand = items[type].brands[randI(items[type])]
  const item = items[type].items[randI(items[type])]
  let descLine = desc[randI(desc)]
  const flav = flavors[randI(flavors)]
  const brRx = /%B%/ig
  const itRx = /%I%/ig
  descLine = descLine.replace(brRx, brand)
  descLine = descLine.replace(itRx, item)
  return descLine + flav
}

export function tracking() {
  let trackingCode = ''
  for (let i = 1; i <= 2; i++) {
    for (let j = 1; j <= 3; j++) {
      if (chance(0.5)) {
        trackingCode += random(alph)
      } else {
        trackingCode += random(nums)
      }
    }
    trackingCode += '-'
  }
  trackingCode += random(alph).toLowerCase()
  return trackingCode
}

export function shippingTier() {
  return random(shippingTiers)
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
  return random(cryptos)
}

export function spaceDate(format) {
  const num1 = random(nums)
  const num2 = random(nums)
  switch (format) {
    case 'Union':
      return '0' + num1 + num2 + 'U'
    case 'Minkow':
      return num1 + '=' + num2 + '=' + num1
    case 'Tera' :
      return num1 + '/' + num2 + 'T'
    case 'Sol':
      // @ts-ignore
      return num1 + num2 + '☀'
  }
}

export function dateFormat() {
  return random(dateTypes)
}

export function postalStation() {
  return 'Not yet implemented'
}

export function postalHistory() {
  return 'Not yet implemented'
}

export function code() {
  const code = random(alph) + random(nums) + random(nums)
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
  if (!hasCode) return 'not in Quadrant'
  const code = random(nums) + random(alph)
  return code
}

export function planet() {
  return random(planets)
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

export function missingProperties(schemaObject, prob) {
  const keys = Object.keys(schemaObject)
  const missingKeys = keys.map(key => {
    // eslint-disable-next-line no-mixed-operators
    prob = key === 'trackingNumber' ? prob += trackingChance : prob
    if (Math.random() < prob) {
      return key
    }
    return null
  }).filter(n => n)
  return missingKeys
}

export function damageProperties(schemaObject, prob) {
  const dict = {}
  Object.keys(schemaObject).forEach(k => {
    prob = k === 'trackingNumber' ? prob += trackingChance : prob
    if (schemaObject[k]) {
      if (Math.random() < prob) dict[k] = damageProperty(schemaObject[k])
    }
  })
  return dict
}

export function damageKeys(schemaObject, prob) {
  const dict = {}
  Object.keys(schemaObject).forEach(k => {
    prob = k === 'trackingNumber' ? prob += trackingChance : prob
    if (Math.random() < prob) { dict[k] = damageProperty(k) }
  })
  return dict
}

export function damageProperty(prop) {
  const randomFill = random(glitchFills)
  const rand1 = Math.floor(Math.random() * (prop.toString().length / 2))
  const rand2 = Math.floor(Math.random() * (prop.toString().length / 2) + (prop.length / 2))
  const answers = ['not yet decided', 'maybe', 'unsure', 'ask again later']
  switch (typeof prop) {
    case 'string':
      if (chance(0.4)) {
        return cypherString(prop)
      } else if (parseInt(prop) && chance(0.6)) {
        logger.log('String Binary')
        return prop.split('').map(c => parseInt(c) ? binary(c) : c).join('')
      } else {
        prop = prop.split('')
        prop.splice(rand1, rand2, randomFill)
      }
      return prop.join('')
    case 'number' :
      return binary(prop)
    case 'boolean':
      return random(answers)
    default:
      return '...'
  }
}

export function damageShipment(shipment, difficulty) {
  const options = ['miss', 'miss', 'keys', 'vals', 'vals']
  const weights = { miss: 1, keys: 0.2, vals: 0.6 }
  let glitchChance = false
  let max = difficulty * 1.2
  const props = { ...diffCodeMap }
  const damages = { miss: {}, vals: {}, keys: {} }
  if (difficulty > 3) { shipment.missingProperties.push('trackingNumber'); damages.miss.trackingNumber = 5 }
  if (difficulty > 7) { shipment.damagedProperties.recipient = damageProperty(shipment.recipient); damages.vals.recipient = 4 }
  if (difficulty > 10) { max *= 1.15 }
  if (difficulty > 10) { glitchChance = chance(0.7) }
  if (difficulty > 17) { max *= 1.13 }

  if (glitchChance || shipment.glitch) { shipment.glitch = random(glitches); setGlitchData(shipment.glitch, shipment) }
  for (let points = 0; max >= points;) {
    const weight = random(Object.keys(props))
    const prop = random(props[weight])
    const rand = random(options)
    // logger.log('random picked', shipment.recipient, 'd' + difficulty, 'm' + max, 'p' + points, rand, prop, 'w' + weight)
    switch (rand) {
      case 'miss':
        points += pointCalc(damages, prop, weight, rand) * weights.miss
        shipment.missingProperties.push(prop)
        props[weight] = props[weight].filter(p => p !== prop)
        if (damages.vals[prop]) points -= parseFloat(damages.vals[prop]) * weights.vals
        if (damages.keys[prop]) points -= parseFloat(damages.keys[prop]) * weights.keys
        break
      case 'vals':
        points += pointCalc(damages, prop, weight, rand) * weights.vals
        shipment.damagedProperties[prop] = damageProperty(shipment[prop])
        break
      case 'keys':
        points += pointCalc(damages, prop, weight, rand) * weights.keys
        shipment.damagedKeys[prop] = damageProperty(prop)
        break
    }
    if (props[weight].length === 0) delete props[weight]
    // if (max < points)logger.error('Done', shipment.recipient, 'd' + difficulty, 'm' + max, 'p' + points, damages, shipment)
  }
}

function pointCalc(damages, prop, weight, rand) {
  if (damages.miss[prop] || damages[rand][prop]) {
    return 0
  }
  damages[rand][prop] = weight
  return parseFloat(weight)
}

function cypherString(string) {
  let out = ''
  if (chance(0.5)) { // full string cypher
    const num = Math.ceil(Math.random() * 3) * (chance(0.5) ? 1 : -1)
    for (let i = 0; i < string.length; i++) {
      const char = string[i].toLowerCase()
      if (!az.includes(char) && !digits.includes(char)) { continue }
      if (parseInt(char) >= 0) {
        const index = digits.findIndex(d => d === char)
        out += indexWrap(digits, index, num)
      } else {
        const index = az.findIndex(c => c === char)
        out += indexWrap(az, index, num)
      }
    }
    if (num > 0) {
      for (let i = 0; i < Math.abs(num); i++) {
        out += '.'
      }
    } else {
      for (let i = 0; i < Math.abs(num); i++) {
        out = '.' + out
      }
    }
    return out
  } else { // per character cypher
    for (let i = 0; i < string.length; i++) {
      const char = string[i].toLowerCase()
      if (!az.includes(char) && !digits.includes(string)) { continue }
      const num = Math.ceil(Math.random() * 2)
      if (parseInt(char) >= 0) {
        const index = digits.findIndex(d => d === char)
        out += indexWrap(digits, index, num)
      } else {
        const index = az.findIndex(c => c === char)
        out += indexWrap(az, index, num)
      }
      const rand = random(['_', '.', '-', '^', char])
      for (let i = 0; i < Math.abs(num); i++) {
        out += rand
      }
    }
  }
  return out
}

function binary(number) {
  return (parseInt(number) >>> 0).toString(2)
}
function setGlitchData(glitchName, shipment) {
  logger.log(glitchName, shipment)
  switch (glitchName) {
    case 'timer':
      shipment.glitchData = {
        faces: ['/ᐠ .ᆺ. ᐟ\\ﾉ', '/ᐠ .o. ᐟ\\ﾉ', '/ᐠ _ᆺ_ ᐟ\\ﾉ'],
        phrases: ['hurrrry', 'no time left', 'meow, no fast', 'you slow brr', 'sloooow....'],
        timeLimit: 80 - Math.ceil(shipment.difficultyRating * 3)
      }
      break
    // eslint-disable-next-line no-fallthrough
    default:
      shipment.glithData = {}
      break
  }
  shipment.glitchData.extraResults = Math.ceil(shipment.difficultyRating / 2.2)
  shipment.glitchData.failed = 0
}
