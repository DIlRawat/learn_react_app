import { Link } from 'react-router-dom';
import './Home.css';
import backgroundImage from '../assets/learn2.jpg'; // Import the image

const Home = () => {
  return (
    <div className="home-container" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="home-info">
        <h1>Welcome to Learning App</h1>
          <div className='home-nav-buttons'>
            <Link to="/abc" className="learn-button">Learn ABC</Link>
            <Link to="/123" className="learn-button">Learn 123</Link>
          </div>
      </div>
    </div>
  );
};

export default Home;