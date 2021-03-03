/*global AWS*/
const AWS = require('aws-sdk'); 

console.log('Loading function');
var dynamodb = new AWS.DynamoDB({apiVersion: '2012-08-10'});
var tableName = process.env.TABLENAME

exports.handler = (event, context, callback) => {
    var bodyJson = JSON.parse(event.body);
    console.log(bodyJson)
    console.log("formID = ", bodyJson.form_response.form_id, "USERID = ", bodyJson.form_response.hidden.userid, "ANSWERS = ", bodyJson.form_response.answers)
    
    var answers = bodyJson.form_response.answers;
    var refAnswers = '';
    var history = '';
    answers.forEach((answer)=>{
        var a = '';
        if (answer.type === 'text')
            a = answer.text;
        if (answer.type === 'choice')
            a = answer.choice.label;
        if (answer.type === 'number')
            a = answer.number;   
            
        if(answer.field.ref.startsWith('H-')){
            var code = answer.field.ref.split('-').join('');
            refAnswers += code.toLowerCase() + '='; 
            refAnswers += a + '&';
        }else{
            history += answer.field.ref + '='; 
            history += a + '&';    
        }
    })

    try{
        var code = '201';
        var date = new Date();
        var item = {
             formId: {
                 S: bodyJson.form_response.form_id,
             }, 
             params: {
                S: history,
             },
             refParams: {
                S: refAnswers,
             },
             userId : {
                S: bodyJson.form_response.hidden.userid ? bodyJson.form_response.hidden.userid : bodyJson.form_response.hidden.id 
             },
             createdAt: {
                 S: date.toISOString()
             },
             updatedAt: {
                S: date.toISOString()
            },
            id: {
                S: (Date.now() + Math.floor(Math.random() * 100)).toString()
            },
            journey: {
                S: bodyJson.form_response.hidden.journey
            },
        };
        console.log(item);
        dynamodb.putItem( {
           Item: item,
           TableName : tableName
        }, function(err, data) {
            if (err) {
                code = '500';
                console.log('Error putting item into dynamodb failed: '+err);
                context.fail('error');
                callback("Error in putItem "+err);
            }
            else {
                console.log('great success: '+JSON.stringify(data, null, '  '));
          
                context.done(null,  {"message":"success"});
            }
        });

    }catch(e){
         console.log('catch exception: ', e);
         context.fail("Caught: " + e);
    }
};