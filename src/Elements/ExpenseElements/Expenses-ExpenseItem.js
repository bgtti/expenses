import { useState } from "react";
import "../../Styles/Expenses.css"
import trashIcon from '../../Images/trash.png' // Source: Delete icons created by bqlqn - Flaticon, from https://www.flaticon.com/free-icons/delete
import editIcon from '../../Images/editing.png' // Modify icons created by Freepik - Flaticon, from https://www.flaticon.com/free-icons/modify

function ExpenseItem(props) {
    const [exDescription, setExDescription] = useState(props.exDescription);
    function clickHandler() {
        setExDescription('New val');
        console.log("here");
    };
    return (
        <tr >
            <td>{new Intl.DateTimeFormat('en-GB', { day: '2-digit', month: 'long', year: 'numeric' }).format(props.exDate)}</td>
            <td>{props.exNr}</td>
            <td>{exDescription}</td>
            <td>{props.exAmount}</td>
            <td>{props.project}</td>
            <td>{props.type}</td>
            <td onClick={clickHandler} role="button"><img src={editIcon} alt="edit element" className="ExpenseItem-Icon" /></td>
            <td role="button"><img src={trashIcon} alt="delete element" className="ExpenseItem-Icon" /></td>
        </tr>
    )
}
export default ExpenseItem
