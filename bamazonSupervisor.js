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
        console.log("---------------------------\n")
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
                "View Product Sales by Department",
                "Create New Department"
            ]
        })
        .then(function (answer) {
            switch (answer.action) {
                case "View Product Sales by Department":
                    salesByDepartment();
                    break;

                case "Create New Department":
                    addNewDepartment();
                    break;
            }
        });
}

//Product Sales by Department
function salesByDepartment() {
    var query = "SELECT departments.department_id, departments.department_name, departments.over_head_costs, products.product_sales, (products.product_sales - departments.over_head_costs) AS total_profit FROM departments LEFT JOIN products ON (departments.department_name = products.department_name) ORDER BY departments.department_id";

    connection.query(query, function (err, res) {
        if (err) throw err;
        console.table(res);
    })
    selectAction();
};

//Prompt that allows to add a new department
function addNewDepartment() {
    console.log("\nFill the following information to add a new department:\n")
    inquirer
        .prompt([
            {
                name: "idDepartment",
                type: "input",
                message: "What is the ID of the new department?"
            },
            {
                name: "department",
                type: "input",
                message: "What is the name of the department?"
            },
            {
                name: "cost",
                type: "input",
                message: "How much is the over head cost of this department?"
            }
        ])
        .then(function (answers) {
            var query = "INSERT INTO departments SET ?";
            connection.query(query,
                {
                    department_id: answers.idDepartment,
                    department_name: answers.department,
                    over_head_costs: answers.cost
                },
                function (err, res) {
                    if (err) throw err;
                    console.log("\nYour department has been added to the list.")
                    var query = "SELECT * FROM departments";
                    connection.query(query, function (err, res) {
                        if (err) throw err;
                        console.table(res);
                        console.log("The department's list has been updated.\n")
                    })
                    selectAction();
                });
        })
};