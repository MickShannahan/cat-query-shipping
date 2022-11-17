import { az, random } from './Generators'
import { logger } from './Logger'

export function setGlitchData(glitchName, shipment) {
  logger.log(glitchName, shipment)
  switch (glitchName) {
    // STUB TIMER
    case 'timer':
      shipment.glitchData = {
        faces: ['/ᐠ .ᆺ. ᐟ\\ﾉ', '/ᐠ .o. ᐟ\\ﾉ', '/ᐠ _ᆺ_ ᐟ\\ﾉ'],
        phrases: ['hurrrry', 'no time left', 'meow, no fast', 'you slow brr', 'sloooow....'],
        lossFace: 'ฅ/ᐠ ｡ᆺ｡ ᐟ\\ﾉ',
        lossPhrases: ['brrrreow, you slow, good bye.', 'too slow, maybe next cycle', 'me gone now', 'you slow at job', 'starrrrs die fasterrr'],
        timeLimit: 80 - Math.ceil(shipment.difficultyRating * 3)
      }
      break
    // STUB BURNER
    case 'burner':
      // eslint-disable-next-line no-case-declarations
      const burns = {}
      for (let i = 0; i < Math.round(shipment.difficultyRating * 1.2); i++) {
        const letter = random(az)
        burns[letter] = burns[letter] ? burns[letter] + 1 : 1
        burns[letter] = burns[letter] > 3 ? 3 : burns[letter]
      }
      shipment.glitchData = {
        faces: ['/ᐠ ̷  ̷𝅒 ̷‸ ̷𝅒 ̷ ᐟ\\ﾉ', '/ᐠ ̷  ̷𝅒 ̷｡ ̷𝅒 ̷ ᐟ\\ﾉ', '/ᐠ ̷  ̷- ̷‸ ̷- ̷ ᐟ\\ﾉ'],
        phrases: ['that one\'s gone', 'to ashes', '...', 'nice and warm', 'you\'ll miss that one', 'light now, then dark', 'burrrrrn'],
        lossFace: 'ฅ/ᐠ ̷  ̷𝅒 ̷‸ ̷𝅒 ̷ ᐟ\\ฅﾉ',
        lossPhrases: ['... heh', '...nothing left...', 'success... for me', 'nice try. syke', 'balnce restored'],
        burned: burns
      }
      break
    // STUB SCRAMBLER
    case 'scrambler':
      // eslint-disable-next-line no-case-declarations
      const doesnt = ['missingProperties', 'damagedKeys', 'damagedProperties', 'description', 'glitch', 'glichData', 'postalHistory', 'postalStation', 'creditsWorth', 'hazard', 'found', 'difficultyRating']
      const scrambles = Object.keys(shipment).filter(k => !shipment.missingProperties.includes(k) && !doesnt.includes(k))
      const scrambleData = {}
      for (let i = 1; i <= Math.round(shipment.difficultyRating * 1.5); i++) {
        const one = random(scrambles)
        const two = random(scrambles)
        scrambleData[one] = two
      }
      const scramblePrint = {}
      for (let i = 1; i <= Math.round(shipment.difficultyRating * 1.5); i++) {
        const one = random(scrambles)
        const two = random(scrambles)
        scramblePrint[one] = two
      }
      shipment.glitchData = {
        scrambleData,
        scramblePrint,
        faces: ['(-Φ ω Φ-)', '(˵Φ ω Φ˵)', '(˵Φ Д Φ˵)'],
        phrases: ['misplaced thems', 'a b d c f e g', 'doesn\'t go there!', 'I hope Insured', 'merow', 'lost foreverrrr'],
        lossFace: 'ฅ(˵Φ Д Φ˵)ฅ',
        lossPhrases: ['Scramble kitty wins!', 'I have mixed feelings about this.', 'merow', 'Till next time', 'Let\'s do this again!']
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
