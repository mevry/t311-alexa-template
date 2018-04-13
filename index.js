'use strict';

const Alexa = require('alexa-sdk');

//Import intents
const defaultHandler = require('./defaultHandlerObject');
const adaServiceAnimalHousing = require('./intents/adaServiceAnimalHousing');
const additionsRemodels = require('./intents/additionsRemodels');
const animalControl = require('./intents/animalControl');

const APP_ID = 'amzn1.ask.skill.d65c018f-7aee-489f-b7f9-e7b599654a39';

exports.handler = (event, context, callback) => {
    const alexa = Alexa.handler(event, context, callback);
    alexa.appId = APP_ID;
    alexa.registerHandlers(
                        defaultHandler.defaultHandlerObject, 
                        adaServiceAnimalHousing.adaServiceAnimalHousingIntents,
                        additionsRemodels.additionsRemodelsIntents,
                        animalControl.animalControlIntents
    );
    
    alexa.execute();
};



