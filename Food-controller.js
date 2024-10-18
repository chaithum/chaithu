const Food = require('../model/Food')
 
const getAllfoods = async(req, res, next) => {
    let item;
 
    try {
        item = await Food.find()
    }
    catch(err){
        console.log(err)
    }
    if(!item){
        return res.status(404).json({ message : "item are not found"})
    }
 
    return res.status(200).json({item});
}
const addItem = async(req, res, next) => {
    const {foodname,category,description,availability,price,imageURL} = req.body;
 
    let existingitem;
 
    try {
 
        existingitem = await Food.findOne({foodname})
    } catch(err){
        console.log(err);
    }
    if(existingitem){
        return res.status(400).json({message : "item is already exists!"})
    }
 
    const item = new Food({
        foodname,category,description,availability,price,imageURL
       
    });
 
    try {
 
        item.save()
        return res.status(201).json({ item })
    }
    catch(e){console.log(e);}
}
 
 
const updateItem = async (req, res, next) => {
    const foodId = req.params.id;
      const {foodname,category,description,availability,price,imageURL} = req.body;
     
      try {
   
        const food = await Food.findByIdAndUpdate(foodId, {
          foodname,category,description,availability,price,imageURL
        }, { new: true });
     
       
        if (!food) {
          return res.status(404).json({ message: "Item not found" });
        }
     
       
        return res.status(200).json({ food });
     
      } catch (e) {
       
        console.log(e);
        return res.status(500).json({ message: "Unable to update" });
      }
    };
    const deleteItem = async (req, res, next) => {
        const foodId = req.params.id;
         
          try {
           
            const food = await Food.findByIdAndDelete(foodId);
       
            if (!food) {
              return res.status(404).json({ message: "Item not found" });
            }
         
            return res.status(200).json({ message: "Item deleted successfully" });
         
          } catch (e) {
       
            console.log(e);
            return res.status(500).json({ message: "Unable to delete item" });
          }
        };
   
module.exports = { getAllfoods,addItem,updateItem,deleteItem};
 
 
 
 
 
 
 
 
 
 
 