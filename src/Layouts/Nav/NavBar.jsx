// import Logo from "../../Assets/Images/expenses.png";
// import SettingsIcon from "../../Assets/Images/settings.png"; //Source: Settings icons created by Ilham Fitrotul Hayat - Flaticon, at https://www.flaticon.com/free-icons/settings
// import CloseIcon from "../../Assets/Images/cancel.png"; //Source: Close icons created by Freepik - Flaticon, at https://www.flaticon.com/free-icons/close
// import AddButton from "../../Components/AddButton";
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../../general_redux/actions';
import "../../Assets/Styles/NavBar.css"

function NavBar(props) {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isLoggedIn = useSelector((state) => state.isLoggedIn);

    const handleLogout = () => {
            dispatch(logOut());
            navigate('/login');
            setIsDropdownOpen(false);
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };


    return (
        <nav className="navbar navbar-expand-lg Common-padding NavBar">
        <span className="navbar-brand NavBar-AppName">Expenses App</span>
        <button
            className="navbar-toggler"
            type="button"
            onClick={toggleDropdown}
            aria-expanded={isDropdownOpen}
            aria-label="Toggle navigation"
        >
            <span className="navbar-toggler-icon"></span>
        </button>
        <div
            className={`collapse navbar-collapse NavBar-links ${
            isDropdownOpen ? 'show' : ''
            }`}
        >
            <ul className="navbar-nav">
            <li className="nav-item active">
                <Link className="nav-link" to={'/'}>
                Home
                </Link>
            </li>
            {!isLoggedIn.loggedIn &&  (
                <>
                    <li className="nav-item">
                        <Link className="NavBar-SettingsBtn nav-link" to={'/signup'}>
                        Sign-up
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="NavBar-SettingsBtn nav-link" to={'/login'}>
                        Log-in
                        </Link>
                    </li>
                </>
            )}
            {isLoggedIn.loggedIn &&  (
                <>
                    <li className="nav-item">
                        <Link className="NavBar-SettingsBtn nav-link" to={'/workspace'}>
                        WorkSpace
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="NavBar-SettingsBtn nav-link" to={'/expenses'}>
                        Expenses
                        </Link>
                    </li>
                    <li>
                        <Link className="NavBar-SettingsBtn nav-link" to={'/settings'}>
                        Settings
                        </Link>
                    </li>
                    <li className="nav-item dropdown NavBar-dropdown-class">
                        <div
                            className={`nav-link dropdown-toggle NavBar-SettingsBtn${
                                isDropdownOpen ? 'show' : ''
                            }`}
                            data-bs-toggle="dropdown"
                            aria-haspopup="true" aria-expanded="false"
                            id="dropdownMenuButton"
                            // onClick={toggleDropdown}
                        >
                        User
                        </div>
                        <div
                            className="dropdown-menu dropdown-menu-right NavBar-dropdown-menu-custom" 
                            aria-labelledby="dropdownMenuButton"
                        >
                            <Link className="dropdown-item" to={'/dashboard'}>Dashboard</Link>
                            <Link className="dropdown-item" to={'/usersettings'}>Account Settings</Link>
                            {/* <a className="dropdown-item" href="#">Account Settings</a> */}
                            <a className="dropdown-item" href="#" onClick={handleLogout}>Log out</a>
                        </div>
                    </li>
                </>
            )}

            </ul>
        </div>
        </nav>
    );
}

export default NavBar;


