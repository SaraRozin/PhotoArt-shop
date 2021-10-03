import React from 'react';
import './header.css';
import { Link } from "react-router-dom";
import Logo from './photo-art-logo.png';
import { useHistory } from "react-router-dom";
//displays the Header component
function Header() {
    //directs user to the home page
    const history = useHistory();
    const pushHome = () => {
        history.push("/home")
    }
    return (
        <>
            <button className="logo" onClick={pushHome}>
                <img src={Logo} />
            </button>
            <div className="Yellow">
            </div>
            <div className="navbar navbar-expand-sm bg-dark navbar-dark">
                <nav className="navbar-brand">
                    <ul class="navbar-nav">
                        <li class="nav-item">
                            <Link id="home" class="navbar-brand" to="/home">
                                בית
                    </Link >
                        </li>
                        <div className="part">|</div>
                        <li class="nav-item">
                            <Link class="nav-link" to="/pictures">
                                קטלוג
                    </Link>
                        </li>
                        <div className="part">|</div>
                        {/* If the user is logged in - displays login, otherwise displays exit*/}
                        {!localStorage.getItem("userId") ?
                            <li class="nav-item">
                                <Link class="nav-link" to="/login">
                                    התחברות
                    </Link>
                            </li> : <li class="nav-item">
                                <Link class="nav-link" to="/login">
                                    יציאה
                    </Link>
                            </li>}
                    </ul>
                </nav>
            </div>
        </>
    );
}
export default Header;
