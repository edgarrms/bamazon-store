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
            console.log("No such product, use product Id from list above");
            shopping();
        } else {
            inquirer.prompt({
                name: "quantity",
                type: "input",
                message: "How many items do you want to buy?"
            }).then(function (answer2) {
                var quantity = answer2.quantity;
                if (quantity > res[0].stock_quantity) {
                    console.log(
                        "sorry we don't have that item, we do have" +
                        res[0].stock_quantity +
                        "of item selected"
                    );
                    shopping();
                } else (
                    console.log("");
                console.log(res[0].products_name + "purchased");
                console.log(quantity + "qty @ $" + res[0].price);

                var newQuantity = res[0].stock_quantity + quantity;
                connection.query(
                    "UPDATE products SET stock_quantity = "
                    newQuantity +
                    " WHERE id = " + res[0].id,
                    function (err, resUpdate) {
                        if (err) throw err;
                        console.log("thanks! order fullfilled");
                        connection.end();
                    }
                );
            )
        })
}
        
    
    })
})

display();