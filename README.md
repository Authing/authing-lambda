# authing-lambda

Using Authing in AWS Lambda.

## Deploy lambda

### Install serverless

``` shell
$ npm install serverless -g
```

## Usage

* `cd serverless-authorizer`
* `serverless deploy`
* Notice the displayed endpoint after deployment
* `curl --header "Authorization: allow" <endpoint>` - Should work! Authorized!
* `curl --header "Authorization: deny" <endpoint>` - Should not work
* `curl --header "Authorization: unauthorized" <endpoint>` - Should not work
* `curl --header "Authorization: blabla" <endpoint>` - Should not work
* `curl <endpoint>` - Should not work
