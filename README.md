# authing-lambda

Using Authing in AWS Lambda.

[Live Demo](https://sample.authing.cn/aws)

## Deploy lambda

### Install serverless

``` shell
$ npm install serverless -g
```

## Test Lambda

* `cd serverless-authorizer`
* `serverless deploy`
* Notice the displayed endpoint after deployment
* `curl --header "Authorization: allow" <endpoint>` - Should work! Authorized!
* `curl --header "Authorization: deny" <endpoint>` - Should not work
* `curl --header "Authorization: unauthorized" <endpoint>` - Should not work
* `curl --header "Authorization: blabla" <endpoint>` - Should not work
* `curl <endpoint>` - Should not work
