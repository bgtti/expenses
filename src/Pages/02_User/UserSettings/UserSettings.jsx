import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import AddButton from "../../../Components/AddButton";
import ModalAddWorkspace from "../ModalAddWorkspace/ModalAddWorkspace";
import ModalDeleteUserAccount from "./ModalDeleteUserAccount";
import ModalEditWorkspace from "../ModalEditWorkspace/ModalEditWorkspace";
import ModalDeleteWorkspace from "./ModalDeleteWorkspace";
import editIcon from '../../../Assets/Images/editing.png'; // Modify icons created by Freepik - Flaticon, from https://www.flaticon.com/free-icons/modify
import AddIcon from "../../../Assets/Images/add.png"; //Source: Plus icons created by dmitri13 - Flaticon, at https://www.flaticon.com/free-icons/plus
import trashIcon from '../../../Assets/Images/trash.png'; // Source: Delete icons created by bqlqn - Flaticon, from https://www.flaticon.com/free-icons/delete
// import "../../../Assets/Styles/Settings.css";
import "../User.css"
import "../../../Assets/Styles/Common.css"


function UserSettings(props) {
    const userIsLoggedIn = useSelector((state) => state.isLoggedIn.loggedIn);
    const userInfo = useSelector((state) => state.isLoggedIn.user);
    // const hasWorkspace = useSelector((state) => state.allWorkspaces.hasWorkspaces);
    const workspaces = useSelector((state) => state.allWorkspaces.workspaces);
    const [modalAddWorkspaceStatus, setModalAddWorkspaceStatus] = useState(false);
    const [modalEditWorkspaceStatus, setModalEditWorkspaceStatus] = useState(false);
    const [modalDeleteWorkspaceStatus, setModalDeleteWorkspaceStatus] = useState(false);
    const [modalDeleteUserAccountStatus, setModalDeleteUserAccountStatus] = useState(false);
    const [workspaceToEditUuid, setWorkspaceToEditUuid] = useState("");
    const [workspaceToDeleteUuid, setWorkspaceToDeleteUuid] = useState("");

    useEffect(() => {
        if (modalEditWorkspaceStatus === false) {
            setTimeout(() => {
                setWorkspaceToEditUuid("");
            }, 500)
        }
    }, [modalEditWorkspaceStatus])
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
        openOrClose === "close" ? setModalDeleteUserAccountStatus(false) : setModalDeleteUserAccountStatus(true);
    }

    return (
        <section className={`UserSettings Common-padding Common-expand-flex-1 ${props.className}`}>
            <ModalAddWorkspace
                className={modalAddWorkspaceStatus === false ? "Common-hidden" : ""}
                addWorkspaceModalToggler={addWorkspaceModalToggler}>
            </ModalAddWorkspace>
            {
                (workspaceToEditUuid === "") ?
                    ("") :
                    (
                        <ModalEditWorkspace
                            className={modalEditWorkspaceStatus === false ? "Common-hidden" : ""}
                            editWorkspaceModalToggler={editWorkspaceModalToggler} uuid={workspaceToEditUuid}>
                        </ModalEditWorkspace>
                    )
            }
            {
                (workspaceToDeleteUuid === "") ?
                    ("") :
                    (
                        <ModalDeleteWorkspace
                            className={modalDeleteWorkspaceStatus === false ? "Common-hidden" : ""}
                            deleteWorkspaceModalToggler={deleteWorkspaceModalToggler} uuid={workspaceToDeleteUuid}>
                        </ModalDeleteWorkspace>
                    )
            }
            <ModalDeleteUserAccount
                className={modalDeleteUserAccountStatus === false ? "Common-hidden" : ""}
                deleteAccountModalToggler={deleteAccountModalToggler}>
            </ModalDeleteUserAccount>
            <h2>User Settings</h2>
            {
                userIsLoggedIn && (
                    <section>
                        <h3>Account</h3>
                        <table className="Common-InfoTable">
                            <tbody>
                                <tr>
                                    <th>Name:</th><td>{userInfo.name}</td>
                                </tr>
                                <tr>
                                    <th>E-mail</th><td>{userInfo.email}</td>
                                </tr>
                            </tbody>
                        </table>
                        <AddButton name="Delete Account" className="Common-button-secondary"
                            onClickFunction={deleteAccountModalToggler}>
                            <img src={trashIcon} alt="delete user" className="Common-Icon-light" />
                        </AddButton>
                    </section>
                )
            }
            <hr />
            <section>
                <h3>Work Spaces</h3>
                <p>You can have up to 10 different organizations.</p>
                <AddButton name="Add Workspace" className="Common-button-primary" onClickFunction={addWorkspaceModalToggler}
                    disable={(workspaces && workspaces.length) > 9 ? true : false}>
                    <img src={AddIcon} alt="Add icon" />
                </AddButton>
                {
                    (workspaces === undefined || workspaces === "undefined" || workspaces.length === 0) ?
                        (<p className="Common-PSInfo-P">You do not own or have access to any workspace. Add a workspace!</p>) :
                        (
                            <table className="Common-Table ">
                                <tbody>
                                    <tr >
                                        <th>Abbrev.</th>
                                        <th>WS Name</th>
                                        <th>Shared with</th>
                                    </tr>
                                    {workspaces.map((workspace, index) => (
                                        <tr key={index}>
                                            <td className="Common-Table-tdBullet"><div className="Common-Table-YellowDiv"></div>{workspace.abbreviation.toUpperCase()}</td>
                                            <td>
                                                {workspace.name}
                                            </td>
                                            <td>
                                                Members: {workspace.num_users_with_access}
                                            </td>
                                            <td className="Common-Table-tdIcon">
                                                <img role="button" src={editIcon} alt="edit element" className="Common-Icon" onClick={() => { setWorkspaceToEditUuid(`${workspace.uuid}`); editWorkspaceModalToggler("open"); }} />
                                            </td>
                                            <td className="Common-Table-tdIcon">
                                                <img role="button" src={trashIcon} alt="delete element" className="Common-Icon" onClick={() => { setWorkspaceToDeleteUuid(`${workspace.uuid}`); deleteWorkspaceModalToggler("open"); }} />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )
                }
            </section>
        </section>

    )
}

export default UserSettings;