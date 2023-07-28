import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import AddButton from "../../../Components/AddButton";
import ModalAddWorkspace from "../ModalAddWorkspace/ModalAddWorkspace";
import ModalDeleteAccount from "./ModalDeleteAccount";
import ModalEditWorkspace from "./ModalEditWorkspace";
import ModalDeleteWorkspace from "./ModalDeleteWorkspace";
import editIcon from '../../../Assets/Images/editing.png'; // Modify icons created by Freepik - Flaticon, from https://www.flaticon.com/free-icons/modify
import AddIcon from "../../../Assets/Images/add.png"; //Source: Plus icons created by dmitri13 - Flaticon, at https://www.flaticon.com/free-icons/plus
import trashIcon from '../../../Assets/Images/trash.png'; // Source: Delete icons created by bqlqn - Flaticon, from https://www.flaticon.com/free-icons/delete
// import "../../../Assets/Styles/Settings.css";
import "../User.css"
import "./UserSettings.css"
import "../../../Assets/Styles/Common.css"


function UserSettings(props) {
    const userInfo = useSelector((state) => state.isLoggedIn.user);
    // const hasWorkspace = useSelector((state) => state.allWorkspaces.hasWorkspaces);
    const workspaces = useSelector((state) => state.allWorkspaces.workspaces);
    const [modalAddWorkspaceStatus, setModalAddWorkspaceStatus] = useState(false);
    const [modalEditWorkspaceStatus, setModalEditWorkspaceStatus] = useState(false);
    const [modalDeleteWorkspaceStatus, setModalDeleteWorkspaceStatus] = useState(false);
    const [modalDeleteAccountStatus, setModalDeleteAccountStatus] = useState(false);
    const [workspaceToEditUuid, setWorkspaceToEditUuid] = useState("");
    const [workspaceToDeleteUuid, setWorkspaceToDeleteUuid] = useState("");

    useEffect(()=>{
        if (modalEditWorkspaceStatus === false){
            setTimeout(()=>{
                setWorkspaceToEditUuid("");
            }, 500)
        }
    },[modalEditWorkspaceStatus]) 
    function addWorkspaceModalToggler(openOrClose) {
        openOrClose === "close" ? setModalAddWorkspaceStatus(false) : setModalAddWorkspaceStatus(true);
    }
    function editWorkspaceModalToggler(openOrClose) {
        openOrClose === "close" ? setModalEditWorkspaceStatus(false) : setModalEditWorkspaceStatus(true);
    }
    function deleteWorkspaceModalToggler(openOrClose) {
        openOrClose === "close" ? setModalDeleteWorkspaceStatus(false) : setModalDeleteWorkspaceStatus(true);
    }
    function deleteAccountModalToggler(openOrClose) {
        openOrClose === "close" ? setModalDeleteAccountStatus(false) : setModalDeleteAccountStatus(true);
    }

    return (
        <section className={`UserSettings Common-padding Common-expand-flex-1 ${props.className}`}>
            <ModalAddWorkspace
            className={modalAddWorkspaceStatus === false ? "modalAddWorkspaceHidden" : ""}
            addWorkspaceModalToggler={addWorkspaceModalToggler}>
            </ModalAddWorkspace>
            {
                (workspaceToEditUuid === "") ?
                ("") :
                (
                    <ModalEditWorkspace
                    className={modalEditWorkspaceStatus === false ? "modalEditWorkspaceHidden" : ""}
                    editWorkspaceModalToggler={editWorkspaceModalToggler} uuid={workspaceToEditUuid}>
                    </ModalEditWorkspace>
                )
            }
            {
                (workspaceToDeleteUuid === "") ?
                ("") :
                (
                    <ModalDeleteWorkspace
                    className={modalDeleteWorkspaceStatus === false ? "modalDeleteWorkspaceHidden" : ""}
                    deleteWorkspaceModalToggler={deleteWorkspaceModalToggler} uuid={workspaceToDeleteUuid}>
                    </ModalDeleteWorkspace>
                )
            }
            <ModalDeleteAccount
            className={modalDeleteAccountStatus === false ? "modalDeleteAccountHidden" : ""}
            deleteAccountModalToggler={deleteAccountModalToggler}>
            </ModalDeleteAccount>
            <h2>User Settings</h2>
            <hr />
            <section>
                <h3>Account</h3>
                <p><b>Name:</b> {userInfo.name}</p>
                <p><b>Email:</b> {userInfo.email}</p>
                <AddButton name="Delete Account" className="Common-button-secondary" 
                    onClickFunction={deleteAccountModalToggler}>
                    <img src={trashIcon} alt="delete user" className="UserSettings-Icon-light" />
                </AddButton>
            </section> 
            <hr />
            <section>
                <h3>Work Spaces</h3>
                <p>You can have up to 10 different organizations.</p> 
                <AddButton name="Add Workspace" className="Common-button-primary" onClickFunction={addWorkspaceModalToggler}
                disable={(workspaces && workspaces.length) > 9 ? true : false}>
                    <img src={AddIcon} alt="Add icon" />
                </AddButton>
                {
                    (workspaces === undefined || workspaces === "undefined" || workspaces === []) ?
                    (<p>You do not own or have access to any workspace. Add a workspace!</p>):
                    (
                        <ul className="UserSettings-List">
                            {workspaces.map((workspace, index) => (
                                <li className="UserSettings-ListItem" key={index}>
                                    <div className="UserSettings-ListBullet"></div>
                                    <div><b>{workspace.abbreviation.toUpperCase()}</b></div>
                                    <div>{workspace.name}</div>
                                    <div>Members: {workspace.num_users_with_access}</div>
                                    <img role="button" src={editIcon} alt="edit element" className="UserSettings-Icon" 
                                        onClick={()=>{setWorkspaceToEditUuid(`${workspace.uuid}`); editWorkspaceModalToggler("open");}} />
                                    <img role="button" src={trashIcon} alt="delete element" className="UserSettings-Icon" 
                                        onClick={()=>{setWorkspaceToDeleteUuid(`${workspace.uuid}`); deleteWorkspaceModalToggler("open");}}/>
                                </li>
                                ))}
                        </ul>
                    ) 
                }
            </section>
        </section>
        
    )
}

export default UserSettings;