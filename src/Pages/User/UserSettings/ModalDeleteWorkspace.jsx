import { useDispatch, useSelector} from "react-redux";
import { deleteWorkspace } from "../../../general_redux/UserSettingsWorkspaces/actions";
import ModalWrapper from "../../../Components/ModalWrapper";
import closeIcon from "../../../Assets/Images/close.png" //Source: Close icons created by Pixel perfect - Flaticon, available at https://www.flaticon.com/free-icons/close
import "../../../Assets/Styles/Modal.css"
import "../User.css"

//MISSING: form validation: disable button until all fields are filled

function ModalDeleteWorkspace(props) {
    const dispatch = useDispatch();
    const styleClasses = 'ModalDeleteWorkspace ' + props.className;
    const allWorkspaces = useSelector((state) => state.allWorkspaces.workspaces);
    const workspaceUuid = props.uuid;
    const theWorkspace = allWorkspaces.find(workspace => workspace.uuid === workspaceUuid);

    function closeThisModal() {
        props.deleteWorkspaceModalToggler("close");
    }

    const formSubmitHandlerDeleteWorkspace = (event) => {
        event.preventDefault();
        dispatch(deleteWorkspace(workspaceUuid))
    };

    return (
        <ModalWrapper className={styleClasses}>
            <form className="Modal-Container" onSubmit={formSubmitHandlerDeleteWorkspace}>
                <img src={closeIcon} alt="close modal" className="Modal-CloseModalIcon" onClick={closeThisModal} />
                <h2>Delete Workspace</h2>
                <p>You are about to delete the following workspace:</p>
                {
                    (theWorkspace && theWorkspace !== undefined) ?
                    (<p><b>{theWorkspace.abbreviation}</b>| {theWorkspace.name}</p>):
                    ("")
                }
                <p>This action cannot be undone. Are you sure you want to proceed?</p>
                <button type="submit" className="Modal-PrimaryBtn" onClick={closeThisModal}>Delete Workspace</button>
            </form>
        </ModalWrapper>
    )
}

export default ModalDeleteWorkspace;
