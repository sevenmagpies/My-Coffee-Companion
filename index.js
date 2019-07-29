'use strict';
const Alexa  =  require('alexa-sdk');

const APP_ID = undefined;

const SKILL_NAME = 'My Coffee Companion';
const OPENING_MESSAGE = 'I can help you learn more about coffee. What would you like to know?';
const HELP_MESSAGE = 'You can ask me about core coffees by saying tell me about Sumatra, or you can say exit... What can I help you with?';
const HELP_REPROMPT = 'What can I help you with?';
const STOP_MESSAGE = 'Goodbye!';

const coffeeData = [
  /* -----------------------------------------------------------------------------------------------------------------------------------------
  -----------------Start Blond Roasts--------------------------------------------------*/
     {
        coffeeName: "WILLOW",
        acidity: "The acidity for Willow is high", 
        notes: "Willow is a bright, complex coffee with a clean finish",
        roast: "Willow is a blond roasted coffee that is light bodied and mellow",
        region: "Willow beans come from both Africa and Latin America, making it a multi-regional coffee",
        process: "Willow is processed using a wash method",
        pairing: "Willow pairs well with lemony flavors such as; lemon bars, lemon cake and lemon cookies",
        summary: "Willow is a bright, high acidity, multi-region, washed, blond roasted coffee that pairs well with lemon due to its citrus notes"
    },{
        coffeeName: "VERANDA",
        acidity: "The acidity for Willow is high", 
        notes: "Willow is a bright, complex coffee with a clean finish",
        roast: "Willow is a blond roasted coffee that is light bodied and mellow",
        region: "Willow beans come from both Africa and Latin America, making it a multi-regional coffee",
        process: "Willow is processed using a wash method",
        pairing: "Willow pairs well with lemony flavors such as; lemon bars, lemon cake and lemon cookies",
        summary: "Willow is a bright, high acidity, multi-region, washed, blond roasted coffee that pairs well with lemon due to its citrus notes"
    },
      /* -----------------------------------------------------------------------------------------------------------------------------------------
  -----------------Start Medium Roasts--------------------------------------------------*/
        {
        coffeeName: "BREAKFAST BLEND",
        acidity: "The acidity for Breakfast Blend is high", 
        notes: "Breakfast Blend is a lively coffee with a crisp finish",
        roast: "Breakfast Blend is a medium roasted coffee that is balanced, smooth and rich",
        region: "Breakfast Blend is a coffee that comes from Latin America",
        process: "Breakfast Blend is processed using a wash method",
        pairing: "Breakfast Blend pairs well with foods such as; blueberry muffins and butter croissants",
        summary: "Breakfast Blend is a lively and crisp, high acidity, Latin American, washed, medium roasted coffee that pairs well with blueberry muffins and buttery pastries"
    },{
        coffeeName: "PIKE PLACE ROAST",
        acidity: "Pike Place Roast has a medium acidity", 
        notes: "Pike Place Roast has subtle notes of cocoa and toasted nuts",
        roast: "Pike Place is a medium roasted coffee that is smooth and balanced",
        region: "Pike Place beans are grown in Latin America",
        process: "Pike Place is processed using a wash method",
        pairing: "Pike Place pairs well with chocolate and nutty foods such as chocolate croissants and coffee cake",
        summary: "Pike Place Roast is a medium acidity, Latin American, washed, medium roasted coffee that pairs well with chocolate and nuts"
    },{
        coffeeName: "GUATEMALA ANTIGUA",
        acidity: "Guatemala Antigua has a medium acidity", 
        notes: "Guatemala Antigua is an elegant coffee with notes of lemon, chocolate and warm spices",
        roast: "Guatemala Antigua is a  medium roasted coffee that is rich, smooth and balanced",
        region: "Guatemala Antigua beans are grown in Latin America",
        process: "Guatemala Antigua is processed using a wash method",
        pairing: "Guatemala Antigua pairs well with rich chocolate foods such as chocolate croissants and brownies",
        summary: "Guatemala Antigua is a medium acidity, Latin American, washed, medium roasted coffee that pairs well with rich chocolate desserts"
    },{
        coffeeName: "YUKON",
        acidity: "Yukon is a medium acidity coffee", 
        notes: "Yukon is a hearty and well rounded coffee with herbal notes",
        roast: "Yukon is a medium roasted coffee that is balanced, smooth and rich",
        region: "Yukon beans come from both Asia and Latin America, making it a multi-regional coffee",
        process: "Yukon pairs well with warm spices like cinnamon making it great with coffee cake",
        summary: "Yukon is a well rounded, medium coffee and is rich with a medium acidity. Being from Asia and Latin-America it is both washed and semi-washed and pairs well with cinnamon foods like coffee cake"
    },
    
          /* -----------------------------------------------------------------------------------------------------------------------------------------
  -----------------Start Dark Roasts--------------------------------------------------*/
        {
        coffeeName: "SUMATRA",
        acidity: "The acidity for Sumatra is low", 
        notes: "Sumatra is a full-bodied coffee with herbal notes",
        roast: "Sumatra is a dark roasted coffee that is full-bodied and bold",
        region: "Sumatra is a coffee that is grown in the Asia/ Pacific region",
        process: "Sumatra is processed using a semi-washed method",
        pairing: "Sumatra pairs well with savory foods such as cheese. I recommend trying it with blue cheese popcorn, it is my facvorite",
        summary: "Sumatra is a full-bodied and herbal, low acidity, asia pacific, semi-washed, dark roasted coffee that pairs well with savory foods such as cheese"
    },{
        coffeeName: "CAFE VERONA",
        acidity: "Cafe Verona is a low acidity coffee", 
        notes: "Cafe Verona is balanced and rich with roasty sweet and dark cocoa notes",
        roast: "Cafe Verona is a dark roasted coffee that is bold and full bodied",
        region: "Cafe Verona beans come from both Asia and Latin America, making it a multi-regional coffee",
        process: "Cafe Verona is processed using both a wash and semi-washied method",
        pairing: "Due to it's chocolate notes Cafe Verona pairs well with items like; chocolate croissants and chocolate chip cookies",
        summary: "Cafe Verona is a balanced, rich dark coffee and it is bold and full bodied with a medium acidity. Being from Asia and Latin-America it is both washed and semi-washed and pairs well with chocolate"
    },{
        coffeeName: "KOMODO DRAGON",
        acidity: "Komodo Dragon is a low acidity coffee", 
        notes: "Komodo Dragon is earthy, with notes of fresh herbs and spice",
        roast: "Komodo Dragon is a dark roasted coffee that is complex, bold and full bodied",
        region: "Komodo Dragon beans come from Asia Pacific region",
        process: "Komodo Dragon is processed using both a wash and semi-washied method",
        pairing: "Komodo Dragon pairs well with rich buttery items like Croissants and cheese danish",
        summary: "Komodo Dragon is a complex, dark coffee that is bold and full bodied with a low acidity. It is both washed and semi-washed and pairs well with buttery foods such as a cheese danish."
    },{
        coffeeName: "ITALIAN ROAST",
        acidity: "Italian Roast is a low acidity coffee", 
        notes: "Italian Roast is roasty with notes of sweet carmalized sugar",
        roast: "Italian Roast is a dark rosted, rich coffee that is full-bodied and bold",
        region: "Italian Roast beans come from both Asia and Latin America, making it a multi-regional coffee",
        process: "Italian Roast is processed using a wash method",
        pairing: "Italian Roast pairs well with caramel and chocolate",
        summary: "Italian Roast is a roasty, low acidity, multi-region, washed, dark roasted coffee that pairs well with chocolate and caramel"
    },{
        coffeeName: "ESPRESSO ROAST",
        acidity: "Espresso Roast is a medium acidity coffee", 
        notes: "Espresso Roast is intense with notes of sweet carmalized sugar",
        roast: "Espresso Roast is a dark roasted, rich coffee that is full-bodied and bold",
        region: "Espresso Roast beans come from both Asia and Latin America, making it a multi-regional coffee",
        process: "Espresso Roast is processed using both a wash and semi-washied method",
        pairing: "Espresso Roast pairs well with chocolate desserts such as chocolate brownies and chocolate croissants ",
        summary: "Espresso Roast is an intense and caramelly. It is a medium acidity, multi-region coffee that is both washed and semi-washed. It is a dark roasted coffee it pairs well with chocolate brownies and chocolate croissants"
    },

]



const handlers = {
    'LaunchRequest': function () {
    this.response.speak(OPENING_MESSAGE)
    .listen()
    .cardRenderer('My Coffee Companion', OPENING_MESSAGE + 'Currently My Coffee Companion supports all core coffees that are available at Starbucks.');
     //this.response.reprompt = {
      //   outputspeech : HELP_REPROMPT
    // };
   this.response.shouldEndSession = true;
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
        this.response.speak(currentCoffee).cardRenderer('My Coffee Companion', currentCoffee);
        
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