import React, { useEffect, useState } from "react";
import Loader from "react-loaders";
import { Link } from 'react-router-dom';
import "./index.scss";
import AnimatedLetters from "../AnimatedLetters";
import driverData from "../../data/drivers.json";

const Drivers = () => {
    const [letterClass, setLetterClass] = useState('text-animate');
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredDrivers, setFilteredDrivers] = useState([]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLetterClass("text-animate-hover");
        }, 3000);

        return () => {
            clearTimeout(timer);
        }
    }, []);

    useEffect(() => {
        const filtered = driverData.drivers.filter(driver =>
            driver.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredDrivers(filtered);
    }, [searchQuery]);

    const handleSearchChange = event => {
        setSearchQuery(event.target.value);
    };

    const renderDriver = (drivers) => {
        return (
            <div className="images-container">
                {drivers.map((driver, idx) => (
                    <div key={idx} className="image-box">
                        <img src={driver.cover} alt="drivers" className="driver-image" />
                        <div className="content">
                            <p className="title">{driver.title}</p>
                            <Link className="btn" to={`/data?name=${encodeURIComponent(driver.title)}`}>
                                View
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        );
    };

    return (
        <>
            <div className="container drivers-page">
                <h1 className="page-title">
                    <AnimatedLetters letterClass={letterClass} strArray={"Drivers".split("")} idx={15} />
                </h1>
                <div className="search-bar">
                    <input
                        type="text"
                        placeholder="Search for Drivers"
                        value={searchQuery}
                        onChange={handleSearchChange}
                    />
                </div>
                <div>{renderDriver(filteredDrivers)}</div>
            </div>
            <Loader type="pacman" />
        </>
    );
}

export default Drivers;
