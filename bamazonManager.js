var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
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
        selectAction();
    }
});

//Choose an action
function selectAction() {
    inquirer
        .prompt({
            name: "action",
            type: "rawlist",
            message: "Select an option",
            choices: [
                "View Products for Sale",
                "View Low Inventory",
                "Add to Inventory",
                "Add New Product"
            ]
        })
        .then(function (answer) {
            switch (answer.action) {
                case "View Products for Sale":
                    productsForSale();
                    break;

                case "View Low Inventory":
                    lowInventory();
                    break;

                case "Add to Inventory":
                    addInventory();
                    break;

                case "Add New Product":
                    addNewProduct();
                    break;
            }
        });
}

//List every available
function productsForSale() {
    var query = "SELECT item_id, product_name, price, stock_quantity FROM products";
    connection.query(query, function (err, res) {
        if (err) throw err;
        console.log("\nList of products available: ")
        console.table(res);
        selectAction();
    })
};

//list all items with an inventory count lower than five
function lowInventory() {
    var query = "SELECT COUNT(stock_quantity), product_name, item_id, department_name FROM products GROUP BY department_name HAVING COUNT(*) < 5";
    connection.query(query, function (err, res) {
        if (err) throw err;
        console.log("\nList of products with an inventory lower than 5 units in stock: ")
        console.table(res);
        selectAction();
    });
};

//Prompt to add more of any item currently in the store.
function addInventory() {
    inquirer
        .prompt([
            {
                name: "idProduct",
                type: "input",
                message: "What is the ID of the product?"
            },
            {
                name: "units",
                type: "input",
                message: "How many units do you want to add to the inventory?"
            }
        ])
        .then(function (answers) {
            var query = "SELECT * FROM products WHERE item_id = ?";
            connection.query(query, answers.idProduct, function (err, res) {
                if (err) throw err;

                for (var i = 0; i < res.length; i++) {
                    var counter = res[i].stock_quantity;

                    var query = "UPDATE products SET stock_quantity = ? WHERE item_id = ?";
                    connection.query(query, [parseInt(counter) + parseInt(answers.units), answers.idProduct], function (err, res) {
                        if (err) throw err;
                    })
                    console.log("Inventory updated\n");
                }
            })
        })
};


//Prompt that allows to add a new product
function addNewProduct() {
    console.log("\nFill the following information to add a new product:\n")
    inquirer
        .prompt([
            {
                name: "idProduct",
                type: "input",
                message: "What is the ID of the new product?"
            },
            {
                name: "name",
                type: "input",
                message: "What is the name of the product?"
            },
            {
                name: "department",
                type: "rawlist",
                message: "Select the department where the product belongs",
                choices: [
                    "Accesorios",
                    "Active Wear",
                    "Bolsas",
                    "Calzado",
                    "Electronica",
                    "Hogar",
                    "Muebles",
                    "Ropa",
                    "Videojuegos",
                    "Outdoors",
                    "Books"
                ]
            },
            {
                name: "price",
                type: "input",
                message: "What is the price of the product? (use only 2 decimals)"
            },
            {
                name: "units",
                type: "input",
                message: "How many units are in stock?"
            },
            {
                name: "sales",
                type: "input",
                message: "How much do you have in sales?"
            }
        ])
        .then(function (answers) {
            var query = "INSERT INTO products SET ?";
            connection.query(query,
                {
                    item_id: answers.idProduct,
                    product_name: answers.name,
                    department_name: answers.department,
                    price: answers.price,
                    stock_quantity: answers.units,
                    product_sales: answers.sales
                },
                function (err, res) {
                    if (err) throw err;
                    console.log("\nYour product has been added to the inventory.")
                    var query = "SELECT * FROM products";
                    connection.query(query, function (err, res) {
                        if (err) throw err;
                        console.table(res);
                        console.log("The list of products has been updated.\n")
                    })
                    selectAction();
                });
        })
};


