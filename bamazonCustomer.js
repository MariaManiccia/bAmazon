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

      // grab the answers
      var product = answer.product;
      console.log(product);

      var quantity = answer.quantity;
      console.log(quantity)

      // make the connection to the database
      var query = "SELECT * FROM products WHERE ?"; 
      connection.query(query, {ID: answer.product}, function (err, res) {
        if (answer.length === 0) {
          console.log('ERROR: Invalid Item ID. Please select a valid Item ID.');
          fullDisplay();
        }
        else {
          var productData = res[0];

          // check if the store has enough in stock
          if (quantity <= productData.stock_quantity) {
              console.log('Placing order now!');
              // update the database
              var updateQueryStr = 'UPDATE products SET stock_quantity = ' + (productData.stock_quantity - quantity) + ' WHERE ID = ' + product;
              // make the connection
              connection.query(updateQueryStr, function (err, data) {
                  if (err) throw err;
                  // place the order
                  console.log('Your order has been placed. Your total is $' + productData.price * quantity);
                  console.log('Thanks for your order!');
                  console.log("\n---------------------------------------------------------------------\n");

                  // end the database connection
                  connection.end();
              })
        }
        else {
          console.log('Sorry, insufficient quantity!');
          console.log('Please try a different item.');
          console.log("\n---------------------------------------------------------------------\n");

          fullDisplay();
      }
    }
  });
});
};
      
  

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

fullDisplay();