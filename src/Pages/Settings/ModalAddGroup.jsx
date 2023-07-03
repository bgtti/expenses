import ModalWrapper from "../../Components/ModalWrapper";
import closeIcon from "../../Assets/Images/close.png" //Source: Close icons created by Pixel perfect - Flaticon, available at https://www.flaticon.com/free-icons/close
//import "../../Styles/ModalAddExpense.css"

function ModalAddSettings(props) {
    return (
        <ModalWrapper className="ModalAddSettings">
            <form className="ModalAddSettings-Form">
                <img src={closeIcon} alt="close modal" className="ModalAddExpense-CloseModalIcon" />
                <h2>Add Group</h2>
                <div className="ModalAddSettings-InputContainer">
                    <label htmlFor="addToSettings">Description:</label>
                    <input id="addToSettings" name="addToSettings" type="text" />
                </div>
                <button type="submit" className="ModalAddExpense-AddExpenseBtn">Add expense</button>
            </form>
        </ModalWrapper>
    )
}

export default ModalAddSettings;
