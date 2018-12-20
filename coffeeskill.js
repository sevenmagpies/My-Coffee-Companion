
//--------------------JSON--------------------------

{
    "interactionModel": {
        "languageModel": {
            "invocationName": "my coffee companion",
            "intents": [
                {
                    "name": "AMAZON.CancelIntent",
                    "samples": []
                },
                {
                    "name": "AMAZON.HelpIntent",
                    "samples": []
                },
                {
                    "name": "AMAZON.StopIntent",
                    "samples": []
                },
                {
                    "name": "AMAZON.FallbackIntent",
                    "samples": []
                },
                {
                    "name": "coffeeSummary",
                    "slots": [
                        {
                            "name": "coffeeName",
                            "type": "COFFEE_LIST"
                        }
                    ],
                    "samples": [
                        "can you tell me bout {coffeeName}",
                        "tell me about {coffeeName} on coffeeSummary",
                        "What is {coffeeName}",
                        "I want to hear about {coffeeName}",
                        "Tell me about {coffeeName}",
                        "{coffeeName}"
                    ]
                },
                {
                    "name": "AMAZON.NavigateHomeIntent",
                    "samples": []
                }
            ],
            "types": [
                {
                    "name": "COFFEE_LIST",
                    "values": [
                        {
                            "id": "ESPRESSO_ROAST",
                            "name": {
                                "value": "Espresso Roast",
                                "synonyms": [
                                    "espresso"
                                ]
                            }
                        },
                        {
                            "id": "ITALIAN_ROAST",
                            "name": {
                                "value": "Italian Roast",
                                "synonyms": [
                                    "italian"
                                ]
                            }
                        },
                        {
                            "id": "KOMODO_DRAGON",
                            "name": {
                                "value": "Komodo Dragon",
                                "synonyms": [
                                    "komodo"
                                ]
                            }
                        },
                        {
                            "id": "CAFE_VERONA",
                            "name": {
                                "value": "Cafe Verona",
                                "synonyms": [
                                    "verona"
                                ]
                            }
                        },
                        {
                            "id": "YUKON",
                            "name": {
                                "value": "Yukon"
                            }
                        },
                        {
                            "id": "GUATEMALA_ANTIGUA",
                            "name": {
                                "value": "Guatemala Antigua",
                                "synonyms": [
                                    "guatemala"
                                ]
                            }
                        },
                        {
                            "id": "PIKE_PLACE_ROAST",
                            "name": {
                                "value": "Pike Place Roast",
                                "synonyms": [
                                    "Pike Place",
                                    "Pike"
                                ]
                            }
                        },
                        {
                            "id": "VERANDA",
                            "name": {
                                "value": "Veranda"
                            }
                        },
                        {
                            "id": "SUMATRA",
                            "name": {
                                "value": "Sumatra"
                            }
                        },
                        {
                            "id": "BREAKFAST_BLEND",
                            "name": {
                                "value": "breakfast blend",
                                "synonyms": [
                                    "breakfast"
                                ]
                            }
                        },
                        {
                            "id": "WILLOW",
                            "name": {
                                "value": "willow"
                            }
                        }
                    ]
                }
            ]
        }
    }
}

//------------------Lambda------------------


const APP_ID = undefined;

const SKILL_NAME = 'My Coffee Companion';
const OPENING_MESSAGE = 'I can help you learn more about coffee. What would you like to know?';
const HELP_MESSAGE = 'I currently support all core coffees that are available at Starbucks. You can ask me about coffees by saying something such as \"tell me about Sumatra\", or you can say exit... What can I help you with?';
const HELP_REPROMPT = 'Tell me a coffee and I can tell you more about it.';
const STOP_MESSAGE = 'Goodbye!';
const FALLBACK_MESSAGE = `My Coffee Companion can't help you with that. I can help you find out more aout Starbucks core coffees, what coffee would you like to know about?`;

const FALLBACK_REPROMPT = 'What can I help you with?';

const handlers = {
    'LaunchRequest': function () {
    this.response.speak(OPENING_MESSAGE).listen(HELP_REPROMPT).cardRenderer('My Coffee Companion', OPENING_MESSAGE + 'Currently My Coffee Companion supports all core coffees that are available at Starbucks.');
    this.emit(':responseReady');
    },

    'AMAZON.HelpIntent': function () {

        this.response.speak(HELP_MESSAGE).listen(HELP_REPROMPT);
        this.emit(':responseReady');
    },
    'AMAZON.CancelIntent': function () {
        this.response.speak(STOP_MESSAGE);
        this.emit(':responseReady');
    },
    'AMAZON.StopIntent': function () {
        this.response.speak(STOP_MESSAGE);
        this.emit(':responseReady');
    },
    'AMAZON.FallbackIntent': function () {
        this.response.speak(HELP_MESSAGE).listen(HELP_REPROMPT);
    
        this.emit(':responseReady');
    
      },
    
      'coffeeSummary': function() {
      let coffeeSlot = this.event.request.intent.slots.coffeeName.value;
      let currentCoffee = getCoffeeKnowledge(coffeeData, 'coffeeName', coffeeSlot.toUpperCase()).summary;
      if (coffeeSlot){
        this.response.speak(currentCoffee + 'would you like to learn about another coffee?').listen(HELP_REPROMPT).cardRenderer('My Coffee Companion', currentCoffee);
        
        this.emit(':responseReady');
      } 
  }, 

};



exports.handler = function (event, context, callback) {
    const alexa = Alexa.handler(event, context, callback);
    alexa.APP_ID = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};
function getCoffeeKnowledge(data, propName, propValue) {
  for (var i=0; i < data.length; i++) {
    if (data[i][propName] == propValue) {
      return data[i];
    }
  }
}