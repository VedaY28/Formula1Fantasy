import React, { useEffect, useState } from "react";
import Loader from "react-loaders";
import { Link } from 'react-router-dom';
import "./index.scss";
import AnimatedLetters from "../AnimatedLetters";
// import seasonData from "../../data/seasons.json";


const Season = () => {
    const [letterClass, setLetterClass] = useState('text-animate');
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredSeason, setFilteredSeason] = useState([]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLetterClass("text-animate-hover");
        }, 3000);

        return () => {
            clearTimeout(timer);
        }
    }, []);

    useEffect(() => {
        const filtered = seasonData.seasons.filter(season =>
            season.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredTeams(filtered);
    }, [searchQuery]);
  
    const handleSearchChange = event => {
        setSearchQuery(event.target.value);
    };
    
    const renderSeason = (seasons) => { 
        return (
          <div className="images-container">
            {seasons.map((season, idx) => (
              <div key={idx} className="image-box">
                <img src={season.cover} alt="seasons" className="seasons-image" />
                <div className="content">
                  <p className="title">{season.title}</p>
                  <Link className="btn" to={`/data?season=${encodeURIComponent(season.title)}`}>
                    View
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )
      }

    return (
        <>
            <div className="container season-page">
                <h1 className="page-title">
                    <AnimatedLetters letterClass={letterClass} strArray={"Seasons".split("")} idx={15} />
                </h1>
                <div className="search-bar">
                    <input
                        type="text"
                        placeholder="Search by Season"
                        value={searchQuery}
                        onChange={handleSearchChange}
                    />
                </div>
                <div>{renderSeason(filteredSeason)}</div>
            </div>
            <Loader type="pacman" />
        </>
    );
}

export default Season;