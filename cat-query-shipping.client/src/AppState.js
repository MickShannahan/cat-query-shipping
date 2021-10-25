import { reactive } from 'vue'

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  user: {},
  account: {},
  lostShipment: {},
  baseUrl: 'http://localhost:3000/api/shipments',
  searchResults: [],
  currentGuesses: [],
  chatTree:{
    'What am I supposed to do?': {
      text:"You're here to find lost shipments.  If you have already forgotten how to do that start with the 'get new shipment' button.  This will pull a lost shipment report so you can begin.  Keep in mind these lost shipment reports are usually damaged, and only contains some of the information about the missing shipment, sometimes the information itself is corrupted and only partially displayed.  Oh and Kid, please don't ask how to do your job again... it doesn't look good.",
      branches: {"[GO BACK]":"[GO BACK]"},
    },
    "Who are you?": {
      text: "Your Post Manager, Bozko Grumpybottom the 3rd. Just call me Bozko. I'm here to watch over you as you dig up lost shipments. Also I am here make sure if you hit a road-block or need assistence, then I can mark it down in your 'efficiency record'.  You can think of me like a score keeper... Oh did someone not leave the door open for you this morning? Don't look so irritated Kiddo.  I help out too.",
      branches: {"[GO BACK]": "[GO BACK]"},
    },
    "Can you help me?": {
      text: "If I had a Union Credit for each time you asked for help Kid, I might be able to afford that trip to Earth II.  Ah, fine.  You see that URL input field? try looking up the missing shipment using a query, you know the thing that comes after the '?', then select the correct manifest from the Database print out.  You're limited to 50 results so if you need to narrow your search just add more queries.",
      branches:{
        "What's A Query?": {
          text:"WHAT DO YOU MEAN WHAT IS A QUERY?!  Are you pulling my tail right now Kid?  I'm going to pretend I didn't here that and go refill my milk.  When I get back you better have looked up for yourself or something....sheesh.",
           branches: {"[GO BACK]": "[GO BACK]"}
          },
        "What if I want to Query multiple things?": {
          text:"That's Easy Kid, with the Adam Sandler... Ambulance... Amps-and-sand, you know that thing between the 6 and 7 key, just put that between each query.",
           branches: {"[GO BACK]": "[GO BACK]"}
          },
        '[GO BACK]': "[GO BACK]"
      }
    }
  }
})
