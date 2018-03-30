//Additions/Remodels Category

exports.additionsRemodelsIntents = {
    "AdditionRemodelCommercial":function(){
        this.emit(
            ':tell',
            `The City's Planning and Development Services Department is creating Tip Sheets to assist with commercial permit submittal. For questions about your project, please contact PDS at (253) 591-5030 or send an email to pdsquestions@cityoftacoma.org.`
    )},
    "AdditionRemodelResidential":function(){
        this.emit(
            ':tell',
            `The City's Planning and Development Services Department is creating Tip Sheets to assist with residential permit submittal. For questions about your project, please contact PDS at (253) 591-7857 or send an email to pdsquestions@cityoftacoma.org.`
    )}
};
