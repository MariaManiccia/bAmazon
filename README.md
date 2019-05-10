<h1>bAmazon</h1>

<h3>Here I created an Amazon-like storefront with MySQL. The app will take in orders from customers and deplete stock from the store's inventory. As a bonus task, you can track product sales across your store's departments and then provide a summary of the highest-grossing departments in the store.</h3>

<h2>Here are the instructions::</h2>

<h3>When running the bamazonCustomer page</h3>
1) Create a MySQL Database 
<img src="./images/SQL.png" alt="SQL Workbench screenshot">
<br>

2) Once the app has begun, it will display the items in the store the ask two questions:
The first should ask them the ID of the product they would like to buy.
The second message should ask how many units of the product they would like to buy.
<img src="./images/startScreen.png" alt="Start screen">
<br>

3) Once the customer has placed the order, the app will check if the store has enough of the product to meet the customer's request.
<img src="./images/end.png" alt="The end screen">
The database is also updated at that time.
<img src="./images/SQLupdate.png" alt="SQL Workbench update">
If not, the app should then prevent the order from going through.
<img src="./images/noMore.png" alt="Insufficiant quantity photo">
<br>
<br>

<h3>When running the bamazonManager page</h3>
<br>
<h4>Pick from a selection of options on this page!</h4>
<img src="./images/managerStart.png" alt="Manager start up page">
<br>
1) If a manager selects View Products for Sale, the app can list every available item: the item IDs, names, prices, and quantities.
<img src="./images/products.png" alt="Products View">
<br>
2) If a manager selects View Low Inventory, then it should list all items with an inventory count lower than five.
<img src="./images/lowQuant.png" alt="Low Quantity View">
<br>
3) If a manager selects Add to Inventory, the app will display a prompt that will let the manager "add more" of any item currently in the store.
<img src="./images/addInventory.png" alt="Adding inventory page">
<br>
4) If a manager selects Add New Product, it will allow the manager to add a completely new product to the store.
<img src="./images/newProduct.png" alt="New Product Added View">
<br>

Thank you to everyone involved!

