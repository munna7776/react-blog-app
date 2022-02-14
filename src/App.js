import './App.css';
import { Routes,Route } from 'react-router-dom';
import Home from './components/Home';
import  CreateBlog  from './components/CreateBlog';
import NavBar from './components/NavBar';
import BlogDetail from './components/BlogDetail';

function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create-blog" element={<CreateBlog />}  />
        <Route path="/blog/:blogId" element={<BlogDetail />} />
      </Routes>
    </div>
  );
}

export default App;
