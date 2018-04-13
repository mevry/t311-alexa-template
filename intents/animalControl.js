exports.animalControlIntents = {
    "AnimalNuisanceIntent": function(){
        const intent = this.event.request.intent;
        
        if(!intent.slots.residentCity.value){
            const elicitSlot = 'residentCity';
            const speechOutput = 'Do you want contact information for Tacoma or for Fircrest?';
            const repromptSpeech = speechOutput;
            this.emit(':elicitSlot', elicitSlot, speechOutput, repromptSpeech);
        }
        const residentCity = intent.slots.residentCity.value;
        
        if(!intent.slots.contactType.value){
            const elicitSlot = 'contactType';
            const speechOutputEnd = 'If you would like, I can send you their contact information, call them for you, or both.';
            const repromptSpeech = 'Would you like me to send you their contact information, call them for you, or both?';

            switch(residentCity.toLowerCase()){           
                case "tacoma":
                    const speechOutput = `You can contact Tacoma Animal Care and Control. Their number is (253) 627-PETS. ${speechOutputEnd}`;
                    this.emit(':elicitSlot',elicitSlot,speechOutput,repromptSpeech);
                    break;
                case "fircrest":
                    this.response.speak("Call a doctor its fircrest.");
                    break;
                default:
                    this.response.speak("I don't know that area");
            }
            this.emit('responseReady');
        }
        const contactType = intent.slots.contactType.resolutions.resolutionsPerAuthority[0].values[0].value.name;
        
        switch(contactType){
            case 'send':
                this.response.speak("Email sent.");
                break;
            case 'call':
                this.response.speak("Dialing...");
                break;
            case 'both':
                this.response.speak("Email sent. Now dialing...");
                
            default:
                this.response.speak(`Contact type is: ${contactType}`);
            break;
        }
        this.emit(':responseReady');
        
    }
};