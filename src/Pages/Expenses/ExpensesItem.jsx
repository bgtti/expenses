import { useState } from "react";
import trashIcon from '../../Assets/Images/trash.png' // Source: Delete icons created by bqlqn - Flaticon, from https://www.flaticon.com/free-icons/delete
import editIcon from '../../Assets/Images/editing.png' // Modify icons created by Freepik - Flaticon, from https://www.flaticon.com/free-icons/modify
import "./Expenses.css"

function ExpenseItem(props) {
    const [exDescription, setExDescription] = useState(props.exDescription);
    const theDate = JSON.stringify(new Intl.DateTimeFormat('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).format(props.exDate)).replaceAll('"', "").split(" ")

    function clickHandler() {
        setExDescription('New value');
        console.log("here");
    };
    return (
        <tr >
            <td className="ExpenseItem-Date" data-title="Date">
                <div className="ExpenseItem-DateSpanContainer">
                    <span className="ExpenseItem-Date-DayMonth">{theDate[0]} {theDate[1]}</span>
                    <span className="ExpenseItem-Date-Year">{theDate[2]}</span>
                </div>
            </td>
            <td data-title="Expense Nr">{props.exNr}</td>
            <td data-title="Description">{exDescription}</td>
            <td data-title="Amount">{props.exAmount}</td>
            <td data-title="Category">{props.category}</td>
            <td data-title="Group">{props.project}</td>
            <td data-title="Account">{props.account}</td>
            <td data-title="Tag">{props.tag}</td>
            <td data-title="Edit" onClick={clickHandler} role="button"><img src={editIcon} alt="edit element" className="ExpenseItem-Icon" /></td>
            <td data-title="Delete" role="button"><img src={trashIcon} alt="delete element" className="ExpenseItem-Icon" /></td>
        </tr>
    )
}
export default ExpenseItem
