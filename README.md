# Nodejs-MySQL

## bamazonCustomer.js`. Running this application will first display all of the items available for sale. 
The app will prompt the following messages two messages.

* The first should ask them the ID of the product they would like to buy.
* The second message should ask how many units of the product they would like to buy.

![bamazonCustomer succesfull](../Nodejs-MySQL/images/image01.jpg)

* Once the customer has placed the order, the application checks if the store has enough of the product to meet the customer's request.

![bamazonCustomer out of stock](../Nodejs-MySQL/images/image02.jpg)



## bamazonManager.js`. Running this application will:

* List a set of menu options:
![bamazonManager list of options](../Nodejs-MySQL/images/image03.jpg)

* View Products for Sale: the app lists every available item: the item IDs, names, prices, and quantities.
![bamazonManager productsForSale](../Nodejs-MySQL/images/image04.jpg)
    
* View Low Inventory: it lists all items with an inventory count lower than five.
![bamazonManager productsForSale](../Nodejs-MySQL/images/image05.jpg)
    
* Add to Inventory: app displays a prompt that let the manager "add more" of any item currently in the store.
![bamazonManager productsForSale](../Nodejs-MySQL/images/image06.jpg)
    
* Add New Product: it should allow the manager to add a completely new product to the store.
![bamazonManager productsForSale](../Nodejs-MySQL/images/image07.jpg) ![table] (../Nodejs-MySQL/images/image08.jpg)



## bamazonSupervisor.js`. Running this application will list a set of menu options:

* View Product Sales by Department
![bamazonManager salesByDepartment](../Nodejs-MySQL/images/image09.jpg) & ![SQL] (../Nodejs-MySQL/images/image10.jpg)
| department_id | department_name | over_head_costs | product_sales | total_profit |
| ------------- | --------------- | --------------- | ------------- | ------------ |
| 01            | Electronics     | 10000           | 20000         | 10000        |
| 02            | Clothing        | 60000           | 100000        | 40000        |
   
* Create New Department
![bamazonManager addNewDepartment](../Nodejs-MySQL/images/image11.jpg)
