require("dotenv").config();

const mysql = require("mysql");
const inquirer = require("inquirer");
//const keys = ("./keys.js");
//var password = keys;

//console.log(password);

const connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "Billyjoel1",
  database: "bamazon_db"
});

connection.connect(function(err) {
  if (err) throw err;
});

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


function productName() {
  var query = "SELECT product_name FROM products";
  connection.query(query, function(err, res) {
    for (var i = 0; i < res.length; i++) {
      console.log(res[i].product_name);
    }
  });
}

