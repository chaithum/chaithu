// import React from 'react'

// const EditItem = () => {
//      const handleChange = (e) => {
//        const { name, value } = e.target;   
//      };
//   return (
//     <div className="form-container">
//     <input name="foodname" value={editItem.foodname} onChange={handleChange} />
//     <input name="category" value={editItem.category} onChange={handleChange} />
//     <input name="description" value={editItem.description} onChange={handleChange} />
//     <button onClick={handleUpdate}>Update Item</button>
//   </div>
//   )
// }

// export default EditItem;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import config from "../config";
import { Box, Button, InputLabel, TextField, Typography } from '@mui/material';
 
const UpdateItem = () => {
  const [inputs, setInputs] = useState({
    foodname: '',
    category: '',
    description: '',
    availability: '',
    price: '',
    imageURL: ''
  });
 
  const { id } = useParams();
  const navigate = useNavigate();
 
 
  useEffect(() => {
    const fetchItem = async () => {
      try {
        const res = await axios.get(`${config.BASE_URL}/api/item/${id}`);
        setInputs(res.data);
      } catch (err) {
        console.error('Error fetching item:', err);
      }
    };
    fetchItem();
  }, [id]);
 
 
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
[e.target.name]: e.target.value
    }));
  };
 
  // Handle form submission for updating the item
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${config.BASE_URL}/api/item/updateItem/${id}`, inputs);
      alert('Item updated successfully!');
      navigate('/api/item'); // Navigate back to item list or another page
    } catch (err) {
      console.error('Error updating item:', err);
      alert('Failed to update item');
    }
  };
 
  return (
    <Box>
      <Typography variant="h2" textAlign="center">Update Item</Typography>
      <form onSubmit={handleSubmit}>
        <InputLabel>Food Name</InputLabel>
        <TextField
          name="foodname"
          value={inputs.foodname}
          onChange={handleChange}
          variant="outlined"
          fullWidth
        />
       
        <InputLabel>Category</InputLabel>
        <TextField
          name="category"
          value={inputs.category}
          onChange={handleChange}
          variant="outlined"
          fullWidth
        />
       
        <InputLabel>Description</InputLabel>
        <TextField
          name="description"
          value={inputs.description}
          onChange={handleChange}
          variant="outlined"
          fullWidth
          multiline
          rows={4}
        />
       
        <InputLabel>Availability</InputLabel>
        <TextField
          name="availability"
          value={inputs.availability}
          onChange={handleChange}
          variant="outlined"
          fullWidth
        />
       
        <InputLabel>Price</InputLabel>
        <TextField
          name="price"
          value={inputs.price}
          onChange={handleChange}
          variant="outlined"
          fullWidth
        />
 
        <InputLabel>Image URL</InputLabel>
        <TextField
          name="imageURL"
          value={inputs.imageURL}
          onChange={handleChange}
          variant="outlined"
          fullWidth
        />
 
        <Button type="submit" variant="contained" color="primary">Update Item</Button>
      </form>
    </Box>
  );
};
 
export default UpdateItem;
 



   