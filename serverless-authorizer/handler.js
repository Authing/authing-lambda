
const Authing = require('authing-js-sdk');
const axios = require('axios');

// Policy helper function
const generatePolicy = (principalId, effect, resource) => {
  const authResponse = {};
  authResponse.principalId = principalId;
  if (effect && resource) {
    const policyDocument = {};
    policyDocument.Version = '2012-10-17';
    policyDocument.Statement = [];
    const statementOne = {};
    statementOne.Action = 'execute-api:Invoke';
    statementOne.Effect = effect;
    statementOne.Resource = resource;
    policyDocument.Statement[0] = statementOne;
    authResponse.policyDocument = policyDocument;
  }
  return authResponse;
};

// Reusable Authorizer function, set on `authorizer` field in serverless.yml
module.exports.auth = async (event, context, cb) => {
  if (event.authorizationToken) {
    // remove "bearer " from token
    const token = event.authorizationToken.substring(7);

    const authing = await new Authing({
        clientId: '5cc2a350e056c76eea71db8a',
        secret: '91d61f8ab38feea2a61bdfa85d604954'
    });

    const result = await authing.checkLoginStatus(token);

    if(result.status) {
        cb(null, generatePolicy('user', 'Allow', event.methodArn));
    }else {
        cb('Unauthorized');
    }
  } else {
    cb('Unauthorized');
  }
};

// Public API
module.exports.publicEndpoint = (event, context, cb) => {
  cb(null, { message: 'Welcome to our Public API!' });
};

// Private API
module.exports.privateEndpoint = (event, context, cb) => {
  cb(null, { message: 'Only logged in users can see this' });
};
