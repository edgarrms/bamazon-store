var mysql = require("mysql");
var inquirer = require("inquirer");

var options = {
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "password",
    database: "bamazon_db"
}

var connection = mysql.createConnection(options);
connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    var sql = 'select * from products';

    connection.query(sql, function (err, result) {
        if (err) throw err;
        console.log(result);
        customer();
    });
});



function customer() {
    inquirer
        .prompt([
            {
                name: "proId",
                type: "input",
                message: "Please enter the ID of the product you would like to buy. To exit press crtl + c",
                validate: function intChecker(proId) {
                    const reg = /^\d+$/;
                    return reg.test(proId) || "Enter a number for ID"
                }
            },
            {
                name: "total",
                type: "input",
                message: "Please enter the amount of units you would like to purchase.",
                validate: function intChecker(total) {
                    const reg = /^\d+$/;
                    return reg.test(total) || "Enter a number for units of item"
                }
            }
        ])

        .then(function (answer) {
            var sql = 'SELECT * FROM products WHERE product_id = ?';
            var val = parseInt(answer.proId);

            sql = mysql.format(sql, val);
            connection.query(sql, function (err, result) {

                if (answer.total <= result[0].stock_quantity) {
                    console.log("\nEnjoy your Item " + result[0].product_name + "(s)");

                    var userTotal = result[0].stock_quantity - answer.total;

                    connection.query(
                        "update products set ? where ?",
                        [
                            {
                                stock_quantity: userTotal
                            },
                            {
                                product_id: result[0].product_id
                            }
                        ]
                    )
                    var userCost = parseFloat((result[0].price * answer.total).toFixed(2));
                    console.log("\nYou owe $" + userCost)
                    customer();
                }
                else {
                    console.log("\nNot enough stock or we are currently out of stock.");
                    customer();
                }

            })
        })
}

