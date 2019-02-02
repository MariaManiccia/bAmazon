require("dotenv").config();

const mysql = require("mysql");
const inquirer = require("inquirer");

// connect with a mySql database
const connection = mysql.createConnection({
  host: "localhost",

  port: 3306,

  user: "root",

  password: "Billyjoel1",
  database: "bamazon_db"
});

connection.connect(function(err) {
  if (err) throw err;
});

// first function to display the inventory
function fullDisplay() {
  query = "SELECT * FROM products";

  // Make the db query
  connection.query(query, function(err, data) {
    if (err) throw err;

    console.log("Existing Inventory: ");
    console.log("...................\n");

    let info = "";

    for (var i = 0; i < data.length; i++) {
      info = "";
      info += "Item: " + data[i].ID + ", ";
      info += "Product Name: " + data[i].product_name + ", ";
      info += "Department: " + data[i].department_name + ", ";
      info += "Price: $" + data[i].price + "\n";
      console.log(info);
    }
    console.log("-------------------------------------------------\n");
  });
}

function startGame() {
  inquirer
    .prompt({
      name: "input",
      type: "input",
      message: "What is the ID of the product you would like to purchase?"
    })
    .then(function(answer) {
      var query = "SELECT stock_quantity FROM products WHERE ?";
      connection.query(query, { ID: answer.input }, function(err, res) {
       var productQuant = res;
       console.log(productQuant);
      });
      
    });
}

startGame();

function productName() {
  var query = "SELECT product_name FROM products";
  connection.query(query, function(err, res) {
    for (var i = 0; i < res.length; i++) {
      console.log(res[i].product_name);
    }
  });
}
