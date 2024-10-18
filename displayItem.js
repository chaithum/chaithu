// src/components/FoodItems.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
 
import config from '../config';
import {useNavigate} from 'react-router-dom';
 
const DisplayItems = () => {
const navigate=useNavigate()
  const [foodItems, setFoodItems] = useState([]);
  const [newItem, setNewItem] = useState({ foodname: '', price: '', description: '', category: '' , availability: '', imgURL: '' });
  const [editItem, setEditItem] = useState(null);
 
  // Fetch all items
  const fetchFoodItems = async () => {
    try {
      const response = await axios.get(`${config.BASE_URL}/api/food/displayitems`)
      setFoodItems(response.data);
    } catch (error) {
      console.error('Error fetching food items:', error);
    }
  };
 
  useEffect(() => {
    fetchFoodItems();
  }, []);
 
 
//  Delete an item
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${config.BASE_URL}/api/food/deleteItem/${id}`);
      fetchFoodItems();
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };
 
         //Update an item
      const handleUpdate = async (id) => {
        console()
       try {
         await axios.put(`${config.BASE_URL}/api/food/editItem/${id}`)
         .then(() => navigate("/editItem"));
       } catch (error) {
         console.error('Error updating item:', error);
       }
     };
 
  return (
    <div className="items-container d-g w-auto">
        {foodItems.item && foodItems.item.map((item) => (
          <div key={item._id} className="item-card">
            <h3>{item.foodname}</h3>
            <p>{item.category}</p>
            <h3>{item.discription}</h3>
            <h3>{item.availability}</h3>
            <p>{item.price}</p>
            <h3>{item.imageURL}</h3>
            <button onClick={() => handleUpdate(item._id)}>Edit</button> 
            <button onClick={() => handleDelete(item._id)}>Delete</button>
          </div>
        ))}
      </div>
  );
};
 
export default DisplayItems
 
