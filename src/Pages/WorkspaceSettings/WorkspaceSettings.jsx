import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import ModalEditWorkspace from "../User/ModalEditWorkspace/ModalEditWorkspace";
import ModalAddGroup from "./ModalAddGroup";
import ModalAddAccount from "./ModalAddAccount";
import ModalEditGroup from "./ModalEditGroup";
import ModalEditAccount from "./ModalEditAccount"
import ModalDeleteGroup from "./ModalDeleteGroup";
import ModalDeleteAccount from "./ModalDeleteAccount";
import AddButton from "../../Components/AddButton";
import trashIcon from '../../Assets/Images/trash.png' // Source: Delete icons created by bqlqn - Flaticon, from https://www.flaticon.com/free-icons/delete
import editIcon from '../../Assets/Images/editing.png' // Modify icons created by Freepik - Flaticon, from https://www.flaticon.com/free-icons/modify
import AddIcon from "../../Assets/Images/add.png"; //Source: Plus icons created by dmitri13 - Flaticon, at https://www.flaticon.com/free-icons/plus
import "./WorkspaceSettings.css";
import "../../Assets/Styles/Common.css"

//WORK IN PROGRESS: 
// Create add/edit/deete expense category modal and expense numbering

function WorkspaceSettings(props) {
    // const styleClasses = 'WorkspaceSettings ' + props.className;
    // the word 'account' bellow refers to the object belonging to the WS, not the user's account
    const selectedWorkspace = useSelector((state) => state.selectedWorkspace.selectedWorkspace);
    const selectedWorkspaceGroups = useSelector((state) => state.selectedWorkspace.selectedWorkspaceGroups);
    const selectedWorkspaceAccounts = useSelector((state) => state.selectedWorkspace.selectedWorkspaceAccounts);
    const [modalEditWorkspaceStatus, setModalEditWorkspaceStatus] = useState(false);
    const [modalAddGroupStatus, setModalAddGroupStatus] = useState(false);
    const [modalAddAccountStatus, setModalAddAccountStatus] = useState(false);
    const [modalEditGroupStatus, setModalEditGroupStatus] = useState(false);
    const [modalEditAccountStatus, setModalEditAccountStatus] = useState(false);
    //const [workspaceToEditUuid, setGroupToEditUuid] = useState("");
    const [groupToEditUuid, setGroupToEditUuid] = useState("");
    const [accountToEditUuid, setAccountToEditUuid] = useState("");
    const [modalDeleteGroupStatus, setModalDeleteGroupStatus] = useState(false);
    const [modalDeleteAccountStatus, setModalDeleteAccountStatus] = useState(false);
    const [groupToDeleteUuid, setGroupToDeleteUuid] = useState("");
    const [accountToDeleteUuid, setAccountToDeleteUuid] = useState("");
    
    // useEffect(()=>{
    //     if (modalEditWorkspaceStatus === false){
    //         setGroupToEditUuid("");
    //     }
    // },[modalEditWorkspaceStatus]) 

    useEffect(()=>{
        if (modalEditGroupStatus === false){
            setGroupToEditUuid("");
        }
    },[modalEditGroupStatus]) 

    useEffect(()=>{
        if (modalEditAccountStatus === false){
            setAccountToEditUuid("");
        }
    },[modalEditAccountStatus]) 

    function editWorkspaceModalToggler(openOrClose) {
        console.log(selectedWorkspace.uuid)
        openOrClose === "close" ? setModalEditWorkspaceStatus(false) : setModalEditWorkspaceStatus(true);
    }
    function addGroupModalToggler(openOrClose) {
        openOrClose === "close" ? setModalAddGroupStatus(false) : setModalAddGroupStatus(true);
    }
    function addAccountModalToggler(openOrClose) {
        openOrClose === "close" ? setModalAddAccountStatus(false) : setModalAddAccountStatus(true);
    }
    function editGroupModalToggler(openOrClose) {
        openOrClose === "close" ? setModalEditGroupStatus(false) : setModalEditGroupStatus(true);
    }
    function editAccountModalToggler(openOrClose) {
        openOrClose === "close" ? setModalEditAccountStatus(false) : setModalEditAccountStatus(true);
    }
    function deleteGroupModalToggler(openOrClose) {
        openOrClose === "close" ? setModalDeleteGroupStatus(false) : setModalDeleteGroupStatus(true);
    }
    function deleteAccountModalToggler(openOrClose) {
        openOrClose === "close" ? setModalDeleteAccountStatus(false) : setModalDeleteAccountStatus(true);
    }
    return (
        <section className={`WorkspaceSettings Common-padding Common-expand-flex-1 ${props.className}`}>
            {selectedWorkspace.uuid &&
                (   <>
                        <ModalEditWorkspace
                        className={modalEditWorkspaceStatus === false ? "modalEditWorkspaceHidden" : ""}
                        editWorkspaceModalToggler={editWorkspaceModalToggler} uuid={selectedWorkspace.uuid}>
                        </ModalEditWorkspace>
                        <ModalAddGroup
                        className={modalAddGroupStatus === false ? "modalAddGroupHidden" : ""}
                        addGroupModalToggler={addGroupModalToggler}>
                        </ModalAddGroup>
                        <ModalAddAccount
                        className={modalAddAccountStatus === false ? "modalAddAccountHidden" : ""}
                        addAccountModalToggler={addAccountModalToggler}>
                        </ModalAddAccount>
                    </>
                )
            }
            {groupToEditUuid &&
                (
                <ModalEditGroup
                className={modalEditGroupStatus === false ? "modalEditGroupHidden" : ""}
                editGroupModalToggler={editGroupModalToggler} uuid={groupToEditUuid}>
                </ModalEditGroup>
                )
            }
            {accountToEditUuid &&
                (
                <ModalEditAccount
                className={modalEditAccountStatus === false ? "modalEditAccountHidden" : ""}
                editAccountModalToggler={editAccountModalToggler} uuid={accountToEditUuid}>
                </ModalEditAccount>
                )
            }
            {groupToDeleteUuid &&
                (
                <ModalDeleteGroup
                className={modalDeleteGroupStatus === false ? "modalDeleteGroupHidden" : ""}
                deleteGroupModalToggler={deleteGroupModalToggler} uuid={groupToDeleteUuid}>
                </ModalDeleteGroup>
                )
            }
            {accountToDeleteUuid &&
                (
                <ModalDeleteAccount
                className={modalDeleteAccountStatus === false ? "modalDeleteAccountHidden" : ""}
                deleteAccountModalToggler={deleteAccountModalToggler} uuid={accountToDeleteUuid}>
                </ModalDeleteAccount>
                )
            }
            
            <h2>Workspace Settings</h2>
            <hr />
            {(!selectedWorkspace) ?
            (<section>
                <h3>Oops, an error occurred.</h3>
                <p>We could not find your workspace.</p>
            </section>)
            :
            (
                <>
                <section>
                <h3>{selectedWorkspace.abbreviation.toUpperCase() } | {selectedWorkspace.name}</h3>
                <p><b>Name:</b> {selectedWorkspace.name}</p>
                <p><b>Base currency:</b> {selectedWorkspace.currency}</p>
                <p><b>Access:</b> you have not shared this workspace with anyone</p>
                <AddButton name="Edit Workspace" className="Common-button-secondary" onClickFunction={editWorkspaceModalToggler}>
                    <img src={editIcon} alt="edit element" className="WorkspaceSettings-Icon-light"/>
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
                    {
                            (!selectedWorkspaceGroups) ?
                            (<p>No groups.</p>) :
                            (
                                <ul className="WorkspaceSettings-List"> 
                                    {selectedWorkspaceGroups.map((group, index) => (
                                        <li className="WorkspaceSettings-ListItem" key={index}>
                                            <div className="WorkspaceSettings-ListBullet"></div>
                                            <div>{group.name}</div>
                                            <img role="button" src={editIcon} alt="edit element" className="WorkspaceSettings-Icon" 
                                            onClick={()=>{setGroupToEditUuid(`${group.uuid}`); editGroupModalToggler("open");}}/>
                                            <img role="button" src={trashIcon} alt="delete element" className="WorkspaceSettings-Icon" 
                                            onClick={()=>{setGroupToDeleteUuid(`${group.uuid}`); deleteGroupModalToggler("open");}}/>
                                        </li>
                                    ))}
                                </ul>
                            )
                        }
                </div>
                <br />
                <div>
                    <h4>Accounts</h4>
                    <p>You can set different accounts, such as 'Bank' or 'Cash' accounts.</p>
                    <AddButton name="Add Account" className="Common-button-primary" onClickFunction={addAccountModalToggler}>
                        <img src={AddIcon} alt="Add icon" />
                    </AddButton>
                    {
                            (!selectedWorkspaceAccounts) ?
                            (<p>No accounts.</p>) :
                            (
                                <ul className="WorkspaceSettings-List"> 
                                    {selectedWorkspaceAccounts.map((account, index) => (
                                        <li className="WorkspaceSettings-ListItem" key={index}>
                                            <div className="WorkspaceSettings-ListBullet"></div>
                                            <div>{account.name}</div>
                                            <img role="button" src={editIcon} alt="edit element" className="WorkspaceSettings-Icon" 
                                            onClick={()=>{setAccountToEditUuid(`${account.uuid}`); editAccountModalToggler("open");}}/>
                                            <img role="button" src={trashIcon} alt="delete element" className="WorkspaceSettings-Icon" 
                                            onClick={()=>{setAccountToDeleteUuid(`${account.uuid}`); deleteAccountModalToggler("open");}}/>
                                        </li>
                                    ))}
                                </ul>
                            )
                        }
                    {/* <ul className="WorkspaceSettings-List">
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
                    </ul> */}
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
                {/* <div>
                    <h4>Expense Tags</h4>
                    <p>tags here...</p>
                </div>
                <br />
                <div>
                    <h4>Expense Tax Rules</h4>
                    <p>tax rules here here...</p>
                </div>
                <br /> */}
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
            {/* <hr />
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
            </section> */}
                </>
            )
            }
            </section>
    )
}

export default WorkspaceSettings;