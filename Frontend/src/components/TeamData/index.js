import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./index.scss";
import AnimatedLetters from "../AnimatedLetters";

const TeamData = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [driverData, setDriverData] = useState([]);
  const [driversToShow, setDriversToShow] = useState(10);
  const [letterClass] = useState('text-animate');
  // console.log('TeamData component rendered'); 
  
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const teamValue = params.get('team');
    const seasonValue = params.get('season');
    const driverValue = params.get('name');
    const nameValue = params.get('name');
    console.log('Team Value:', teamValue); // Add this line
    
    if (teamValue) {
      axios.get(`http://localhost:8080/api/v1/drivers/team/${encodeURIComponent(teamValue)}`)
        .then(response => {
          console.log('Response Data:', response.data);
          setDriverData(response.data);
          setLoading(false);
        })
        .catch(error => {
          console.error('Error fetching data:', error); // Add this line
          setError(error);
          setLoading(false);
        });
    } else if (seasonValue){
      axios.get(`http://localhost:8080/api/v1/drivers/season/${encodeURIComponent(seasonValue)}`)
      .then(response => {
        setDriverData(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
    } else if (driverValue){
      axios.get(`http://localhost:8080/api/v1/drivers/name/${encodeURIComponent(driverValue)}`)
      .then(response => {
        setDriverData(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
    } else if (nameValue){
      axios.get(`http://localhost:8080/api/v1/player?name=${encodeURIComponent(nameValue)}`)
      .then(response => {
        setDriverData(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
    }
      else {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }


  return (
    <div className={`fade-in ${loading ? 'loading' : ''}`}>
    <div className="table-container">
      <h1 className = "page-title">
        <AnimatedLetters letterClass = {letterClass} strArray={"Data".split("")} idx={12}/>
      </h1>
      <table>
        <thead>
          <tr>
          <th>Name</th>
            <th>Team</th>
            <th>Season</th>
            <th>Champ Position</th>
            <th>Points</th>
            <th>Teammates</th>
            <th>Race entries</th>
            <th>Victories</th>
            <th>Poles</th>
            <th>Podiums</th>
            <th>FastLap</th>
          </tr>
        </thead>
        <tbody>
          {driverData.slice(0, driversToShow).map(driver => (
            <tr key={driver.name}>
                <td>{driver.name}</td>
                <td>{driver.team}</td>
                <td>{driver.season}</td>
                <td>{driver.champ}</td>
                <td>{driver.point}</td>
                <td>{driver.teammates}</td>
                <td>{driver.raceent}</td>
                <td>{driver.vict}</td>
                <td>{driver.poles}</td>
                <td>{driver.podiums}</td>
                <td>{driver.fastlap}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {driversToShow < driverData.length && (
        <button onClick={() => setDriversToShow(driversToShow + 10)} style={{ marginTop: '10px', marginBottom: '10px' }} className={`show-more-button ${loading ? 'loading' : ''}`}>
          Show More
        </button>
      )}
    </div>
    </div>
  );
};

export default TeamData;