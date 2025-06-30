import '../styles/Home.css';
import bgImage from '../assets/home_background.png';
function Home() {
  return (
    <div  className="app-container" style={{ backgroundImage: `url(${bgImage})` }}>
      <div className="home-banner-content">
      <h2>To start your day fresh every day, Go Fresh</h2>
    </div>

    </div>
    
  );
}

export default Home;
