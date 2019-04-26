
const Authing = require('authing-js-sdk');

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
        clientId: '5c668c712e450b00017af455',
        secret: 'adafbe8412cb43293f4f739a5e9ef709'
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