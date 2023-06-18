import { useState } from "react";
import NavBar from "../Nav/NavBar";
import Footer from "../Footer/Footer";
import Home from "../../Pages/Website/Home"
import LogIn from "../../Pages/Website/LogIn"
import SignUp from "../../Pages/Website/SignUp"
import Expenses from "../../Pages/Expenses/Expenses"
import Settings from "../../Pages/Settings/Settings";
// import ModalAddExpense from "../../Pages/Expenses/ModalAddExpense";
// import "../../Assets/Styles/Home.css";
import "../../Assets/Styles/Main.css";
import "../../Assets/Styles/Common.css";

function Main() {
    // const [modalAddExpenseStatus, setModalAddExpenseStatus] = useState(false);
    const [settingsStatus, setSettingsStatus] = useState(false);

    // function addExpenseModalToggler(openOrClose) {
    //     openOrClose === "close" ? setModalAddExpenseStatus(false) : setModalAddExpenseStatus(true);
    // }
    function settingsToggler(openOrClose) {
        openOrClose === "close" ? setSettingsStatus(false) : setSettingsStatus(true);
    }

    return (
        <div className="Main">
            <NavBar settingsStatus={settingsStatus} settingsToggler={settingsToggler}></NavBar>

            <Home className="Common-hidden"></Home>
            <LogIn className="Common-hidden"></LogIn>
            <SignUp className="Common-hidden"></SignUp>

            <Settings className={settingsStatus === false ? "Main-Settings-Hidden" : ""}></Settings>
            <Expenses className={settingsStatus === false ? "" : "Main-Expenses-Hidden"}></Expenses>

            {/* <Expenses>
                className={settingsStatus === false ? "" : "Home-Expenses-Hidden"}
                addExpenseModalToggler={addExpenseModalToggler} 
            </Expenses> */}

            {/* <ModalAddExpense
                className={modalAddExpenseStatus === false ? "modalAddExpenseHidden" : ""}
                addExpenseModalToggler={addExpenseModalToggler}>
            </ModalAddExpense> */}

            <Footer></Footer>
        </div>
    )
}
export default Main