import {Route, Routes} from "react-router-dom"
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import Home from "./components/Pages/Home";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Profile from "./components/Pages/Profile";
import PostDetail from "./components/Pages/PostDetail";
import AddPost from "./components/Pages/AddPost";

function App() {

  return (
    <div className="App">
      <Routes>
        <Route exact path='/' element={<Home/>} />
        <Route exact path='/login' element={<Login/>} />
        <Route exact path='/register' element={<Register/>} />
        <Route exact path='/profile' element={<Profile/>} />
        <Route exact path='/detail' element={<PostDetail/>}/>
        <Route exact path='/add-post' element={<AddPost/>}/>
      </Routes>
    </div>
  );
}

export default App;
