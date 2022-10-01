import Expenses from "./ExpenseElements/Expenses"
import AddButton from "./GeneralUI/AddButton"
import ModalAddExpense from "./ExpenseElements/ModalAddExpense"
import "../Styles/Home.css"
import Logo from "../Images/expenses.png"
function Home() {
    // function openModalHandler (){

    // }
    return (
        <div className="Home">
            <div className="Home-Header">
                <img src={Logo} alt="Logo" />
                <h1>Expenses App</h1>
            </div>
            <AddButton name="Add new expense"></AddButton>
            <ModalAddExpense className="ModalAddExpenseHidden"></ModalAddExpense>
            <Expenses></Expenses>
        </div>
    )
}
export default Home