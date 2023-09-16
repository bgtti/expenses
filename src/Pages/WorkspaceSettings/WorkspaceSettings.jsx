// import GroupData from "../../Data/GroupData";
// import TypepData from "../../Data/TypeData";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import ModalAddGroup from "./ModalAddGroup";
import AddButton from "../../Components/AddButton";
import trashIcon from '../../Assets/Images/trash.png' // Source: Delete icons created by bqlqn - Flaticon, from https://www.flaticon.com/free-icons/delete
import editIcon from '../../Assets/Images/editing.png' // Modify icons created by Freepik - Flaticon, from https://www.flaticon.com/free-icons/modify
import AddIcon from "../../Assets/Images/add.png"; //Source: Plus icons created by dmitri13 - Flaticon, at https://www.flaticon.com/free-icons/plus
import "./WorkspaceSettings.css";
import "../../Assets/Styles/Common.css"


function WorkspaceSettings(props) {
    // const styleClasses = 'WorkspaceSettings ' + props.className;
    const workspaceUuid = "123"//GET THIS INFO
    const [modalEditWorkspaceStatus, setModalEditWorkspaceStatus] = useState(false);
    const [modalAddGroupStatus, setModalAddGroupStatus] = useState(false);
    //missing modals: edit group, delete group, add account, edit account, delete account, add type, edit type, delete type
    function editWorkspaceModalToggler(openOrClose) {
        openOrClose === "close" ? setModalEditWorkspaceStatus(false) : setModalEditWorkspaceStatus(true);
    }
    function addGroupModalToggler(openOrClose) {
        openOrClose === "close" ? setModalAddGroupStatus(false) : setModalAddGroupStatus(true);
    }
    return (
        <section className={`WorkspaceSettings Common-padding Common-expand-flex-1 ${props.className}`}>
            <ModalAddGroup
            className={modalAddGroupStatus === false ? "modalAddGroupHidden" : ""}
            addGroupModalToggler={addGroupModalToggler} workspaceUuid={workspaceUuid}>
            </ModalAddGroup>
            <h2>Workspace Settings</h2>
            <hr />
            <section>
                <h3>This Workspace</h3>
                <p><b>Name:</b> This WS</p>
                <p><b>Base currency:</b> USD</p>
                <p><b>Access:</b> you have not shared this workspace with anyone</p>
                <AddButton name="Edit Workspace" className="Common-button-secondary">
                    <img src={editIcon} alt="edit element" className="WorkspaceSettings-Icon-light" />
                </AddButton>
            </section>
            <hr />
            <section>
                <h3>General Workspace Settings</h3>
                <br />
                <div>
                    <h4>Groups</h4>
                    <p>You can group expenses by project, rental property, product, service, or any transactional good your company offers.</p>
                    <AddButton name="Add Group" className="Common-button-primary" onClickFunction={addGroupModalToggler}>
                        <img src={AddIcon} alt="Add icon" />
                    </AddButton>
                    <ul className="WorkspaceSettings-List">
                        <li className="WorkspaceSettings-ListItem">
                            <div className="WorkspaceSettings-ListBullet"></div>
                            <div>Project 1</div>
                            <img role="button" src={editIcon} alt="edit element" className="WorkspaceSettings-Icon" />
                            <img role="button" src={trashIcon} alt="delete element" className="WorkspaceSettings-Icon" />
                        </li>
                        <li className="WorkspaceSettings-ListItem">
                            <div className="WorkspaceSettings-ListBullet"></div>
                            <div>Project 2</div>
                            <img role="button" src={editIcon} alt="edit element" className="WorkspaceSettings-Icon" />
                            <img role="button" src={trashIcon} alt="delete element" className="WorkspaceSettings-Icon" />
                        </li>
                    </ul>
                </div>
                <br />
                <div>
                    <h4>Accounts</h4>
                    <p>You can set different accounts, such as 'Bank' or 'Cash' accounts.</p>
                    <AddButton name="Add Account" className="Common-button-primary">
                        <img src={AddIcon} alt="Add icon" />
                    </AddButton>
                    <ul className="WorkspaceSettings-List">
                        <li className="WorkspaceSettings-ListItem">
                            <div className="WorkspaceSettings-ListBullet"></div>
                            <div>Bank</div>
                            <img role="button" src={editIcon} alt="edit element" className="WorkspaceSettings-Icon" />
                            <img role="button" src={trashIcon} alt="delete element" className="WorkspaceSettings-Icon" />
                        </li>
                        <li className="WorkspaceSettings-ListItem">
                            <div className="WorkspaceSettings-ListBullet"></div>
                            <div>Cash</div>
                            <img role="button" src={editIcon} alt="edit element" className="WorkspaceSettings-Icon" />
                            <img role="button" src={trashIcon} alt="delete element" className="WorkspaceSettings-Icon" />
                        </li>
                    </ul>
                </div>
            </section>
            <hr />
            <section>
                <h3>Expense Settings</h3>
                <br />
                <div>
                    <h4>Expense category</h4>
                    <p>You can assign a type of expense to each item.</p>
                    <AddButton name="Add Category" className="Common-button-primary">
                        <img src={AddIcon} alt="Add icon" />
                    </AddButton>
                    <ul className="WorkspaceSettings-List">
                        <li className="WorkspaceSettings-ListItem">
                            <div className="WorkspaceSettings-ListBullet"></div>
                            <div>Utilities</div>
                            <img role="button" src={editIcon} alt="edit element" className="WorkspaceSettings-Icon" />
                            <img role="button" src={trashIcon} alt="delete element" className="WorkspaceSettings-Icon" />
                        </li>
                        <li className="WorkspaceSettings-ListItem">
                            <div className="WorkspaceSettings-ListBullet"></div>
                            <div>Marketing</div>
                            <img role="button" src={editIcon} alt="edit element" className="WorkspaceSettings-Icon" />
                            <img role="button" src={trashIcon} alt="delete element" className="WorkspaceSettings-Icon" />
                        </li>
                    </ul>
                </div>
                <br />
                <div>
                    <h4>Expense Tags</h4>
                    <p>tags here...</p>
                </div>
                <br />
                <div>
                    <h4>Expense Tax Rules</h4>
                    <p>tax rules here here...</p>
                </div>
                <br />
                <div>
                    <h4>Expenses numbering</h4>
                    <p>How would you like your expenses to be numbered?</p>
                    <form action="">
                        <div className="WorkspaceSettings-checkboxContainer">
                            <input type="checkbox" id="option1" name="option1" value="option1" checked/>
                            <label htmlFor="option1">YY-MM-number</label><br />
                        </div>
                        <div className="WorkspaceSettings-checkboxContainer">
                            <input type="checkbox" id="option2" name="option2" value="option2" />
                            <label htmlFor="option2">Number</label><br />
                        </div>
                    </form>
                </div>
            </section>
            <hr />
            <section>
                <h3>Income Settings</h3>
                <p>income settings here...</p>
            </section>
            <hr />
            <section>
                <h3>Other Settings</h3>
                <br />
                <h4>Persons</h4>
                <p>If persons in your business collect cash payments or a partner in the company deposits money in the company's bank account you can add 'persons' to track such transactions.</p>
            </section>
        </section>
    )
}

export default WorkspaceSettings;