import Logo from "../../Assets/Images/expenses.png";
import SettingsIcon from "../../Assets/Images/settings.png"; //Source: Settings icons created by Ilham Fitrotul Hayat - Flaticon, at https://www.flaticon.com/free-icons/settings
import CloseIcon from "../../Assets/Images/cancel.png"; //Source: Close icons created by Freepik - Flaticon, at https://www.flaticon.com/free-icons/close
import AddButton from "../../Components/AddButton";
import "../../Assets/Styles/NavBar.css"

function NavBar(props) {
    return (
        <nav class="navbar navbar-expand-lg Common-padding NavBar">
            <span class="navbar-brand NavBar-AppName">Expenses App</span>
            {/* <a class="navbar-brand" href="#">Expenses App</a> */}
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse NavBar-links" id="navbarNavDropdown">
                <ul class="navbar-nav">
                    <li class="nav-item active">
                        <a class="nav-link" href="#">Home <span class="sr-only"></span></a>
                    </li>
                    <li class="nav-item">
                        <AddButton 
                            className="NavBar-SettingsBtn nav-link" 
                            name="SignUp"
                            // btnAction={props.signupStatus === false ? "open" : "close"} 
                            onClickFunction={props.signUpToggler}>
                        </AddButton>
                    </li>
                    <li class="nav-item">
                        <AddButton
                            className="NavBar-SettingsBtn nav-link"
                            name="LogIn"
                            // btnAction={props.signupStatus === false ? "open" : "close"} 
                            onClickFunction={props.logInToggler}>
                        </AddButton>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">Work Space</a>
                    </li>
                    <li class="nav-item">
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
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            User
                        </a>
                        <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                            <a class="dropdown-item" href="#">Account Settings</a>
                            <a class="dropdown-item" href="#">Log out</a>
                        </div>
                    </li>
                </ul>
            </div>
            </nav>
    )
}
export default NavBar