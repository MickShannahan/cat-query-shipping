// Boz imports
import bozBase from '/src/assets/img/Boz/Cups-Manager-animate.gif'
import bozCasual from '/src/assets/img/Boz/BozCasualFriday.gif'
import bozBlink from '/src/assets/img/Boz/Cups-Manager-blink.png'
import bozAEI from '/src/assets/img/Boz/BozPhonicAEI.png'
import bozELTH from '/src/assets/img/Boz/BozPhonicELTH.png'
import bozFVJ from '/src/assets/img/Boz/BozPhonicFVJ.png'
import bozOUQ from '/src/assets/img/Boz/BozPhonicOUQ.png'
import bozR from '/src/assets/img/Boz/BozPhonicR.png'
// Kim imports
import kimBase from '/src/assets/img/Kimko/CUPSKimko-base.gif'
import kimBlink from '/src/assets/img/Kimko/CUPSKimko-blink.png'
import kimAEI from '/src/assets/img/Kimko/CUPSKimko-AEI.png'
import kimELTH from '/src/assets/img/Kimko/CUPSKimko-ELTH.png'
import kimFVJ from '/src/assets/img/Kimko/CUPSKimko-FVJ.png'
import kimOUQ from '/src/assets/img/Kimko/CUPSKimko-OUQ.png'
import kimR from '/src/assets/img/Kimko/CUPSKimko-R.png'


export class Character {
  constructor(data) {
    this.name = data.name
    this.nickName = data.nickName
    this.position = data.position
    this.job = data.job

    // Styles
    this.styles = {
      primary: data.styles.primary,
      secondary: data.styles.secondary,
      small: data.styles.small,
      header: data.styles.header == undefined ? true : data.styles.header,
      onlyCharacter: !!data.styles.onlyCharacter
    }

    // images
    this.images = {
      base: data.images.base,
      casual: data.images.casual,
      blink: data.images.blink,
      phonicAEI: data.images.phonicAEI,
      phonicELTH: data.images.phonicELTH,
      phonicFVJ: data.images.phonicFVJ,
      phonicOUQ: data.images.phonicOUQ,
      phonicR: data.images.phonicR
    }

    // Chat {'your dialog': {text: string, branches: [string]}}
    this.chatTree = data.chatTree
    this.startingBranch = data.startingBranch
  }
}

// STUB BOZKO
export const Bozko = new Character({
  name: 'Bozko',
  nickName: 'Boz',
  position: 'Lost Shipments Recovery Team',
  job: 'Manager',
  styles: {
    primary: 'warning'
  },
  images: {
    base: bozBase,
    casual: bozCasual,
    blink: bozBlink,
    phonicAEI: bozAEI,
    phonicELTH: bozELTH,
    phonicFVJ: bozFVJ,
    phonicOUQ: bozOUQ,
    phonicR: bozR

  },
  startingBranch: 'just a test',
  chatTree: {
    "[Open Window]": {
      text: "What's up Kid?",
      branches: ["Who are you?", "What am I supposed to do?", "Can you help me?", "just a test"]
    },
    "[Get Started]": {
      text: "Hi there! I'm so excited to see you join the team as one of our lost shipment search operators! Why don't you get started by clocking in, that's the button in the top right corner there.  Once you've done that, feel free to have a seat at one of the open terminals and get started!... *exhales* I'm not one for all that peppy intro stuff. Listen kid, the job pays by each shipment found so you might as well get to it you want to get paid.  I'll be in my office, let me know if you need any more help."
    },
    "just a test": { text: 'Welp it worked', branches: ['[Go Back]'] },
    'What am I supposed to do?': {
      text: "You're here to find lost shipments.  If you have already forgotten how to do that start with the 'get new shipment' button.  This will pull a lost shipment report so you can begin. Then use the 'HTTP' terminal there to search the database, and select the correct one from the manifest print-out. Keep in mind these lost shipment reports are usually damaged, and only contains some of the information about the missing shipment, sometimes the information itself is corrupted and only partially displayed.  Oh and Kid, please don't ask how to do your job again... it doesn't look good.",
      branches: ['[Go Back]'],
    },
    "Who are you?": {
      text: "Your Post Manager, Bozko Grumpybottom the 3rd. Just call me Boz. I'm here to watch over you as you dig up lost shipments. Also I am here make sure if you hit a road-block or need assistence, then I can mark it down in your 'efficiency record'.  You can think of me like a score keeper... Oh did someone not leave the door open for you this morning? Don't look so irritated Kiddo.  I help out too.",
      branches: ['[Go Back]'],
    },
    "Can you help me?": {
      //#region can you help me
      text: "If I had a Union Credit for each time you asked for help Kid, I might be able to afford that trip to Earth II.  Ah, fine.  You see that URL input field? try looking up the missing shipment using a query, you know the thing that comes after the '?', try searching one or many of the properties on the lost shipment report.",
      branches: ["What's A Query?", "How can I query multiple things?", "How Should I format my Query?", '[Go Back]']
    },
    "What's A Query?": {
      text: "WHAT DO YOU MEAN WHAT IS A QUERY?!  Are you pulling my tail right now Kid?  I'm going to pretend I didn't here that and go refill my milk.  When I get back you better have looked it up for yourself or something....sheesh.",
      branches: ['[Go Back]']
    },
    "How can I query multiple things?": {
      text: "That's Easy Kid, with the Adam Sandler?... Ambulance?... Amps-and-sand, you know that thing between the 6 and 8 key, just put that between each query.",
      branches: ['[Go Back]']
    },
    //#endregion can you help me
    "How Should I format my Query?": {
      text: "You're lucky Kid, old Boz here is a pro.  I used to be known for stringing together all sorts of 'Mad' queries.  Ah uh well, anyways.  As long as the API you're using supports it (like the lost shipment database), using queries makes getting back only the results you want easy.  It goes something like this: https://websiteLocation.com/api/collection?query=value.  The query begins after the question mark '?', and you specify the property you are searching by, then follows the value you want that property to have, like: '?planet=Neptune III' or '?insured=true'.",
      branches: ['[Go Back]']
    },
    "Report an Issue": {
      text: "All issues are to be reported to central processing, navigate here:\n <a href='https://github.com/MickShannahan/cat-query-shipping/issues' target='_blank'>catsups.un/processing/complaints/internal-issues</a>",
      branches: ['[Go Back]']
    }
  }
})


// STUB Kimko
export const Kimko = new Character({
  name: 'Kimko',
  nickName: 'Kiwi',
  position: 'Recovered Shipment Warehouse',
  job: 'Data Analyst',
  styles: {
    primary: 'info',
    small: false,
    onlyCharacter: false
  },
  images: {
    base: kimBase,
    casual: kimBase,
    blink: kimBlink,
    phonicAEI: kimAEI,
    phonicELTH: kimELTH,
    phonicFVJ: kimFVJ,
    phonicOUQ: kimOUQ,
    phonicR: kimR

  },
  startingBranch: 'just a test',
  chatTree: {
    "[Open Window]": {
      text: "Sup Nerd?",
      branches: ["Who are you?", "Can you help me?", "Liquidated Shipments"]
    },
    "Who are you?": {
      text: "My Name is Kimko, you can call me Kiwi though.  I'm part of the recovered shipments warehouse team.  I analyze the shipments that are found by your team and basically just make charts graphing data about them.  When they were lost, how long they were lost, what they had in them. Stuff like that.  I also Sell stuff down here.",
      branches: ['You have a shop?', '[Go Back]'],
    },
    "Can you help me?": {
      //#region can you help me
      text: "With what? Your job? Nah, not my thing. I don't really like desk work, that's why I work down here. However, I might be able to help you out another way. Ever heard of 'mods' before? I can help you get some.",
      branches: ["What are mods?", "How do I get mods?", '[Go Back]']
    },
    "What are mods?": {
      text: "Mods are little chips you can plug into your 'puter back upstairs. They can do a whole suite of things from helping you find shipments to keeping certain thing's off your employee record. They could really help you out when things get tough.",
      branches: ['[Go Back]']
    },
    "How do I get mods?": {
      text: "There are a few ways. You can buy them from me, you can find them in abandoned shipments or I can make them for you. For that though you'll need to get me the parts. Oh and I charge a fee...obviously.",
      branches: ["Parts?", "You have a shop?", "Abandoned Shipments?", '[Go Back]']
    },
    "Parts?": {
      text: "Yea computer parts. Wires, resistors, chips, leds, boards. All that good stuff. You can usually find those in abandoned shipments too or scrap junk you find for them.",
      branches: ['[Go Back]']
    },
    "You have a shop?": {
      text: "Yup! I sell mods that I find or make in it. Check back every once and a while cause I change it out frequently.",
      branches: ['[Go Back]']
    },
    "Abandoned Shipments": {
      text: "Ah yeah, most employees don't know about this perk of the job but it can be really nice. When shipments are recovered, the recipient is given a window of time to re-arrange another delivery attempt. When they miss that window they go up for sale to us. You'd buying the shipment without knowing what's inside though. So obviously no refunds.",
      branches: ['Anything good in them?', '[Go Back]']
    },
    "Anything good in them?": {
      text: "Sure.  They can have all sorts of stuff from mods to collectables.  But they can also often  be full of just junk too so buy at your own risk.",
      branches: ['[Go Back]']
    }
  }
})
// STUB Kimko shop variant
export const KimkoShop = new Character({
  name: 'KimkoShop',
  nickName: 'Kiwi',
  position: 'Recovered Shipment Warehouse',
  job: 'Data Analyst',
  styles: {
    primary: 'info',
    small: true,
    onlyCharacter: true
  },
  images: {
    base: kimBase,
    casual: kimBase,
    blink: kimBlink,
    phonicAEI: kimAEI,
    phonicELTH: kimELTH,
    phonicFVJ: kimFVJ,
    phonicOUQ: kimOUQ,
    phonicR: kimR

  },
  startingBranch: 'just a test',
  chatTree: {
    "[Open Shop]": {
      text: "Looking for something to buy?",
      branches: []
    },
    "Who are you?": {
      text: "My Name is Kimko, you can call me Kiwi though.  I'm part of the recovered shipments warehouse team.  I analyze the shipments that are found by your team and basically just make charts graphing data about them.  When they were lost, how long they were lost, what they had in them. Stuff like that.",
      branches: ['[Go Back]'],
    },
    "Can you help me?": {
      //#region can you help me
      text: "With what? Your job? Nah, not my thing. I don't really like desk work, that's why I work down here. However, I might be able to help you out another way. Ever heard of 'mods' before? I can help you get some.",
      branches: ["What are mods?", "How do I get mods?", '[Go Back]']
    },
    "What are mods?": {
      text: "Mods are little chips you can plug into your 'puter back upstairs. They can do a whole suite of things from helping you find shipments to keeping certain thing's off your employee record. They could really help you out when things get tough.",
      branches: ['[Go Back]']
    },
    "How do I get mods?": {
      text: "There are a few ways. You can buy them from me, you can find them in abandoned shipments or I can make them for you. For that though you'll need to get me the parts. Oh and I charge a fee...obviously.",
      branches: ["Parts?", "You have a shop?", "Abandoned Shipments?", '[Go Back]']
    },
    "Parts?": {
      text: "Yea computer parts. Wires, resistors, chips, leds, boards. All that good stuff. You can usually find those in abandoned shipments too or scrap junk you find for them.",
      branches: ['[Go Back]']
    },
    "You have a shop?": {
      text: "Yup! I sell mods that I find or make in it. Check back every once and a while cause I change it out frequently.",
      branches: ['[Go Back]']
    },
    "Abandoned Shipments": {
      text: "Ah yeah, most employees don't know about this perk of the job but it can be really nice. When shipments are recovered, the recipient is given a window of time to re-arrange another delivery attempt. When they miss that window they go up for sale to us. You'd buying the shipment without knowing what's inside though. So obviously no refunds.",
      branches: ['Anything good in them?', '[Go Back]']
    },
    "Anything good in them?": {
      text: "Sure.  They can have all sorts of stuff from mods to collectables.  But they can also often  be full of just junk too so buy at your own risk.",
      branches: ['[Go Back]']
    }
  }
})


// STUB Sulivan
// export const Sulivan = new Character()
