// client_code/src/App.jsx
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Register from './pages/Register';
import Home from './pages/Home';
import Login from './pages/Login';
import './scss/main.scss';

function App() {
  return (
    <Router>
        <div className="App">
            <h1 style={{ textAlign: 'center' }}>Customer Portal</h1>
            <nav>
                <ul style={{ listStyle: 'none', display: 'flex', justifyContent: 'space-between' }}>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/login">Login</Link>
                    </li>
                    <li>
                        <Link to="/register"></Link>
                    </li>
                </ul>
            </nav>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Routes>
            
        </div>
    </Router>
  );
}

export default App;
