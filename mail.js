const aws = require('aws-sdk');

exports.send = function(sessionParams){

    var emailParams = {
        Destination:{
            ToAddresses:[]
        },
        Message:{
            Subject:{
                Charset:'UTF-8',
                Data:''
            },
            Body:{
                Html:{
                    Charset:'UTF-8',
                    Data:''
                },
                Text:{
                    Charset:'UTF-8',
                    Data:''
                }
            }
        },
        Source:"alexa@hopefulloser.io",

    };
    emailParams.Destination.ToAddresses.push(sessionParams.toAddress);
    emailParams.Message.Subject.Data = sessionParams.subject;
    emailParams.Message.Body.Html.Data = sessionParams.message;

    const ses = new aws.SES({
        region:'us-west-2'
    });

    var email = ses.sendEmail(emailParams,function(err,data){
        if(err){
            console.log(err,err.stack);
        }
        else{
            console.log(data);
        }
    });
}


