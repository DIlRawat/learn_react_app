import react from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
    return (
      <header className="header">
        <nav className="nav">
          <div className="left-nav">
            <Link to="/" className="nav-link">Logo</Link>
          </div>
          <div className="mid-nav">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/abc" className="nav-link">LearnABC</Link>
            <Link to="/123" className="nav-link">Learn123</Link>
            <Link to="/" className="nav-link">Contact</Link>
          </div>
          <div className="right-nav">
            <div className="user-circle nav-link"> {/* Added a wrapping div with a class */}
              <span className="user">D</span>
            </div>
          </div>
        </nav>
      </header>
    );
  };

export default Header;