import Logo from "../../Images/expenses.png";
import SettingsIcon from "../../Images/settings.png"; //Source: Settings icons created by Ilham Fitrotul Hayat - Flaticon, at https://www.flaticon.com/free-icons/settings
import CloseIcon from "../../Images/cancel.png"; //Source: Close icons created by Freepik - Flaticon, at https://www.flaticon.com/free-icons/close
import AddButton from "../GeneralUI/AddButton";
import "../../Styles/NavBar.css"
function NavBar(props) {
    return (
        <nav className="NavBar">
            <div className="NavBar-Header">
                <img src={Logo} alt="Logo" />
                <h1>Expenses App</h1>
            </div>
            <AddButton className="NavBar-SettingsBtn" name={props.settingsStatus === false ? "Settings" : "Close Settings"} btnAction={props.settingsStatus === false ? "open" : "close"} onClickFunction={props.settingsToggler}>
                {
                    props.settingsStatus === false ?
                        <img className="Home-SettingsBtnIcon" src={SettingsIcon} alt="Settings icon open" />
                        : <img className="Home-SettingsBtnIcon" src={CloseIcon} alt="Settings icon close" />
                }
            </AddButton>
        </nav>
    )
}
export default NavBar