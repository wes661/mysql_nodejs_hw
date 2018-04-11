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
    message: "Would you like to view our inventory?",
    name: "answer",
    choices: ["Yes", "No"]
}).then(function(data){
    if(data.answer === "Yes"){
        showItems();
    }else{
        console.log("Have a nice day!");
    }
})

function showItems() {

    connection.query("SELECT * FROM products", function (err, result, fields) {
        if (err) throw err;
        for(i = 0; i < result.length; i++){
        console.log("\nItem: " + result[i].product_name + "\n" + "Department: " + result[i].department + "\n" + "Price: " + result[i].price + "\nStock: " + result[i].stock_qty + "\n----------------");
        }
      });
    
    connection.end();
    
  }