const AWS = require("aws-sdk");
new AWS.Config({secretAccessKey:"8L0XzYrcnBFtvaXciobYJ3n6JgJwcJIOKYQQha20",accessKeyId:"AKIA3C4IAUSSD7O7VXMC"});
const docClient = new AWS.DynamoDB.DocumentClient();
var elasticsearch = require('elasticsearch');

var client = new elasticsearch.Client({
  host: 'https://search-user-es-domain-cbh3aa2ijwjssjycd5m6bran5y.us-east-2.es.amazonaws.com',
  httpAuth: 'alphine:Alphine@9091',
  log: 'error',
  apiVersion: '7.2',
  
});
module.exports.es = async event => {
  for (var i=0;i<event.Records.length;i++){
    var record = event.Records[i];
    try{
    if (record.eventName === "INSERT"){
    var result = await client.create({
    index: 'users',
    type: 'firstname',
    id: record.dynamodb.NewImage.id+"",
    body:{
    id: record.dynamodb.NewImage.id+"",
    email: record.dynamodb.NewImage.email,
    firstname:
    record.dynamodb.NewImage.firstname,
    lastname:
    record.dynamodb.NewImage.lastname
    }
    });
    console.log("finished");
    console.log(result);
    }
    }
    catch(err){
    console.log(err);
    }
    }
return `Successfully processed ${event.Records.length} records.`;
};

  

