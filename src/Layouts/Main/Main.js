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
    const [signupStatus, setSignupStatus] = useState(false);
    const [loginStatus, setLoginStatus] = useState(false);
    const [settingsStatus, setSettingsStatus] = useState(false);
    const [expensesStatus, setExpensesStatus] = useState(true);

    // function addExpenseModalToggler(openOrClose) {
    //     openOrClose === "close" ? setModalAddExpenseStatus(false) : setModalAddExpenseStatus(true);
    // }
    function signUpToggler() {
        // openOrClose === "close" ? setSignupStatus(false) : setSignupStatus(true);
        openThePageAndHideAllOthers('signup')
    }
    function logInToggler() {
        // openOrClose === "close" ? setLoginStatus(false) : setLoginStatus(true);
        openThePageAndHideAllOthers('login')
    }
    function settingsToggler() {
        // openOrClose === "close" ? setSettingsStatus(false) : setSettingsStatus(true);
        openThePageAndHideAllOthers('settings')
    }
    function expensesToggler() {
        // openOrClose === "close" ? setSettingsStatus(false) : setSettingsStatus(true);
        openThePageAndHideAllOthers('expenses')
    }
    function openThePageAndHideAllOthers(pageToOpen){
        pageToOpen === "signup" ? setSignupStatus(true) : setSignupStatus(false);
        pageToOpen === "login" ? setLoginStatus(true) : setLoginStatus(false);
        pageToOpen === "settings" ? setSettingsStatus(true) : setSettingsStatus(false);
        pageToOpen === "expenses" ? setExpensesStatus(true) : setExpensesStatus(false);
    }

    return (
        <div className="Main">
            <NavBar 
                signupStatus={signupStatus} signUpToggler={signUpToggler}
                loginStatus={loginStatus} logInToggler={logInToggler}
                settingsStatus={settingsStatus} settingsToggler={settingsToggler}
                expensesStatus={expensesStatus} expensesToggler={expensesToggler}
            ></NavBar>

            <Home className="Common-hidden"></Home>
            <SignUp className={signupStatus === false ? "Common-hidden" : ""}></SignUp>
            <LogIn className={loginStatus === false ? "Common-hidden" : ""}></LogIn>

            <Settings className={settingsStatus === false ? "Common-hidden" : ""}></Settings>
            <Expenses className={expensesStatus === false ? "Common-hidden" : ""}></Expenses>

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