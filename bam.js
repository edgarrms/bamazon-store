var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require("cli-table2");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "bamazon"

});

connection.connect();

var display = function () {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        console.log("----------------------------------");
        console.log("welcom to bamazon");
        console.log("----------------------------------");
        console.log("Below is your product");
    });
    var table = new Table({
        head: ["Product Id", "Product Description", "cost"],
        colWidths: [12, 50, 8],
        colAligns: ["center", "left", "right"],
        style: {
            head: ["aqua"],
            compact: true
        }
    });
}