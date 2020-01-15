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
    for (var i = 0; i < res.length; i++) {
        table.push([res[i].id, res[i].products.name, res[i].price]);
    }
    console.log(table.toString());
    console.log("");
};

var shopping + function () {
    inquirer.prompt({
        name: "productToBuy",
        type: "input",
        message: "Enter product Id to purchase"
    })
}.then(function (answer) {
    var selection = answer1 - productToBuy;
    connection.query("SELECT * FROM products WERE Id=?", selection, function (err, res) {
        if (err) throw err;
        if (res.length === 0) {
            console.log("No such product, use product Id from list above")
        };
    })
})

display();