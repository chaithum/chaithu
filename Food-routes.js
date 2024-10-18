 
const express = require('express')
 
const { getAllfoods, addItem, updateItem, deleteItem, updateAllItems } = require('../controller/Food-controller')
const FoodRouter = express.Router();
 
FoodRouter.get("/displayitems", getAllfoods)
FoodRouter.post("/addItem",addItem)
FoodRouter.put("/editItem/:id",updateItem)
FoodRouter.delete("/deleteItem/:id",deleteItem)
 
 
module.exports = FoodRouter;
 