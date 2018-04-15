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
//variable for querying proper info from database, variable is set based on user selection from initial prompt
var query;
   

start();

//Function that starts bamazon customer app
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

//Function that displays products based on users selection
function showItems() {
    
    connection.query( query , function (err, result, fields) {
        if (err) throw err;
        var productId = [];
        var stockQty = {};
        for(i = 0; i < result.length; i++){
        console.log("\n" + colors.green(result[i].id) + ") " + "Item: ".yellow + result[i].product_name  + "  |".blue + "    Department: ".yellow + result[i].department + "  |".blue + "    Price: ".yellow + "$"+ result[i].price + "  |".blue + "    Stock: ".yellow +  result[i].stock_qty + "\n------------------------------------".blue);
        //Adding product Id to blank array to be populated to 'choices'//
        productId.push(result[i].id.toString() + ") " + result[i].product_name);
        //Populating stockQty object with the stock_qty from the id of the item selected for purchasing. To be referenced for updating the stock_qty in the database//
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






