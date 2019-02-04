require("dotenv").config();

const mysql = require("mysql");
const inquirer = require("inquirer");

// connect with a mySql database
const connection = mysql.createConnection({
  host: "localhost",

  port: 3306,

  user: "root",

  password: "",
  database: "bamazon_db"
});

connection.connect(function (err) {
  if (err) throw err;
});

// first function to display the inventory
function fullDisplay() {
  query = "SELECT * FROM products";

  // Make the db query
  connection.query(query, function (err, data) {
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
    // start the sale!
    startGame();
  });

}

function startGame() {
  inquirer
    .prompt([{
        type: 'input',
        name: 'product',
        message: 'What is the ID of the product you would like to purchase?',
        validate: validateInput,
        filter: Number
      },
      {
        type: 'input',
        name: 'quantity',
        message: 'How many would you like?',
        validate: validateInput,
        filter: Number
      }
    ])
    .then(function (answer) {

      var product = answer.product;
      console.log(product);

      var quantity = answer.quantity;
      console.log(quantity)

      var query = "SELECT * FROM products WHERE ?";
      connection.query(query, {
        ID: answer.productId
      }, function (err, res) {


      });
    });
}

// to determine whether or not the input gathered is a number
function validateInput(value) {
  var integer = Number.isInteger(parseFloat(value));
  var sign = Math.sign(value);

  if (integer && (sign === 1)) {
    return true;
  } else {
    return 'Please enter a whole number larger than zero.';
  }
}


function productName() {
  var query = "SELECT product_name FROM products";
  connection.query(query, function (err, res) {
    for (var i = 0; i < res.length; i++) {
      console.log(res[i].product_name);
    }
  });
}


fullDisplay();