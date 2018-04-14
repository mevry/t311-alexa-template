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
        
        if(!intent.slots.contactConfirm.value){
            const elicitSlot = 'contactConfirm';
            const speechOutputEnd = 'Would you like me to send you their contact information?';
            const repromptSpeech = speechOutputEnd;
            let speechOutput = '';
            switch(residentCity.toLowerCase()){           
                case "tacoma":
                    speechOutput = `You can contact Tacoma Animal Care and Control. Their number is (253) 627-7387. ${speechOutputEnd}`;
                    this.emit(':elicitSlot',elicitSlot,speechOutput,repromptSpeech);
                    break;
                case "fircrest":
                    speechOutput = `You can contact Fircrest Police. Their number is (253) 565-1198. ${speechOutputEnd}`;
                    this.emit(':elicitSlot',elicitSlot,speechOutput,repromptSpeech);
                    break;
                default:
                    this.response.speak("I don't know that area");
            }
            this.emit(':responseReady');
        }
        const contactConfirm = intent.slots.contactConfirm.resolutions.resolutionsPerAuthority[0].values[0].value.name;
        
        switch(contactConfirm){
            case 'yes':
                this.response.speak("Email sent.");
                break;
            case 'no':
                this.response.speak("You said no");
                break; 
            default:
                this.response.speak(`Contact type is: ${contactType}`);
                break;
        }
        this.emit(':responseReady');
        
    }
};