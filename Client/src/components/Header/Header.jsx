import { NavLink } from "react-router-dom"
import "./header.css"
const Header = () => {
  return (
    <header>
       <h2 className="header-logo">&lt;/<span className="header-logo-span">DevTalent</span>&gt;</h2>

        <nav>
            <ul>
            <li><NavLink to="/">Hola</NavLink></li>
            <li><NavLink to="/about">about</NavLink></li>
        <button className="logout">logout</button>
                </ul>
        </nav>
    </header>
  )
}

export default Header
