import React from 'react';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import CreatePost from './pages/CreatePost';
import AllPosts from './pages/AllPosts';

const App = () => {
  return (
    <Router>
     <Routes>
      <Route path="/create-post" element={<CreatePost/>} />
      <Route path="/" element={<AllPosts/>} />
     </Routes>
    </Router>
  );
}

export default App;
