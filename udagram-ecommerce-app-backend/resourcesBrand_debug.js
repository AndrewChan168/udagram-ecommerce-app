let AWS = require('aws-sdk');
//var dynamodb = new AWS.DynamoDB();

var docClient = new AWS.DynamoDB.DocumentClient();

const newBrand = {
    brandId:'brand-01',
    brandName:'Testing New Brand',
    description:'The brand for testing',
}

/*
docClient.put({
    TableName:'Brands-dev',
    Item:newBrand
})

console.log(`Successful to create new Brand`);
*/

docClient.getItem({
    TableName:'Brands-dev',
    Key:'brand-01'
}).promise().then(brandDoc=>console.log(brandDoc))