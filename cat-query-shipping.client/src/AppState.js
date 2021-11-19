import { reactive } from 'vue'

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  user: {},
  account: {},
  profiles: [],
  lostShipment: {},
  baseUrl: 'http://localhost:3000/api/shipments',
  searchValid:{ valid:true, noReserved:true, noUnsafe:true },
  searchResults: [],
  loading: {
    lostShipment: false,
    thread: false
  },
  currentGuesses: [],
  lastDocPage: 'Orientation',
  chatBranch: {},
  lastBranches: [],
  chatTree:{
    "[Get Started]": {
      text: "Hi there! I'm so excited to see you join the team as one of our lost shipment search operators! Why don't you get started by clocking in, that's the button in the top right corner there.  Once you've done that, feel free to have a seat at one of the open terminals and get started!... *exhales* I'm not one for all that peppy intro stuff. Listen kid, the job pays by each shipment found so you might as well get to if you want to get paid.  I'll be in my office, hollar if you need any more help."
    },
    "[Open Window]": {
      text: "What's up Kid?",
      branches: ["Who are you?", "What am I supposed to do?", "Can you help me?"]
    },
    'What am I supposed to do?': {
      text:"You're here to find lost shipments.  If you have already forgotten how to do that start with the 'get new shipment' button.  This will pull a lost shipment report so you can begin. Then use the 'HTTP' terminal there to search the database, and select the correct one from the manifest print-out. Keep in mind these lost shipment reports are usually damaged, and only contains some of the information about the missing shipment, sometimes the information itself is corrupted and only partially displayed.  Oh and Kid, please don't ask how to do your job again... it doesn't look good.",
      branches: ['[Go Back]'],
    },
    "Who are you?": {
      text: "Your Post Manager, Bozko Grumpybottom the 3rd. Just call me Boz. I'm here to watch over you as you dig up lost shipments. Also I am here make sure if you hit a road-block or need assistence, then I can mark it down in your 'efficiency record'.  You can think of me like a score keeper... Oh did someone not leave the door open for you this morning? Don't look so irritated Kiddo.  I help out too.",
      branches: ['[Go Back]'],
    },
    "Can you help me?": {
      //#region can you help me
      text: "If I had a Union Credit for each time you asked for help Kid, I might be able to afford that trip to Earth II.  Ah, fine.  You see that URL input field? try looking up the missing shipment using a query, you know the thing that comes after the '?', try searching one or many of the properties on the lost shipment report.",
      branches:["What's A Query?", "How can I query multiple things?", "How Should I format my Query?", '[Go Back]']
    },
    "What's A Query?": {
      text:"WHAT DO YOU MEAN WHAT IS A QUERY?!  Are you pulling my tail right now Kid?  I'm going to pretend I didn't here that and go refill my milk.  When I get back you better have looked it up for yourself or something....sheesh.",
        branches: ['[Go Back]']
      },
    "How can I query multiple things?": {
      text:"That's Easy Kid, with the Adam Sandler?... Ambulance?... Amps-and-sand, you know that thing between the 6 and 8 key, just put that between each query.",
        branches: ['[Go Back]']
      },
      //#endregion can you help me
    "How Should I format my Query?":{
      text: "You're lucky Kid, old Boz here is a pro.  I used to be known for stringing together all sorts of 'Mad' queries.  Ah uh well, anyways.  As long as the API you're using supports it (like the lost shipment database), using queries makes getting back only the results you want easy.  It goes something like this: https://websiteLocation.com/api/collection?query=value.  The query begins after the question mark '?', and you specify the property you are searching by, then follows the value you want that property to have, like: '?planet=Neptune III' or '?insured=true'.",
    branches: ['[Go Back]']
    },
    "Report an Issue" : {
      text: "All issues are to be reported to central processing, navigate here:\n <a href='https://github.com/MickShannahan/cat-query-shipping/issues' target='_blank'>catsups.un/processing/complaints/internal-issues</a>",
      branches: ['[Go Back]']
    }
  }
})
