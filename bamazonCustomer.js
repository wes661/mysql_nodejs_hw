var mysql = require("mysql");
var inquirer = require("inquirer");
var colors = require("colors");

var connection = mysql.createConnection({
    host: "localhost",
    port: 8889,

    user: "root",

    password: "root",
    database: "bamazon_DB"
});
var query;
   

start();

function start(){
    inquirer.prompt({
        type: "list",
        message: "What would you like to view?",
        name: "answer",
        choices: ["All inventory", "Electronics", "Furniture", "Apparel", "Camping/Outdoors", "Tools", "Exit"]
    }).then(function(data){
        if(data.answer === "Exit"){
            console.log("\nThanks for shopping with Bamazon!\n".green);
            connection.end();
        }
        else if(data.answer === "All inventory"){
            query = "SELECT * FROM products"
            showItems();
        }
        else{
            query = "SELECT * FROM products WHERE department = " + "'" + data.answer.toLowerCase() + "'"
            showItems();
        }
        
    }) 
}       

function showItems() {
    
    connection.query( query , function (err, result, fields) {
        if (err) throw err;
        var productId = [];
        var stockQty = {};
        for(i = 0; i < result.length; i++){
        console.log("\n" + colors.green(result[i].id) + ") " + "Item: ".yellow + result[i].product_name  + "\n    Department: ".yellow + result[i].department + "\n    Price: ".yellow + "$"+ result[i].price + "\n    Stock: ".yellow +  result[i].stock_qty + "\n-------------------".blue);
        productId.push(result[i].id.toString() + ") " + result[i].product_name);
        stockQty[result[i].id] = (result[i].stock_qty);
        }
        inquirer.prompt([
            {
                type: "list",
                message: "Which item would you like to buy?",
                name: "purchase",
                choices: productId
            },
            {
                type: "input",
                message: "How many would you like to buy",
                name: "count",
                validate: function(value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return false;
                    }
            }    

        ]).then(function(data){
            var itemId = data.purchase.split(")")[0];
            if(data.count > stockQty[itemId] || stockQty[itemId] == 0 ){
                console.log("\nInsufficient Quantity!".red + "\n");
                setTimeout (function(){
                    start();
                }, 1500)
            }else{
                    connection.query("UPDATE products SET ? WHERE ?",
                [
                    {
                        stock_qty: stockQty[parseInt(itemId)] - parseInt(data.count)
                    },
                    {
                        id: itemId
                    }
                ]);
                console.log("\nPurchase Complete!".green + "\n");
                setTimeout (function(){
                    start();
                }, 1500)
               
            }
        })
    });     
}






