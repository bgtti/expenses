import { useState } from "react";
import Expenses from "./ExpenseElements/Expenses"
import Settings from "./Settings/Settings";
import AddButton from "./GeneralUI/AddButton";
import ModalAddExpense from "./ExpenseElements/ModalAddExpense";
import SettingsIcon from "../Images/settings.png"; //Source: Settings icons created by Ilham Fitrotul Hayat - Flaticon, at https://www.flaticon.com/free-icons/settings
import AddIcon from "../Images/add.png"; //Source: Plus icons created by dmitri13 - Flaticon, at https://www.flaticon.com/free-icons/plus
import CloseIcon from "../Images/cancel.png"; //Source: Close icons created by Freepik - Flaticon, at https://www.flaticon.com/free-icons/close
import Footer from "./Footer/Footer";
import "../Styles/Home.css";
import Logo from "../Images/expenses.png";

function Home() {
    const [modalAddExpenseStatus, setModalAddExpenseStatus] = useState(false);
    const [settingsStatus, setSettingsStatus] = useState(false);

    function addExpenseModalToggler(openOrClose) {
        openOrClose === "close" ? setModalAddExpenseStatus(false) : setModalAddExpenseStatus(true);
    }
    function settingsToggler(openOrClose) {
        openOrClose === "close" ? setSettingsStatus(false) : setSettingsStatus(true);
    }

    return (
        <div className="Home">
            <nav>
                <div className="Home-Header">
                    <img src={Logo} alt="Logo" />
                    <h1>Expenses App</h1>
                </div>
                <AddButton className="Home-SettingsBtn" name={settingsStatus === false ? "Settings" : "Close Settings"} btnAction={settingsStatus === false ? "open" : "close"} onClickFunction={settingsToggler}>
                    {
                        settingsStatus === false ?
                            <img className="Home-SettingsBtnIcon" src={SettingsIcon} alt="Settings icon open" />
                            : <img className="Home-SettingsBtnIcon" src={CloseIcon} alt="Settings icon close" />
                    }
                </AddButton>
            </nav>

            <Settings className={settingsStatus === false ? "Home-Settings-Hidden" : ""}></Settings>

            <section className={settingsStatus === false ? "" : "Home-Expenses-Hidden"}>
                <AddButton name="Add new expense" btnAction="open" onClickFunction={addExpenseModalToggler} className="Home-AddExpenseBtn"><img className="Home-AddBtnIcon" src={AddIcon} alt="Add icon" /></AddButton>
                <Expenses></Expenses>
            </section>

            <ModalAddExpense
                className={modalAddExpenseStatus === false ? "modalAddExpenseHidden" : ""}
                addExpenseModalToggler={addExpenseModalToggler}>
            </ModalAddExpense>

            <Footer></Footer>
        </div>
    )
}
export default Home
