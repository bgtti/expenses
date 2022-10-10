import { useState } from "react";
import Expenses from "./Expenses/Expenses"
import Settings from "./Settings/Settings";
import ModalAddExpense from "./Expenses/ModalAddExpense";
import Footer from "./Footer/Footer";
import "../Styles/Home.css";
import NavBar from "./Nav/NavBar";

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
            <NavBar settingsStatus={settingsStatus} settingsToggler={settingsToggler}></NavBar>

            <Settings className={settingsStatus === false ? "Home-Settings-Hidden" : ""}></Settings>

            <Expenses addExpenseModalToggler={addExpenseModalToggler} className={settingsStatus === false ? "" : "Home-Expenses-Hidden"}></Expenses>

            <ModalAddExpense
                className={modalAddExpenseStatus === false ? "modalAddExpenseHidden" : ""}
                addExpenseModalToggler={addExpenseModalToggler}>
            </ModalAddExpense>

            <Footer></Footer>
        </div>
    )
}
export default Home
