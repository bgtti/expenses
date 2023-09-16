// import Logo from "../../Assets/Images/expenses.png";
// import SettingsIcon from "../../Assets/Images/settings.png"; //Source: Settings icons created by Ilham Fitrotul Hayat - Flaticon, at https://www.flaticon.com/free-icons/settings
// import CloseIcon from "../../Assets/Images/cancel.png"; //Source: Close icons created by Freepik - Flaticon, at https://www.flaticon.com/free-icons/close
// import AddButton from "../../Components/AddButton";
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../../general_redux/SignAndLogIn/actions';
import "./NavBar.css"

function NavBar(props) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isLoggedIn = useSelector((state) => state.isLoggedIn);
    const hasWorkspace = useSelector((state) => state.allWorkspaces.hasWorkspaces);
    const allWorkspaces = useSelector((state) => state.allWorkspaces.workspaces);
    // const [firstWorkspace, setFirstWorkspace] = useState(null);
    const [selectedWorkspace, setSelectedWorkspace] = useState(null);
    const [otherWorkspaces, setOtherWorkspaces] = useState(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    // console.log(`in NAV: hasWorkspace = ${hasWorkspace}`)
    // console.log(`in NAV: allWorkspaces = ${JSON.stringify(allWorkspaces)}`)
    // console.log(`in NAV: selectedWorkspace = ${selectedWorkspace}`)
    // console.log(`in NAV: selectedWorkspace = ${JSON.stringify(selectedWorkspace)}`)
    // console.log(`in NAV: otherWorkspaces = ${otherWorkspaces}`)
    // console.log(`in NAV: otherWorkspaces = ${JSON.stringify(otherWorkspaces)}`)
    
    useEffect(()=>{
        if (allWorkspaces && allWorkspaces.length > 0){
            // setFirstWorkspace(allWorkspaces[0])
            setSelectedWorkspace(allWorkspaces[0]);
            allWorkspaces.length === 1 ? setOtherWorkspaces(null): setOtherWorkspaces(allWorkspaces.slice(1));
        } else {
            setSelectedWorkspace(null)
            setOtherWorkspaces(null)
        }
        // console.log(`in NAV: in useEffect: ************************`)
        // console.log(`in NAV: in useEffect: allWorkspaces = ${allWorkspaces}`)
        // console.log(`in NAV: in useEffect: otherWorkspaces = ${JSON.stringify(otherWorkspaces)}`)
        // console.log(`in NAV: in useEffect: selectedWorkspace = ${JSON.stringify(selectedWorkspace)}`)
    }, [allWorkspaces, otherWorkspaces, selectedWorkspace])
    
    // const [otherWorkspaces, setOtherWorkspaces] = useState(()=> {
    //     if (allWorkspaces){
    //         return allWorkspaces.slice(1)
    //     }
    //     return null;
    // });
    // const [selectedWorkspace, setSelectedWorkspace] = useState(firstWorkspace);

    function selectedWorkspaceChangeHandler(uuid){
        const theWorkspace = allWorkspaces.find(workspace => workspace.uuid === uuid);
        setSelectedWorkspace(theWorkspace);
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
            {isLoggedIn.loggedIn && hasWorkspace && (
                <>
                    <li className="nav-item dropdown NavBar-dropdown-class">
                        <div
                            className={`nav-link dropdown-toggle NavBar-SettingsBtn${
                                isDropdownOpen ? 'show' : ''} NavBar-SettingsBtn-Arrow${!otherWorkspaces ? 'noarrow' : ''}`}
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
                            {otherWorkspaces && selectedWorkspace.abbreviation && otherWorkspaces.map((workspace, index) => (
                                <Link className="dropdown-item" to={'/workspace'} 
                                state={{from: "Navbar", uuid: workspace.uuid}}
                                onClick={()=>{selectedWorkspaceChangeHandler(workspace.uuid)}}>
                                    {workspace.abbreviation.toUpperCase()}</Link>
                            ))}
                        </div>
                    </li>
                    {/* <li className="nav-item">
                        <Link className="NavBar-SettingsBtn nav-link" to={'/workspace'}>
                        WorkSpace
                        </Link>
                    </li> */}
                    <li className="nav-item">
                        <Link className="NavBar-SettingsBtn nav-link" to={'/expenses'}>
                        Expenses
                        </Link>
                    </li>
                    {otherWorkspaces && selectedWorkspace.uuid && (
                        <li>
                        <Link className="NavBar-SettingsBtn nav-link" to={'/settings'}
                        state={{uuid:selectedWorkspace.uuid}}>
                        Settings
                        </Link>
                    </li>
                    )}
                    
                </>
            )}
            {isLoggedIn.loggedIn &&  (
                <>
                    <li className="nav-item dropdown NavBar-dropdown-class">
                        <div
                            className={`nav-link dropdown-toggle NavBar-SettingsBtn${
                                isDropdownOpen ? 'show' : ''
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


