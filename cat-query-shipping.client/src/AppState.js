import { reactive } from 'vue'

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  user: {},
  account: {},
  lostShipment: {},
  baseUrl: 'http://localhost:3000/api/shipments',
  searchValid:{ valid:true, noReserved:true, noUnsafe:true },
  searchResults: [],
  currentGuesses: [],
  lastDocPage: 'Orientation',
  chatBranch: {},
  lastBranches: [],
  chatTree:{
    "[Open Window]": {
      text: "What's up Kid?",
      branches: ["Who are you?", "What am I supposed to do?", "Can you help me?"]
    },
    'What am I supposed to do?': {
      text:"You're here to find lost shipments.  If you have already forgotten how to do that start with the 'get new shipment' button.  This will pull a lost shipment report so you can begin.  Keep in mind these lost shipment reports are usually damaged, and only contains some of the information about the missing shipment, sometimes the information itself is corrupted and only partially displayed.  Oh and Kid, please don't ask how to do your job again... it doesn't look good.",
      branches: ['[Go Back]'],
    },
    "Who are you?": {
      text: "Your Post Manager, Bozko Grumpybottom the 3rd. Just call me Boz. I'm here to watch over you as you dig up lost shipments. Also I am here make sure if you hit a road-block or need assistence, then I can mark it down in your 'efficiency record'.  You can think of me like a score keeper... Oh did someone not leave the door open for you this morning? Don't look so irritated Kiddo.  I help out too.",
      branches: ['[Go Back]'],
    },
    "Can you help me?": {
      text: "If I had a Union Credit for each time you asked for help Kid, I might be able to afford that trip to Earth II.  Ah, fine.  You see that URL input field? try looking up the missing shipment using a query, you know the thing that comes after the '?', then select the correct manifest from the Database print out.  You're limited to 50 results so if you need to narrow your search just add more queries.",
      branches:["What's A Query?", "What if I want to Query multiple things?", "How Should I format my Query?", '[Go Back]']
    },
    //#region can you help me
    "What's A Query?": {
      text:"WHAT DO YOU MEAN WHAT IS A QUERY?!  Are you pulling my tail right now Kid?  I'm going to pretend I didn't here that and go refill my milk.  When I get back you better have looked it up for yourself or something....sheesh.",
        branches: ['[Go Back]']
      },
    "What if I want to Query multiple things?": {
      text:"That's Easy Kid, with the Adam Sandler?... Ambulance?... Amps-and-sand, you know that thing between the 6 and 8 key, just put that between each query.",
        branches: ['[Go Back]']
      },
      //#endregion can you help me
    "How Should I format my Query?":{
      text: "You're lucky Kid, old Boz here is a pro.  I used to be known for stringing together all sorts of 'Mad' queries.  Ah uh well, anyways.  As long as the API you're using supports it like the lost shipment database, they you can search like a pro, getting back only the results you want.  It goes something like this: https://websiteLocation.com/api/collection?query=value.  The query begins after the question mark '?', and you specify the property you are searching by, then follows the value you want that property to have, like: '?planet=Neptune III' or '?insured=true'.",
    branches: ['[Go Back]']
    },
    "Report an Issue" : {
      text: "All issues are to be reported to central processing, navigate here:\n <a href='https://github.com/MickShannahan/cat-query-shipping/issues' target='_blank'>catsuniversalpostalservice.un/issues</a>",
      branches: ['[Go Back]']
    }
  }
})
