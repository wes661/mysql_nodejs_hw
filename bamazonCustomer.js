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

var purchase;


function start(){
    inquirer.prompt({
        type: "list",
        message: "What would you like to view?",
        name: "answer",
        choices: ["All inventory", "Electronics", "Furniture", "Apparel", "Camping/Outdoors", "Tools", "Exit"]
    }).then(function(data){
        switch(data.answer) {
            case "All inventory":
                showItems();
                break;

            case "Electronics":
                showElectronics();
                break;

            case "Furniture":
                showfurniture();
                break;
            
            case "Apparel":
                showApparel();
                break;
                
            case "Camping/Outdoors":
                showCampingOutdoors();
                break;
            
            case "Tools":
                showTools();
                break;
                
            case "Exit":
                console.log("\nThanks for shopping with Bamazon!\n")
                setTimeout(function(){
                    connection.end();
                }, 1500);
            
                break;    
        }
    })
}    

showItems();

function showItems() {
    connection.query("SELECT * FROM products", function (err, result, fields) {
        if (err) throw err;
        var productId = [];
        for(i = 0; i < result.length; i++){
            console.log("\n" + colors.green(result[i].id) + ") " + "Item: ".yellow + result[i].product_name  + "\n    Department: ".yellow + result[i].department + "\n    Price: ".yellow + "$"+ result[i].price + "\n-------------------".blue);
            productId.push(result[i].id);
        }
        inquirer.prompt([
            {
                type: "list",
                message: "Which item would you like to purchase?",
                choices: productId,
                name: "purchase"
            },
            {
                type: "input",
                message: "How many do you want to purchase?",
                name: "count",
                // validate: function(value) {
                //     if (isNaN(value) === false) {
                //       return true;
                //     }
                //     return false;
                //   }
            }
        ]).then(function(data){

        })
        // console.log(productId[9]);
    });
}

function showElectronics() {
    connection.query("SELECT * FROM products WHERE department = 'electronics' ", function (err, result, fields) {
        if (err) throw err;
        for(i = 0; i < result.length; i++){
        console.log("\nItem: " + result[i].product_name + "\n" + "Department: " + result[i].department + "\n" + "Price: $" + result[i].price + "\nStock: " + result[i].stock_qty + "\n----------------");
        }
      });
    connection.end();
}

function showFurniture() {
    connection.query("SELECT * FROM products WHERE department = 'furniture' ", function (err, result, fields) {
        if (err) throw err;
        for(i = 0; i < result.length; i++){
        console.log("\nItem: " + result[i].product_name + "\n" + "Department: " + result[i].department + "\n" + "Price: $" + result[i].price + "\nStock: " + result[i].stock_qty + "\n----------------");
        }
      });
    connection.end();
}

function showApparel() {
    connection.query("SELECT * FROM products WHERE department = 'apparel' ", function (err, result, fields) {
        if (err) throw err;
        for(i = 0; i < result.length; i++){
        console.log("\nItem: " + result[i].product_name + "\n" + "Department: " + result[i].department + "\n" + "Price: $" + result[i].price + "\nStock: " + result[i].stock_qty + "\n----------------");
        }
      });
    connection.end();
}

function showCampingOutdoors() {
    connection.query("SELECT * FROM products WHERE department = 'camping/outdoors' ", function (err, result, fields) {
        if (err) throw err;
        for(i = 0; i < result.length; i++){
        console.log("\nItem: " + result[i].product_name + "\n" + "Department: " + result[i].department + "\n" + "Price: $" + result[i].price + "\nStock: " + result[i].stock_qty + "\n----------------");
        }
      });
    connection.end();
}

function showTools() {
    connection.query("SELECT * FROM products WHERE department = 'tools' ", function (err, result, fields) {
        if (err) throw err;
        for(i = 0; i < result.length; i++){
        console.log("\nItem: " + result[i].product_name + "\n" + "Department: " + result[i].department + "\n" + "Price: $" + result[i].price + "\nStock: " + result[i].stock_qty + "\n----------------");
        }
      });
    connection.end();
}

function checkStock(){
    connection.query("SELECT * FROM products.stock_qty", function (err, result, fields){
        console.log(result);
    })
}

