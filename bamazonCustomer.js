var mysql = require("mysql");
var inquirer = require("inquirer");
var colors = require("colors");

var connection = mysql.createConnection({
    host: "localhost",
    port: 8889,

    user: "root",

    password: "root",
    database: "bamazonDB"
});
   

showItems();

function showItems() {
    inquirer.prompt({
        type: "list",
        message: "What would you like to view?",
        name: "answer",
        choices: ["All inventory", "Electronics", "Furniture", "Apparel", "Camping/Outdoors", "Tools"]
    }).then(function(data){
        var query;
        if(data.answer === "All inventory"){
            query = "SELECT * FROM products"
        }
        else{
            query = "SELECT * FROM products WHERE department = " + "'" + data.answer.toLowerCase() + "'"
        }
        connection.query( query , function (err, result, fields) {
            if (err) throw err;
            var productId = [];
            var stockQty = {};
            for(i = 0; i < result.length; i++){
            console.log("\n" + colors.green(result[i].id) + ") " + "Item: ".yellow + result[i].product_name  + "\n    Department: ".yellow + result[i].department + "\n    Price: ".yellow + "$"+ result[i].price + "\n    Stock: ".yellow +  result[i].stock_qty + "\n-------------------".blue);
            productId.push(result[i].id.toString() + ") " + result[i].product_name);
            stockQty[result[i].id] = (result[i].stock_qty);
        }
    })    

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
            if(data.count > stockQty[data.purchase[0]] || stockQty[data.purchase[0]] == 0 ){
                console.log("\nInsufficient Quantity!".red);
            }else{
                    connection.query("UPDATE products SET ? WHERE ?",
                [
                    {
                        stock_qty: stockQty[data.purchase[0]] - data.count 
                    },
                    {
                        id: data.purchase[0]
                    }
                ]);
                console.log("Purchase Complete!".green);
            }
        })
    });
}






