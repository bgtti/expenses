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
    // const hasWorkspace = false;
    // const workspaces = undefined;
    const hasInvites = useSelector((state) => state.isLoggedIn.hasInvites);
    const invites = useSelector((state) => state.isLoggedIn.invites);
    //use for testing:
    // const invites = [{type: "give_access", user_who_sent_invite_name: "Jason", workspace_in_question_name: "Accounting YTP"},
    //                     {type: "ownership_transfer", user_who_sent_invite_name: "Jamie", workspace_in_question_name: "Qrun Books" }]
    // const workspaces = [{name: "My WS", abbreviation: "MW"}, {name: "Catterpillar", abbreviation: "CP"}]

    function addWorkspaceModalToggler(openOrClose) {
        // console.log(modalAddWorkspaceStatus)
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
                (hasWorkspace === false || hasWorkspace === undefined) ?
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
                        <p>You can manage your workspaces under user settings.</p>
                        {workspaces.map((workspace, index) => (
                            <div className="Dashboard-workspace-container">
                                <div className="Dashboard-workspace-abreviation">
                                    <p>{workspace.abbreviation}</p>
                                </div>
                                <div className="Dashboard-workspace-name-container">
                                    <p>{workspace.name}</p>
                                    <p><small>6 members</small></p>
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