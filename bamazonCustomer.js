var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 8889,

    user: "root",

    password: "root",
    database: "bamazonDB"
});


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

function showItems() {
    connection.query("SELECT * FROM products", function (err, result, fields) {
        if (err) throw err;
        for(i = 0; i < result.length; i++){
        console.log("\nItem: " + result[i].product_name + "\n" + "Department: " + result[i].department + "\n" + "Price: $" + result[i].price + "\nStock: " + result[i].stock_qty + "\n----------------");
        }
      });
    connection.end();
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