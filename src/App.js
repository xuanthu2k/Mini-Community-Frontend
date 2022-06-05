import {Route, Routes} from "react-router-dom"
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import { useEffect, useState } from "react";
import axios from "axios";
import LoginForm from './components/LoginForm';
import HomPage from './components/HomePage';
import ProfilePage from './components/ProfilePage';
import PostDetail from "./components/PostDetail";
import RegisterForm from "./components/RegisterForm";
import CreatePost from "./components/CreatePost";

function App() {

  return (
    <div className="App">
      <Routes>
        <Route path='/login' element={<LoginForm/>} />
        <Route path='/' element={<HomPage />} />
        <Route path='/info' element={<ProfilePage/>} />
        <Route path='/detail' element={<PostDetail/>} />
        <Route path='/register' element={<RegisterForm/>} />
        <Route path='/create-post' element={<CreatePost/>} />
      </Routes>
    </div>
  );
}

export default App;
