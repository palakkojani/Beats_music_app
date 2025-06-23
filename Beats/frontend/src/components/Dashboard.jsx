import { useEffect, useState } from 'react';
import './Dashboard.css';

const Dashboard = () => {
  const [music ,setMusic] = useState([])

  useEffect(()=>{
    const fetchdata = async ()=>{
      const response = await fetch('http://localhost:3333/api/music')
      const data = await response.json()
      console.log(data.data)
      setMusic(data.data)
      
    }
    fetchdata()
  },[])
  return (
    <div className="dashboard-container">
      {/* LEFT SIDE */}
      <div className="main-section">
        {/* NAVBAR */}
        <nav className="navbar">
          <div className="nav-left">
            <a href="#" className="active">MUSIC</a>
            <a href="#">PODCAST</a>
            <a href="#">LIVE</a>
          </div>
          <input
            type="text"
            placeholder="Type here to search"
            className="search-box"
          />
          <div className="nav-user">
            <img src="https://via.placeholder.com/30" alt="profile" />
            <span>Dave Cooper</span>
          </div>
        </nav>

        {/* HERO SECTION */}
        <div className="hero-section">
          <div className="hero-text">
            <p className="subtitle">Trending New Hits</p>
            <h1>In My Feelings</h1>
            <p>Camila Cabello • 63Million Plays</p>
            <button className="listen-btn">Listen Now</button>
          </div>
          <img
            src="https://via.placeholder.com/200x300"
            className="hero-image"
            alt="camila"
          />
        </div>

        {/* TOP ARTISTS */}
        <div className="top-artists-section">
          <h2>Top Artists</h2>
          <div className="artists-row">
            {music.map((m) => (
              <div className="artist-card" key={m.id}>
                <img src={m.cover} alt={m.artist} className='coverimg'/>
                <p>{m.name}</p>
                <span>{m.plays}</span>
              </div>
            ))}
          </div>
        </div>

        {/* GENRES + TOP CHARTS */}
        <div className="bottom-grid">
          <div className="genres-section">
            <h3>Genres</h3>
            <div className="genres-grid">
              {['Dance Beat', 'Electro Pop', 'Alternative Indie', 'Hip Hop', 'Classical Period', 'Rap'].map((genre, i) => (
                <button className="genre-btn" key={i}>{genre}</button>
              ))}
            </div>
          </div>

          <div className="charts-section">
            <h3>Top Charts</h3>
            <ul>
              {[
                ['Havana', 'Camila Cabello'],
                ['Jesus is King', 'Kanye West'],
                ['Closer', 'The Chainsmokers'],
                ['Lean On', 'Major Lazer ft. DJ Snake'],
              ].map(([title, artist], i) => (
                <li key={i} className="chart-item">
                  <span>{`0${i + 1}. ${title}`}</span>
                  <span>3:45</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* RIGHT SIDEBAR PLAYER */}
      <div className="player-sidebar">
        <img src="https://via.placeholder.com/150" alt="butterfly" className="player-img" />
        <h3>Butterfly Effect</h3>
        <p>Travis Scott • Best of 2020</p>
        <div className="player-timeline">
          <span>2:45</span>
          <input type="range" />
          <span>1:00</span>
        </div>
        <div className="player-controls">
          <button>⏮️</button>
          <button className="play-btn">▶️</button>
          <button>⏭️</button>
        </div>
        <button className="lyrics-btn">LYRICS</button>
      </div>
    </div>
  );
};

export default Dashboard;
