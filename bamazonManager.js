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
        message: "Welcome Mr Manager Dude, what would you like to do?",
        name: "answer",
        choices: ["View Products", "View Low Inventory", "Add to Inventory", "Add New Product", "Exit"]
    }).then(function(data){
        switch(data.answer) {
            case "Exit":
                console.log("\nThanks Mr Manager Dude!\n".green);
                connection.end();
            break;

            case "View Products":
                query = "SELECT * FROM products"
                showItems();
                goBack();
                
            break;

            case "Add New Product":
                query = "INSERT INTO products SET ?"
                addItem();
            
            break; 
            
            case "View Low Inventory":
                query = "SELECT * FROM products"
                lowInventory();
                goBack();

            break; 
            
            case "Add to Inventory":
            query = "SELECT * FROM products"
            addQty();

            
            function goBack() {    
                setTimeout (function(){   
                    inquirer.prompt({
                        type: "list",
                        message: "Would you like to go back to the main menu?",
                        name: "answer",
                        choices: ["Main Menu", "Exit"]
                    }).then(function(data){
                        if(data.answer === "Main Menu"){
                            start();
                        }else{
                            console.log("\nThanks Mr Manager Dude!\n".green);
                            connection.end();
                        }
                    })
                }, 1000) 
            }         
        }
        
    }) 
}

function showItems() {
    connection.query( query , function (err, result, fields){
        if (err) throw err;
        for(i = 0; i < result.length; i++){
        console.log("\n" + colors.green(result[i].id) + ") " + "Item: ".yellow + result[i].product_name  + "  |".blue + "    Department: ".yellow + result[i].department + "  |".blue + "    Price: ".yellow + "$"+ result[i].price + "  |".blue + "    Stock: ".yellow +  result[i].stock_qty + "\n------------------------------------".blue);
        }
    })
}

function addItem() {
    inquirer.prompt(
    [
        {
            type: "input",
            message: "Product name",
            name: "product"
        },
        {
            type: "input",
            message: "What department is it in?",
            name: "department"
        },
        {
            type: "input",
            message: "What's the price?",
            name: "price",
            validate: function(value) {
                if (isNaN(value) === false) {
                    return true;
                }
                return false;
                }
        },
        {
            type: "input",
            message: "How many do you want?",
            name: "qty",
            validate: function(value) {
                if (isNaN(value) === false) {
                    return true;
                }
                return false;
                }
        }
    ]).then(function(data){
        connection.query( query,
        {
            product_name: data.product,
            department: data.department,
            price: data.price,
            stock_qty: data.qty
        })
        console.log(data.product + " added to store!"); 
        setTimeout (function(){
            start();
        }, 1500)   
    })
}

function lowInventory() {
    connection.query( query, function (err, result, fields){
        if (err) throw err;
        for(i = 0; i < result.length; i++){
            if(result[i].stock_qty < 5){
                console.log("\n" + colors.green(result[i].id) + ") " + "Item: ".yellow + result[i].product_name  + "  |".blue + "    Department: ".yellow + result[i].department + "  |".blue + "  Price: ".yellow + "$"+ result[i].price + "  |".blue + "    Stock: ".red +  result[i].stock_qty + "\n------------------------------------".blue);
            }    
        }
    })
}

function addQty() {
    
    connection.query( query , function (err, result, fields) {
        if (err) throw err;
        var productId = [];
        var stockQty = {};
        for(i = 0; i < result.length; i++){
        productId.push(result[i].id.toString() + ") " + result[i].product_name);
        stockQty[result[i].id] = (result[i].stock_qty);
        }
       
        inquirer.prompt([
            {
                type: "list",
                message: "Which item would you like to increase the stock on?",
                name: "item",
                choices: productId
            },
            {
                type: "input",
                message: "By how much?",
                name: "count",
                validate: function(value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return false;
                    }
            }    

        ]).then(function(data){
            var itemId = data.item.split(")")[0];
            connection.query("UPDATE products SET ? WHERE ?",
                [
                    {
                        stock_qty: stockQty[parseInt(itemId)] += parseInt(data.count) 
                    },
                    {
                        id: itemId
                    }
                ]);
                console.log("\nQuantity Updated!".green + "\n");
                setTimeout (function(){
                    start();
                }, 1500)
         })
    });     
}
