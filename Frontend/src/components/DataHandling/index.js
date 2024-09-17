import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./index.scss";

const DataHandling = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [driverData, setDriverData] = useState([]);
  
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const teamValue = params.get('team');
    
    if (teamValue) {
      // axios.get(`http://localhost:8080/api/v1/player?team=${encodeURIComponent(teamValue)}`)
      axios.get(`http://localhost:8080/api/v1/drivers/team/${encodeURIComponent(teamValue)}`)
        .then(response => {
          setDriverData(response.data);
          setLoading(false);
        })
        .catch(error => {
          setError(error);
          setLoading(false);
        });
    } else {
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
    <div className = "table-container">
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
            {driverData.map(driver => (
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
    </div>
  );
  
};

export default DataHandling;