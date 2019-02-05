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
inquirer
    .prompt([{
            type: 'list',
            name: 'options',
            message: 'Hello! What would you like to do?',
            choices: [
                "View Products for Sale",
                "View Low Inventory",
                "Add to Inventory",
                "Add New Product"
            ]
        }

    ])
    .then(answers => {

        switch (answers.options) {

            case "View Products for Sale":
                productName();
                break;
            case "View Low Inventory":
                // code block
                break;
            case "Add to Inventory":
                // code block
                break;
            case "Add New Product":
                // code block
                break;
        }
    });

// function to grab the products
function productName() {

    var query = "SELECT * FROM products";
    connection.query(query, function (err, res) {
        for (var i = 0; i < res.length; i++) {
             let info = "";
            info += "Item: " + res[i].ID + ", ";
            info += "Product Name: " + res[i].product_name + ", ";
            info += "Department: " + res[i].department_name + ", ";
            info += "Price: $" + res[i].price+ ", ";
            info += "Quantity:"+ res[i].stock_quantity+ "\n";
            console.log(info);
          }
    })
};