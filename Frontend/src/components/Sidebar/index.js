import './index.scss'
import { Link, NavLink } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faSearch, faBars, faClose, faUsers, faCalendarDays, faUser } from '@fortawesome/free-solid-svg-icons'
import LogoF from '../../assets/images/Formula1Logo.png'
// import LogoSubtitle from '../../assets/images/sub-logo.png'
import { useState } from 'react'

const Sidebar = () => {
    const [showNav, setShowNav] = useState(false)
    return(
        <div className = 'nav-bar'> 
            <Link className = "logo" to="/"> 
                <img src = {LogoF} alt="logo" />
                {/* <img className="sub-logo" src = {LogoSubtitle} alt="Formula1Zone" /> */}
            </Link>
            <nav className={showNav ? 'mobile-show' : ""}>
                <NavLink exact="true" activeclassname = "active" to="/">
                    <FontAwesomeIcon icon = {faHome}  onClick={() => setShowNav(false)} />
                </NavLink>
                <NavLink exact="true" activeclassname = "active" className = "teams-link" to="/teams">
                    <FontAwesomeIcon icon = {faUsers} onClick={() => setShowNav(false)}/>
                </NavLink>
                <NavLink exact="true" activeclassname = "active" className = "driver-link" to="/driver">
                    <FontAwesomeIcon icon = {faUser}  onClick={() => setShowNav(false)}/>
                </NavLink>
                <NavLink exact="true" activeclassname = "active" className = "season-link" to="/season">
                    <FontAwesomeIcon icon = {faCalendarDays} onClick={() => setShowNav(false)} />
                </NavLink>
                <NavLink exact="true" activeclassname = "active" className = "search-link" to="/search">
                    <FontAwesomeIcon icon = {faSearch} onClick={() => setShowNav(false)} />
                </NavLink>
                <FontAwesomeIcon icon = {faClose} size = "3x" className="close-icon" onClick={() => setShowNav(false)} />
            </nav>
            <FontAwesomeIcon onClick={() => setShowNav(true)} icon={faBars} color="#ffd700" size="3x" className="hamburger-icon" />
        </div>
    )
}

export default Sidebar 