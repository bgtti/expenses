import Logo from "../../Assets/Images/expenses.png";
import SettingsIcon from "../../Assets/Images/settings.png"; //Source: Settings icons created by Ilham Fitrotul Hayat - Flaticon, at https://www.flaticon.com/free-icons/settings
import CloseIcon from "../../Assets/Images/cancel.png"; //Source: Close icons created by Freepik - Flaticon, at https://www.flaticon.com/free-icons/close
import AddButton from "../../Components/AddButton";
import "../../Assets/Styles/NavBar.css"

function NavBar(props) {
    return (
        // <nav className="NavBar Common-padding">
        //     <div className="NavBar-Header">
        //         <img src={Logo} alt="Logo" />
        //         <h1>Expenses App</h1>
        //     </div>
        //     <AddButton className="NavBar-SettingsBtn" name={props.settingsStatus === false ? "Settings" : "Close Settings"} btnAction={props.settingsStatus === false ? "open" : "close"} onClickFunction={props.settingsToggler}>
        //         {
        //             props.settingsStatus === false ?
        //                 <img className="Home-SettingsBtnIcon" src={SettingsIcon} alt="Settings icon open" />
        //                 : <img className="Home-SettingsBtnIcon" src={CloseIcon} alt="Settings icon close" />
        //         }
        //     </AddButton>
        // </nav>
        <nav class="navbar navbar-expand-lg Common-padding NavBar">
            <a class="navbar-brand" href="#">Expenses App</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNavDropdown">
                <ul class="navbar-nav">
                    <li class="nav-item active">
                        <a class="nav-link" href="#">Home <span class="sr-only"></span></a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">Sign up</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">Log in</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">Work Space</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">Expenses</a>
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
                    <li>
                        <AddButton className="NavBar-SettingsBtn" name={props.settingsStatus === false ? "Settings" : "Close Settings"} btnAction={props.settingsStatus === false ? "open" : "close"} onClickFunction={props.settingsToggler}>
                            {
                                props.settingsStatus === false ?
                                    <img className="Home-SettingsBtnIcon" src={SettingsIcon} alt="Settings icon open" />
                                    : <img className="Home-SettingsBtnIcon" src={CloseIcon} alt="Settings icon close" />
                            }
                        </AddButton>
                    </li>
                </ul>
            </div>
            </nav>
    )
}
export default NavBar