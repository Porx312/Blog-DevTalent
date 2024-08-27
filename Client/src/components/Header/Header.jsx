import { Link } from "react-router-dom"
import "./header.css"
const Header = () => {
 
  return (
    <header>
        <Link style={{textDecoration: "none"}} to={"/"}>
       <h2 className="header-logo">&lt;/<span className="header-logo-span">DevTalent</span>&gt;</h2>
       </Link>
        <nav>
            <ul>
        <Link to="/account" className="logout">logout</Link>
                </ul>
        </nav>
    </header>
  )
}

export default Header
