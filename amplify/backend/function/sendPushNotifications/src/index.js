
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

var tableName = process.env.TABLENAME;
async function request(token) {
   
let resolve = function(r){
  console.log("RESOLVED");  
};
    let headers = { 'host': 'exp.host',
                    'accept': 'application/json',
                    'accept-encoding': 'gzip, deflate',
                    'content-type': 'application/json'
    };
    let options = {
         host: 'exp.host',
         path: '/--/api/v2/push/send',
         method: 'POST',
         headers: headers,
    };
    let body = [{
                "to": token,
                "sound": "default",
                "body": "A gentle nudge to take time for you & your partner today... Choose a treat and enjoy :)"
              }];
    
    return new Promise((resolve, reject) => {
        var req = https.request(options, callback);
        //This is the data we are posting, it needs to be a string or a buffer
        req.write(JSON.stringify(body));
        req.end();
    });
}

let fetchPushNotificationTokens = async function(context){
 
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
      TableName: tableName
    };
    let res;
    console.log("fetchPushNotificationTokens 2");
    await docClient.scan(params, function(err, data){
 
      if(err){
 
       //   context.done('error','reading dynamodb failed: '+err);
      }else{
 
          res = data;
        //  context.done(null, "OK");
     }
    }).promise();
    
    return res.Items;
}

async function sendRequest(element){
  
      await request(element);
  
}

exports.handler = async (event, context) => {
  
   let res =  await fetchPushNotificationTokens(context);
  var i;
   var requestPromises = [];
  for (i = 0; i < res.length; i++) {
    var element = res[i];
    console.log("token ", element.pushNotificationToken);
    if(element.pushNotificationToken){
      console.log("sending push notification... ", element.pushNotificationToken);
      requestPromises.push(request(element.pushNotificationToken));
    }
  }
  
  await Promise.all(requestPromises);
  const response = {
        statusCode: 200,
        body: JSON.stringify('Push Notifications Sent'),
    };
    return response;
};
