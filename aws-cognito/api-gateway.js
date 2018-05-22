const AWS = require('aws-sdk');
const apigClientFactory = require('aws-api-gateway-client').default;

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

  const conf = {
    invokeUrl: process.env.URL,
    accessKey: AWS.config.credentials.accessKeyId,
    secretKey: AWS.config.credentials.secretAccessKey,
    sessionToken: AWS.config.credentials.sessionToken,
    region: 'ap-northeast-1'
  };
  const apigClient = apigClientFactory.newClient(conf);

  apigClient.invokeApi({}, '/test/pets', 'OPTIONS')
    .then((res) => {
      console.log('ok: ' +res.status);
    })
    .catch((err) => {
      console.log('error: ' + err.response.status + ': ' + err.response.data.message) ;
      console.log();
    });
});

