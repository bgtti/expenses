// import GroupData from "../../Data/GroupData";
// import TypepData from "../../Data/TypeData";
import AddButton from "../../Components/AddButton";
import trashIcon from '../../Assets/Images/trash.png' // Source: Delete icons created by bqlqn - Flaticon, from https://www.flaticon.com/free-icons/delete
import editIcon from '../../Assets/Images/editing.png' // Modify icons created by Freepik - Flaticon, from https://www.flaticon.com/free-icons/modify
import AddIcon from "../../Assets/Images/add.png"; //Source: Plus icons created by dmitri13 - Flaticon, at https://www.flaticon.com/free-icons/plus
import "../../Assets/Styles/Settings.css";


function Settings(props) {
    // const styleClasses = 'Settings ' + props.className;
    return (
        <section className={`Settings Common-padding Common-expand-flex-1 ${props.className}`}>
            <h2>Settings</h2>
            <hr />
            <section>
                <h3>Workspace</h3>
                <p><b>Name:</b> This WS</p>
                <p><b>Base currency:</b> USD</p>
                <p><b>Access:</b> you have not shared this workspace with anyone</p>
                <AddButton name="Edit Workspace" className="Common-button-secondary">
                    <img src={editIcon} alt="edit element" className="Settings-Icon-light" />
                </AddButton>
            </section>
            <hr />
            <section>
                <h3>Group</h3>
                <p>You can group expenses by assigning them to a group.</p>
                <AddButton name="Add Group" className="Common-button-primary">
                    <img src={AddIcon} alt="Add icon" />
                </AddButton>
                <ul className="Settings-List">
                    <li className="Settings-ListItem">
                        <div className="Settings-ListBullet"></div>
                        <div>Project 1</div>
                        <img role="button" src={editIcon} alt="edit element" className="Settings-Icon" />
                        <img role="button" src={trashIcon} alt="delete element" className="Settings-Icon" />
                    </li>
                    <li className="Settings-ListItem">
                        <div className="Settings-ListBullet"></div>
                        <div>Project 2</div>
                        <img role="button" src={editIcon} alt="edit element" className="Settings-Icon" />
                        <img role="button" src={trashIcon} alt="delete element" className="Settings-Icon" />
                    </li>
                </ul>
            </section>
            <hr />
            <section>
                <h3>Accounts</h3>
                <p>You can set different accounts, such as 'Bank' or 'Cash' accounts.</p>
                <AddButton name="Add Account" className="Common-button-primary">
                    <img src={AddIcon} alt="Add icon" />
                </AddButton>
                <ul className="Settings-List">
                    <li className="Settings-ListItem">
                        <div className="Settings-ListBullet"></div>
                        <div>Bank</div>
                        <img role="button" src={editIcon} alt="edit element" className="Settings-Icon" />
                        <img role="button" src={trashIcon} alt="delete element" className="Settings-Icon" />
                    </li>
                    <li className="Settings-ListItem">
                        <div className="Settings-ListBullet"></div>
                        <div>Cash</div>
                        <img role="button" src={editIcon} alt="edit element" className="Settings-Icon" />
                        <img role="button" src={trashIcon} alt="delete element" className="Settings-Icon" />
                    </li>
                </ul>
            </section>
            <hr />
            <section>
                <h3>Expenses numbering</h3>
                <p>How would you like your expenses to be numbered?</p>
                <form action="">
                    <div class="Settings-checkboxContainer">
                        <input type="checkbox" id="option1" name="option1" value="option1" checked/>
                        <label htmlFor="option1">YY-MM-number</label><br />
                    </div>
                    <div class="Settings-checkboxContainer">
                        <input type="checkbox" id="option2" name="option2" value="option2" />
                        <label htmlFor="option2">Number</label><br />
                    </div>
                </form>
            </section>
            <hr />
            <section>
                <h3>Type</h3>
                <p>You can assign a type of expense to each item.</p>
                <AddButton name="Add Type" className="Common-button-primary">
                    <img src={AddIcon} alt="Add icon" />
                </AddButton>
                <ul className="Settings-List">
                    <li className="Settings-ListItem">
                        <div className="Settings-ListBullet"></div>
                        <div>Utilities</div>
                        <img role="button" src={editIcon} alt="edit element" className="Settings-Icon" />
                        <img role="button" src={trashIcon} alt="delete element" className="Settings-Icon" />
                    </li>
                    <li className="Settings-ListItem">
                        <div className="Settings-ListBullet"></div>
                        <div>Marketing</div>
                        <img role="button" src={editIcon} alt="edit element" className="Settings-Icon" />
                        <img role="button" src={trashIcon} alt="delete element" className="Settings-Icon" />
                    </li>
                </ul>
            </section>
        </section>
    )
}

export default Settings;