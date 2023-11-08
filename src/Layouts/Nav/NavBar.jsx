// import Logo from "../../Assets/Images/expenses.png";
// import SettingsIcon from "../../Assets/Images/settings.png"; //Source: Settings icons created by Ilham Fitrotul Hayat - Flaticon, at https://www.flaticon.com/free-icons/settings
// import CloseIcon from "../../Assets/Images/cancel.png"; //Source: Close icons created by Freepik - Flaticon, at https://www.flaticon.com/free-icons/close
// import AddButton from "../../Components/AddButton";
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../../general_redux/SignAndLogIn/actions';
import { getAllWorkspaceSettings } from '../../general_redux/Workspace/actions'
import "./NavBar.css";

function NavBar(props) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isLoggedIn = useSelector((state) => state.isLoggedIn);
    const hasWorkspace = useSelector((state) => state.allWorkspaces.hasWorkspaces);
    const allWorkspaces = useSelector((state) => state.allWorkspaces.workspaces);
    const selectedWorkspace = useSelector((state) => state.selectedWorkspace.selectedWorkspace);
    const [otherWorkspaces, setOtherWorkspaces] = useState(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    useEffect(() => {
        if (allWorkspaces && selectedWorkspace) {
            if (allWorkspaces.length === 1) {
                setOtherWorkspaces(null)
            } else {
                setOtherWorkspaces(allWorkspaces.filter((workspace) => workspace.uuid !== selectedWorkspace.uuid));
            }
        } else {
            setOtherWorkspaces(null)
        }
        if (allWorkspaces && allWorkspaces.length > 0 && !selectedWorkspace) {
            console.error("Has workspaces but none selected. Check root problem.")
        }
    }, [selectedWorkspace, allWorkspaces])

    function selectedWorkspaceChangeHandler(uuid) {
        const theWorkspace = allWorkspaces.find(workspace => workspace.uuid === uuid);
        dispatch(getAllWorkspaceSettings(theWorkspace))
        setOtherWorkspaces(allWorkspaces.filter((workspace) => workspace.uuid !== uuid));
    }

    const handleLogout = () => {
        setIsDropdownOpen(false);
        dispatch(logOut());
        navigate('/login');
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
                className={`collapse navbar-collapse NavBar-links ${isDropdownOpen ? 'show' : ''
                    }`}
            >
                <ul className="navbar-nav">
                    <li className="nav-item active">
                        <Link className="NavBar-SettingsBtn nav-link" to={'/'}>
                            Home
                        </Link>
                    </li>
                    {!isLoggedIn.loggedIn && (
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
                    {isLoggedIn.loggedIn && hasWorkspace && (
                        <>
                            {!otherWorkspaces && (
                                <li className="nav-item">
                                    <Link className="NavBar-SettingsBtn nav-link" to={'/workspace'} >
                                        {selectedWorkspace && selectedWorkspace.abbreviation ? selectedWorkspace.abbreviation.toUpperCase() : "??"}
                                    </Link>
                                </li>
                            )}
                            {otherWorkspaces && (
                                <li className="nav-item dropdown NavBar-dropdown-class">
                                    <div
                                        className={`nav-link dropdown-toggle NavBar-SettingsBtn${isDropdownOpen ? 'show' : ''} NavBar-SettingsBtn-Arrow`}
                                        data-bs-toggle="dropdown"
                                        aria-haspopup="true" aria-expanded="false"
                                        id="dropdownMenuButton"
                                    >
                                        {selectedWorkspace && selectedWorkspace.abbreviation ? selectedWorkspace.abbreviation.toUpperCase() : "??"}
                                    </div>
                                    <div
                                        className="dropdown-menu dropdown-menu-right NavBar-dropdown-menu-custom NavBar-dropdown-menu-fixed-width"
                                        aria-labelledby="dropdownMenuButton"
                                    >
                                        {otherWorkspaces.map((workspace, index) => (
                                            <Link className="dropdown-item" to={'/workspace'} key={index}
                                                //state={{from: "Navbar", uuid: workspace.uuid}}
                                                onClick={() => { selectedWorkspaceChangeHandler(workspace.uuid) }}>
                                                {workspace.abbreviation.toUpperCase()}</Link>
                                        ))}
                                    </div>
                                </li>
                            )}
                            <li className="nav-item">
                                <Link className="NavBar-SettingsBtn nav-link" to={'/expenses'}>
                                    Expenses
                                </Link>
                            </li>
                            {selectedWorkspace && selectedWorkspace.uuid && (
                                <li>
                                    <Link className="NavBar-SettingsBtn nav-link" to={'/workspacesettings'}
                                        state={{ uuid: selectedWorkspace.uuid }}>
                                        WS Settings
                                    </Link>
                                </li>
                            )}

                        </>
                    )}
                    {isLoggedIn.loggedIn && (
                        <>
                            <li className="nav-item dropdown NavBar-dropdown-class">
                                <div
                                    className={`nav-link dropdown-toggle NavBar-SettingsBtn${isDropdownOpen ? 'show' : ''
                                        }`}
                                    data-bs-toggle="dropdown"
                                    aria-haspopup="true" aria-expanded="false"
                                    id="dropdownMenuButton"
                                >
                                    User
                                </div>
                                <div
                                    className="dropdown-menu dropdown-menu-right NavBar-dropdown-menu-custom"
                                    aria-labelledby="dropdownMenuButton"
                                >
                                    <Link className="dropdown-item" to={'/dashboard'}>Dashboard</Link>
                                    <Link className="dropdown-item" to={'/usersettings'}>Account Settings</Link>
                                    <span className="dropdown-item" onClick={handleLogout}>Log out</span>
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


