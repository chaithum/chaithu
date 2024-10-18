import { Box, Button, InputLabel, TextField, Typography } from "@mui/material";
import axios from "axios";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import config from "../config";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStyles } from "../utils/theme";
 
 
const AddItem = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const labelStyles = { mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold" };
  const [inputs, setInputs] = useState({
    foodname:"",
    category:"",
    description:"",
    availability:"",
    price:"",
    imageURL:""
  });
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const sendRequest = async () => {
    const res = await axios
      .post(`${config.BASE_URL}/api/food/addItem`, {
        foodname:inputs.foodname,
        category:inputs.category,
        description:inputs.description,
        availability:inputs.availability,
        price:inputs.price,
        imageURL:inputs.imageURL
       
       
      })
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
    sendRequest()
      .then((data) => console.log(data))
      .then(() => navigate("/additem"));
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box
          borderRadius={10}
          boxShadow="10px 10px 20px #ccc"
          padding={3}
          margin={"auto"}
          marginTop={3}
          display="flex"
          flexDirection={"column"}
          width={"80%"}
        >
          <Typography
            className={classes.font}
            padding={3}
            color="grey"
            variant="h2"
            textAlign={"center"}
          >
            Post Your item
          </Typography>
          <InputLabel className={classes.font} sx={labelStyles}>
            Foodname
          </InputLabel>
          <TextField
            className={classes.font}
            name="foodname"
            onChange={handleChange}
            value={inputs.foodname}
            margin="auto"
            variant="outlined"
          />
          <InputLabel className={classes.font} sx={labelStyles}>
            Category
          </InputLabel>
          <TextField
            className={classes.font}
            name="category"
            onChange={handleChange}
            value={inputs.category}
            margin="auto"
            variant="outlined"
          />
          <InputLabel className={classes.font} sx={labelStyles}>
            Description
          </InputLabel>
          <TextareaAutosize
            className={classes.font}
            name="description"
            onChange={handleChange}
            minRows={10}
            margin="auto"
            variant="outlined"
            value={inputs.description}
          />
          <InputLabel className={classes.font} sx={labelStyles}>
          Availability
          </InputLabel>
          <TextField
            className={classes.font}
            name="availability"
            onChange={handleChange}
            value={inputs.availability}
            margin="auto"
            variant="outlined"
          />
           <InputLabel className={classes.font} sx={labelStyles}>
          Price
          </InputLabel>
          <TextField
            className={classes.font}
            name="price"
            onChange={handleChange}
            value={inputs.price}
            margin="auto"
            variant="outlined"
          />
         
          <InputLabel className={classes.font} sx={labelStyles}>
            ImageURL
          </InputLabel>
          <TextField
            className={classes.font}
            name="imageURL"
            onChange={handleChange}
            value={inputs.imageURL}
            margin="auto"
            variant="outlined"
          />
       
          <Button
            sx={{ mt: 2, borderRadius: 4 }}
            variant="contained"
            type="submit"
          >
            Submit
          </Button>
        </Box>
      </form>
    </div>
  );
};
 
export default AddItem;
 
 
 
 