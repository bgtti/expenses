import { useState } from "react";
import { useSelector } from "react-redux";
import Invites from "./Invites"
import AddButton from "../../../Components/AddButton";
import AddIcon from "../../../Assets/Images/add.png"; //Source: Plus icons created by dmitri13 - Flaticon, at https://www.flaticon.com/free-icons/plus
import ModalAddWorkspace from "../ModalAddWorkspace/ModalAddWorkspace";
import "./Dashboard.css"

function Dashboard(props) {

    const [modalAddWorkspaceStatus, setModalAddWorkspaceStatus] = useState(false);
    const hasWorkspace = useSelector((state) => state.allWorkspaces.hasWorkspaces);
    const workspaces = useSelector((state) => state.allWorkspaces.workspaces);
    const hasInvites = useSelector((state) => state.allInvites.hasInvites);
    const invites = useSelector((state) => state.allInvites.invites);

    function addWorkspaceModalToggler(openOrClose) {
        openOrClose === "close" ? setModalAddWorkspaceStatus(false) : setModalAddWorkspaceStatus(true);
    }

    return (
        <div className={`Dashboard Common-padding Common-expand-flex-1 ${props.className}`}>
            <ModalAddWorkspace
            className={modalAddWorkspaceStatus === false ? "modalAddWorkspaceHidden" : ""}
            addWorkspaceModalToggler={addWorkspaceModalToggler}>

            </ModalAddWorkspace>
            <h2 className="Dashboard-h2">Dashboard</h2>
            <hr />
            { 
                hasInvites === true ?
                (
                    <>
                    <h3>Invites</h3>
                    {invites.map((invite, index) => (
                            <Invites
                                key={index}
                                inviteType={invite.type}
                                inviteSender={invite.user_who_sent_invite_name}
                                workspaceName={invite.workspace_in_question_name}
                            />
                        ))}
                        <hr />
                    </>
                    
                ) : ""
            }
            {
                (hasWorkspace === false || hasWorkspace === undefined || hasWorkspace === "undefined" || hasWorkspace === "" ) ?
                (
                    <>
                        <h3>Workspaces</h3>
                        <p>You don't have any worspaces yet. Create a workspace to begin your bookeeping!</p>
                        <AddButton 
                        name="Add Workspace" btnAction="open" className="Common-button-primary"
                        onClickFunction={addWorkspaceModalToggler}><img src={AddIcon} alt="Add icon" /></AddButton>
                    </>
                    
                ) : 
                (
                    <>
                        <h3>Workspaces</h3> 
                        <p>You can manage your workspaces under User &gt; Account Settings.</p>
                        {workspaces && workspaces.map((workspace, index) => (
                            <div className="Dashboard-workspace-container" key={index}>
                                <div className="Dashboard-workspace-abreviation">
                                    <p>{workspace.abbreviation.toUpperCase()}</p>
                                </div>
                                <div className="Dashboard-workspace-name-container">
                                    <p>{workspace.name}</p>
                                    <p><small>{workspace.num_users_with_access === 0 ? "1 member" : workspace.num_users_with_access + 1 + " members"}</small></p>
                                </div>
                                <div>
                                    <button className="Common-button-secondary">Open workspace</button>
                                </div>
                            </div>
                        ))}
                    </>
                )
            }
        </div>
    )
}
export default Dashboard