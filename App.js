import React from 'react'
import { Route, Routes } from 'react-router-dom'
import SignUp from './components/SignUp';
import ForgetPassword from './components/forgetPassword';
import Home from './components/Home';
import Profile from './components/Profile';
import Login from './components/login';
import AddItem from './components/addItem';
import DisplayItems from './components/displayItem';
import EditItem from './components/editItem';



function App() {
  return (
    <React.Fragment>
      <Routes>
          <Route path='/home' element={<Home/>}></Route>
          <Route  path='/signup' element={<SignUp/>}></Route>
          <Route  path='/login' element={<Login/>}></Route>
          <Route path='/forgetPassword' element={<ForgetPassword/>}></Route>
          <Route path='/profile' element={<Profile/>}></Route>
          <Route path='/additem' element={<AddItem/>}></Route>
          <Route path='/displayitem' element={<DisplayItems/>}></Route>
          <Route path='/editItem' element={<EditItem/>}></Route>
        </Routes>
    </React.Fragment>
 
  );
}

export default App;
