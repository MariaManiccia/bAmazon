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

// ask the user what they would like to do
function startPage() {
    inquirer
        .prompt([{
                type: 'list',
                name: 'options',
                message: 'Hello! What would you like to do?',
                choices: [
                    "View Products for Sale",
                    "View Low Inventory",
                    "Add to Inventory",
                    "Add New Product",
                    ""
                ]
            }

        ])
        .then(answers => {

            switch (answers.options) {

                case "View Products for Sale":
                    productName();
                    break;
                case "View Low Inventory":
                    lowInventory();
                    break;
                case "Add to Inventory":
                    addInventory();
                    break;
                case "Add New Product":
                    // code block

                    break;
            }
        });
};

// function to grab the products
function productName() {

    var query = "SELECT * FROM products";
    connection.query(query, function (err, res) {
        for (var i = 0; i < res.length; i++) {
            // grab and display the information
            let info = "";
            info += "Item: " + res[i].ID + ", ";
            info += "Product Name: " + res[i].product_name + ", ";
            info += "Department: " + res[i].department_name + ", ";
            info += "Price: $" + res[i].price + ", ";
            info += "Quantity:" + res[i].stock_quantity + "\n";
            console.log(info);
        }
    })
    // then end the connection
    connection.end();

};


// function to check for low inventory
function lowInventory() {
    // selecting the inventory under 5
    var query = "SELECT * FROM products";
    connection.query(query, function (err, res) {

        for (var i = 0; i < res.length; i++) {

            if (res[i].stock_quantity <= 5) {
                let lowQuant = "";
                lowQuant += "Item: " + res[i].ID + ", ";
                lowQuant += "Product Name: " + res[i].product_name + ", ";
                lowQuant += "Quantity:" + res[i].stock_quantity + "\n";
                console.log(lowQuant);
            }
        }
        // then end the conenction
        connection.end();

    });
};


// function to add to the inventory in SQL
function addInventory() {
    // prompt to ask which product and how many they would like to add
    inquirer
        .prompt([{
                type: 'input',
                name: 'product',
                message: 'What is the name of the product you would like to add more of?',
            },
            {
                type: 'input',
                name: 'quantity',
                message: 'How many would you like to add?',
                validate: validateInput,
		        filter: Number
            }
        ])
        .then(function (answer) {
                // grabbing the answer
                var quantity = answer.quantity;
                var productName = answer.product;

                // connecting wtih SQL
                var queryStr = 'SELECT * FROM products WHERE ?';

                connection.query(queryStr, {
                        product_name: productName
                    }, function (err, data) {
                        if (err) throw err;
                        // if the item doesnt exist
                        if (data.length === 0) {
                            console.log('ERROR: Invalid Item. Please select a valid item.');
                            addInventory();

                        } else {
                            // grabbing which item was chose
                            var productData = data[0];
                            // updating the database
                            var query = 'UPDATE products SET stock_quantity = ' + (productData.stock_quantity + quantity) + ' WHERE product_name = ' + productName;
                            connection.query(query, function (err, res) {

                                console.log(productName + ' has been updated to ' + (productData.stock_quantity + quantity) + ' items.');
                                
                                connection.end();

                            });
                        };
                        });

                });

            };

            // function to vaildate numbers
            function validateInput(value) {
                var integer = Number.isInteger(parseFloat(value));
                var sign = Math.sign(value);
              
                if (integer && (sign === 1)) {
                  return true;
                } else {
                  return 'Please enter a whole number larger than zero.';
                }
            };

                startPage();