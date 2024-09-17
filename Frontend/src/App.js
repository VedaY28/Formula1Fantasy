// import logo from './logo.svg';
import React, { useEffect } from 'react';
import './App.scss';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './components/Home';
import Teams from './components/Teams';
// import TeamData from './components/TeamData';
// import Season from "./components/Season";
import Driver from "./components/Driver";
import Search from "./components/Search";

function App() {
  useEffect(() => {
    document.title = 'Formula1Zone Fantasy';
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="teams" element={<Teams />} />
            {/* <Route path="data" element={<TeamData />} /> */}
            {/* <Route path="season" element={<Season />} /> */}
            <Route path="driver" element={<Driver />} />
            <Route path="search" element={<Search />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
