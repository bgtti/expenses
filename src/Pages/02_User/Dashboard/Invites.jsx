import "./Invites.css"
function Invites(props) {
    return (
        <div className={`Invites ${props.className}`}>
            {
                (props.inviteType === "give_access") ? 
                (<p>{props.inviteSender} has invited you to access the workspace <b>{props.workspaceName}</b>.</p>) :
                (<p>{props.inviteSender} wants to give you ownership of the workspace <b>{props.workspaceName}</b>.</p>)
            }
            <div className="Invites-button-container">
                <button type="submit" className="Common-button-primary">Accept</button>
                <button type="submit" className="Common-button-danger">Decline</button>
            </div>
        </div>
    )
}
export default Invites