const AWS = require('aws-sdk');

AWS.config.region = 'ap-northeast-1';
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
  IdentityPoolId: process.env.POOL_ID,
  Logins: {
    'auth.login.yahoo.co.jp/yconnect/v2': process.env.ID_TOKEN
  }
});

AWS.config.credentials.get(function(err) {
  console.log(err);
  console.log("Cognito Identify Id: " + AWS.config.credentials.identityId);
  console.log('done');
});

