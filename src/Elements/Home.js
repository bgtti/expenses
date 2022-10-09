import { useState } from "react";
import Expenses from "./ExpenseElements/Expenses"
import AddButton from "./GeneralUI/AddButton"
import ModalAddExpense from "./ExpenseElements/ModalAddExpense"
import "../Styles/Home.css"
import Logo from "../Images/expenses.png"
function Home() {
    const [modalAddExpenseStatus, setModalAddExpenseStatus] = useState(true);

    function addExpenseModalToggler (openOrClose){
        console.log("clicked here")
    openOrClose === "close" ? setModalAddExpenseStatus(false) : setModalAddExpenseStatus(true);
    console.log(modalAddExpenseStatus)
    }
    
    return (
        <div className="Home">
            <div className="Home-Header">
                <img src={Logo} alt="Logo" />
                <h1>Expenses App</h1>
            </div>
            <AddButton name="Add new expense" addExpenseModalToggler={addExpenseModalToggler}></AddButton>
            <ModalAddExpense 
            className={modalAddExpenseStatus === false ? "modalAddExpenseHidden" : "" }
            addExpenseModalToggler={addExpenseModalToggler}></ModalAddExpense>
            <Expenses></Expenses>
        </div>
    )
}
export default Home