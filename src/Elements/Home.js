import Expenses from "./Expenses"
import "../Styles/Home.css"
import Logo from "../Images/expenses.png"
function Home() {
    return (
        <div className="Home">
            <div className="Home-Header">
                <img src={Logo} alt="Logo" />
                <h1>Expenses App</h1>
            </div>

            <Expenses></Expenses>
        </div>
    )
}
export default Home