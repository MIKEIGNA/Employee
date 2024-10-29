// client_code/src/components/Navbar.jsx
import { Link } from 'react-router-dom';

const Navbar = () => (
  <nav>
    <Link to="/">Home</Link> | 
    <Link to="/login">Login</Link> | 
    <Link to="/register">Register</Link>
  </nav>
);

export default Navbar;
