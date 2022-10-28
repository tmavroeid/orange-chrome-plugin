var AWS = require('aws-sdk');
const Swal = require('sweetalert2')
require('dotenv').config()

AWS.config.credentials = new AWS.CognitoIdentityCredentials({
IdentityPoolId: "eu-central-1:41f3f103-3fd5-4a1c-ac06-116d88d2bfce",
RoleArn: "arn:aws:iam::577496924222:role/Cognito_DynamoPoolUnauth_Role"
});
AWS.config.update({region: "eu-central-1"});
var docClient = new AWS.DynamoDB.DocumentClient();
document.getElementById("circularloader").style.display = "none";

document.getElementById("democratize-btn").addEventListener("click", function(){
   storeit()
});

function storeit() {
  products = []
  product_len = document.getElementById("product_list")
  accommodation = document.getElementById("accommodation_name")
  if(product_len != null){
    democratization_percentage = parseInt(document.getElementById('dempercentage').innerHTML)
    total_price = parseInt(document.getElementById('total').innerHTML)
    if (document.getElementById('dutch_auction').checked) {
      dutch_auction = "True"
    }else{
      dutch_auction = "False"
    }
    product_len = document.getElementById("product_list").rows.length
    for(var i = 1; i < product_len-1; i++) {
      products.push({'product_name': document.getElementById("product_list").rows.item(i).cells[0].innerHTML, 'product_price':document.getElementById("s".concat(i-1)).value, 'product_quantity':document.getElementById("product_list").rows.item(i).cells[3].innerHTML})
    }
    storeBasket(JSON.stringify(products), democratization_percentage, total_price, dutch_auction)
  }else if (accommodation!= null){
    democratization_percentage = parseInt(document.getElementById('dempercentage').innerHTML)
    total_price = parseInt(document.getElementById('total').innerHTML)
    if (document.getElementById('dutch_auction').checked) {
      dutch_auction = "True"
    }else{
      dutch_auction = "False"
    }
    accommodation=document.getElementById("accommodation_name").innerHTML
    checkin=document.getElementById("checkin").innerHTML
    checkout=document.getElementById("checkout").innerHTML
    storeAccommodation(accommodation,checkin,checkout,democratization_percentage, total_price, dutch_auction)
  }  
  
}

function storeBasket(products, democratization_percentage, total_price, dutch_auction) {
    document.getElementById("circularloader").style.display = "block";
    var now = new Date();
    const timestamp = new Date().toLocaleString(undefined, {
      day:    'numeric',
      month:  'numeric',
      year:   'numeric',
      hour:   '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
    var params = {
        TableName :"t_basket",
        Item:{
            "id": now.valueOf(),
            "timestamp": timestamp,
            "products": products,
            "dutch_auction": dutch_auction,
            "total_before": initialtotal.toFixed(2),
            "total_after": total_price,
            "dem_percent": democratization_percentage,
            "provider": provider
        },
    };
      
    
    docClient.put(params, function(err, data) {
        if (err) {
          document.getElementById('textarea').innerHTML = "Unable to add item: " + "\n" + JSON.stringify(err, undefined, 2);
          document.getElementById("circularloader").style.display = "none";
          Swal.fire({
            icon: "error",
            text: 'Something went wrong!',
            heightAuto: true,
            allowOutsideClick: false,
            imageHeight: 30,
          }).then(function() {
              window.close();
          });
        } else {
          document.getElementById("circularloader").style.display = "none";
          Swal.fire({
            icon: "success",
            text:"Your basket is submitted!",
            heightAuto: true,
            allowOutsideClick: false,
            imageHeight: 30,
          }).then(function() {
              window.close();
          });
          //document.getElementById('textarea').innerHTML = "PutItem succeeded: " + "\n" + JSON.stringify(data, undefined, 2);
        }
    });
}

function storeAccommodation(accommodation,checkin,checkout,democratization_percentage, total_price, dutch_auction) {
    document.getElementById("circularloader").style.display = "block";
    var now = new Date();
    const timestamp = new Date().toLocaleString(undefined, {
      day:    'numeric',
      month:  'numeric',
      year:   'numeric',
      hour:   '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
    console.log(accommodation,checkin,checkout,democratization_percentage, total_price, initialtotal, dutch_auction)
    var params = {
        TableName :"t_accommodation",
        Item:{
            "id": now.valueOf(),
            "timestamp": timestamp,
            "accommodation": accommodation,
            "checkin": checkin,
            "checkout": checkout,
            "dutch_auction": dutch_auction,
            "total_before": initialtotal.toFixed(2),
            "total_after": total_price,
            "dem_percent": democratization_percentage,
            "provider": provider
        },
    };
    docClient.put(params, function(err, data) {
        if (err) {
          document.getElementById('textarea').innerHTML = "Unable to add item: " + "\n" + JSON.stringify(err, undefined, 2);
          document.getElementById("circularloader").style.display = "none";
          Swal.fire({
            icon: "error",
            text: 'Something went wrong!',
            heightAuto: true,
            allowOutsideClick: false,
            imageHeight: 30,
          }).then(function() {
              window.close();
          });
        } else {
          document.getElementById("circularloader").style.display = "none";
          Swal.fire({
            icon: "success",
            text:"Your basket is submitted!",
            heightAuto: true,
            allowOutsideClick: false,
            imageHeight: 30,
          }).then(function() {
              window.close();
          });
          //document.getElementById('textarea').innerHTML = "PutItem succeeded: " + "\n" + JSON.stringify(data, undefined, 2);
        }
    });
}
