
const https = require('https')
const URL = require('url')
const AWS = require('aws-sdk'); 


let callback = function(response) {
  var str = ''
  response.on('data', function (chunk) {
    str += chunk;
  });

  response.on('end', function () {
    console.log(str);
  });
}

async function request(token) {
   
    let headers = { 'host': 'exp.host',
                    'accept': 'application/json',
                    'accept-encoding': 'gzip, deflate',
                    'content-type': 'application/json'
    }
    let options = {
         host: 'exp.host',
         path: '/--/api/v2/push/send',
         method: 'POST',
         headers: headers,
    };
    let body = [{
                "to": token,
                "sound": "default",
                "body": "Message from Gilly"
              }]
 
    return new Promise((resolve, reject) => {
        var req = https.request(options, callback);
        //This is the data we are posting, it needs to be a string or a buffer
        req.write(JSON.stringify(body));
        req.end();
    })
}

let fetchPushNotificationTokens = async function(context){
    console.log("fetchPushNotificationTokens");
    const docClient = new AWS.DynamoDB.DocumentClient();
    
    let timestamp = Date.now();
    
    var params = {
        
      ExpressionAttributeValues: {
        ':d':  timestamp
      },
      ExpressionAttributeNames: {
        "#pNT": "pushNotificationToken",
        "#LAD" : "lastActiveDay"
      },
      ProjectionExpression: '#pNT',
      FilterExpression: '#LAD < :d',
      TableName: 'User-okocdpar6fc7fc7xrcbnjtwt54-dev'
    };
    let res;
    console.log("fetchPushNotificationTokens 2");
    await docClient.scan(params, function(err, data){
       console.log("fetchPushNotificationTokens 3");
      if(err){
         console.log("fetchPushNotificationTokens error", data);
       //   context.done('error','reading dynamodb failed: '+err);
      }else{
          console.log("fetchPushNotificationTokens success", data);
          res = data;
        //  context.done(null, "OK");
     }
    }).promise();
    
    return res.Items;
}



exports.handler = async (event, context) => {
  
    let res =  await fetchPushNotificationTokens(context);
    res.forEach((element)=>{
      request[element.pushNotificationToken];
    })
    const response = {
        statusCode: 200,
        body: JSON.stringify('Push Notifications Sent'),
    };
    return response;
};
