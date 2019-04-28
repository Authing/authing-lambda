const jwt = require('jsonwebtoken');

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

    try {
        let decoded = jwt.verify(token, 'YOUR_OIDC_APP_SECRET'),
          expired = (Date.parse(new Date()) / 1000) > decoded.exp
        if (expired) {
          cb('Unauthorized, Login information has expired.');
        }else {
          cb(null, generatePolicy('user', 'Allow', event.methodArn));
        }
      } catch (error) {
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
