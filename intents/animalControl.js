const mail = require('../mail');

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
                //ask for email
                if(!intent.slots.emailAddress.value){
                    const speechOutput = "What is your email address?";
                    const repromptSpeech = speechOutput;
                    this.emit(':elicitSlot','emailAddress',speechOutput, repromptSpeech);
                    break;
                }
                const emailAddress = 'derekjmiller@gmail.com';
                var department = '';
                var phoneNumber = '';
                var website = '';
                if(residentCity.toLowerCase() == 'tacoma'){
                    department = "Tacoma Animal Care and Control";
                    phoneNumber = '(253) 627-7387'
                    website = 'https://www.cityoftacoma.org/residents/animal_care_control'
                }else if(residentCity.toLowerCase() == 'fircrest'){
                    department = 'Fircrest Police Department';
                    phoneNumber = '(253) 565-1198';
                    website = 'https://www.cityoffircrest.net/government/fircrest-police/';
                }
                mail.send({
                    'toAddress':emailAddress,
                    'subject':'Tacoma First 311 - Animal Control Contact Info',
                    'message':
                        `<h3>Thank you for using Tacoma First 311</h3>
                        <br>Here is the information you requested:<br><br>
                        <strong>Topic:</strong> Reporting Animal Nuisance<br>
                        <strong>Responsible Department:</strong> ${department}<br>
                        <strong>Phone Number:</strong> ${phoneNumber}<br>
                        <strong>Website:</strong> ${website}`
                });
                this.response.speak(`Email Sent`);
                break;
            default:
                this.response.speak(`Thank you for using the Tacoma First Three One One Skill.`);
                break;
        }
        this.emit(':responseReady');


        
    }
};