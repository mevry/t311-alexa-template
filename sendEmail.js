const aws = require('aws-sdk');
const ses = new aws.SES({
    accessKeyId:'',
    secretAccessKey:'',
    region:'us-west-2'
});

var params = {
    Destination:{
        BccAddresses:[],
        CcAddresses:[],
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
    ReplyToAddress:[],
    ReturnPath:'',
    ReturnPathArn:'',
    Source:"alexa@hopefulloser.io",
    SourceArn:''
};
ses.sendEmail(params,function(err,data){
    if(err){
        console.log(err,err.stack);

    }
    else{
        console.log(data);
    }
})