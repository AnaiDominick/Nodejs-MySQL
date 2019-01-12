var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Anai796882+",
    database: "bamazon_DB"
});

//Check connection
connection.connect(function (err) {
    if (err) {
        console.log(err);
    }
    else {
        console.log("Connection succesful. ")
        console.log("---------------------------")
        allItems();
    }
});

// Display all of the items available for sale (Include the ids, names, and prices).
function allItems() {
    connection.query("SELECT item_id, product_name, price FROM products", function (err, res) {
        if (err) throw err;
        console.log("\nList of products available: ")
        console.table(res);
        runSearch();
    })
};

//Prompt questions to the client
function runSearch() {
    inquirer
        .prompt([
            {
                name: "idProduct",
                type: "input",
                message: "What is the ID of the product you would like to buy?"
            },
            {
                name: "units",
                type: "input",
                message: "How many units of the product would you like to buy?"
            },
            {
                name: "confirm",
                type: "confirm",
                message: "Ready to place our order?",
                default: true
            }
        ])
        .then(function (answers) {
            var query = "SELECT * FROM products WHERE item_id = ?";
            connection.query(query, answers.idProduct, function (err, res) {
                if (err) throw err;

                for (var i = 0; i < res.length; i++) {
                    //If there are products in stock, the client will see the info of the product selected and the total.
                    if (answers.units <= res[i].stock_quantity) {
                        console.log("\nProduct selected: " + res[i].product_name + " || Quantity: " + answers.units + " || Price: $" + res[i].price  + " || Total: $" + res[i].price * answers.units + "\n");
                        console.log("Proceed to checkout")
                        console.log("---------------------------------------------\n")
                        updateInventory(answers);
                        updateSales(answers);
                    }
                    //Otherwise the client will see a message of Insufficient quantity!
                    else {
                        console.log("\nWe are sorry! Your product, " + res[i].product_name + ", is out of stock.\n");
                    }
                }
            });
        })
        
}

//Function to update inventory once the client has placed his order.
function updateInventory(answers) {
    var query = "SELECT * FROM products WHERE item_id = ?";
    connection.query(query, answers.idProduct, function (err, res) {
        if (err) throw err;

        for (var i = 0; i < res.length; i++) {
            var counter = res[i].stock_quantity;

            var query = "UPDATE products SET stock_quantity = ? WHERE item_id = ?";
            connection.query(query, [counter-answers.units, res[i].item_id], function (err, res) {
                if (err) throw err;
            })
            console.log("Inventory updated");
        }
    })
}

//Function to update the product sales
function updateSales(answers) {
    var query = "SELECT * FROM products WHERE item_id = ?";
    connection.query(query, answers.idProduct, function (err, res) {
        if (err) throw err;

        for (var i = 0; i < res.length; i++) {
            var counter = res[i].price*answers.units;

            var query = "UPDATE products SET product_sales = ? WHERE item_id = ?";
            connection.query(query, [parseInt(counter) + parseInt(res[i].product_sales), res[i].item_id], function (err, res) {
                if (err) throw err;
            })
            console.log("Sales updated");
        }
    })
}


