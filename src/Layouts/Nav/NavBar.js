import Logo from "../../Assets/Images/expenses.png";
import SettingsIcon from "../../Assets/Images/settings.png"; //Source: Settings icons created by Ilham Fitrotul Hayat - Flaticon, at https://www.flaticon.com/free-icons/settings
import CloseIcon from "../../Assets/Images/cancel.png"; //Source: Close icons created by Freepik - Flaticon, at https://www.flaticon.com/free-icons/close
import AddButton from "../../Components/AddButton";
import "../../Assets/Styles/NavBar.css"

function NavBar(props) {
    return (
        <nav className="navbar navbar-expand-lg Common-padding NavBar">
            <span className="navbar-brand NavBar-AppName">Expenses App</span>
            {/* <a className="navbar-brand" href="#">Expenses App</a> */}
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse NavBar-links" id="navbarNavDropdown">
                <ul className="navbar-nav">
                    <li className="nav-item active">
                        <a className="nav-link" href="#">Home <span className="sr-only"></span></a>
                    </li>
                    <li class="nav-item">
                        <AddButton 
                            className="NavBar-SettingsBtn nav-link" 
                            name="SignUp"
                            // btnAction={props.signupStatus === false ? "open" : "close"} 
                            onClickFunction={props.signUpToggler}>
                        </AddButton>
                    </li>
                    <li className="nav-item">
                        <AddButton
                            className="NavBar-SettingsBtn nav-link"
                            name="LogIn"
                            // btnAction={props.signupStatus === false ? "open" : "close"} 
                            onClickFunction={props.logInToggler}>
                        </AddButton>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Work Space</a>
                    </li>
                    <li className="nav-item">
                        <AddButton
                            className="NavBar-SettingsBtn nav-link"
                            name="Expenses"
                            // btnAction={props.signupStatus === false ? "open" : "close"} 
                            onClickFunction={props.expensesToggler}>
                        </AddButton>
                    </li>
                    <li>
                        <AddButton className="NavBar-SettingsBtn nav-link" 
                            name={props.settingsStatus === false ? "Settings" : "Close Settings"} 
                            // btnAction={props.settingsStatus === false ? "open" : "close"} 
                            onClickFunction={props.settingsToggler}>
                            {
                                props.settingsStatus === false ?
                                    <img className="NavBar-BtnIcon" src={SettingsIcon} alt="Settings icon open" />
                                    : <img className="NavBar-BtnIcon" src={CloseIcon} alt="Settings icon close" />
                            }
                        </AddButton>
                    </li>
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            User
                        </a>
                        <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                            <a className="dropdown-item" href="#">Account Settings</a>
                            <a className="dropdown-item" href="#">Log out</a>
                        </div>
                    </li>
                </ul>
            </div>
            </nav>
    )
}
export default NavBar