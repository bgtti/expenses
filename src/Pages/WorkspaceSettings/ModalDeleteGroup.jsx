import { useDispatch, useSelector} from "react-redux";
import ModalWrapper from "../../Components/ModalWrapper";
import closeIcon from "../../Assets/Images/close.png" //Source: Close icons created by Pixel perfect - Flaticon, available at https://www.flaticon.com/free-icons/close
import "../../Assets/Styles/Modal.css"
import { deleteSelectedWorkspaceGroup } from '../../general_redux/Workspace/actions';

function ModalDeleteGroup(props) {
    const dispatch = useDispatch();
    const styleClasses = 'ModalEditWorkspace ' + props.className;
    const selectedWorkspace = useSelector((state) => state.selectedWorkspace.selectedWorkspace);
    const allGroups = useSelector((state) => state.selectedWorkspace.selectedWorkspaceGroups);
    const groupUuid = props.uuid;
    const theGroup = allGroups.find(group => group.uuid === groupUuid);
    function closeThisModal() {
        props.deleteGroupModalToggler("close"); ///PROPS
    }
    const formSubmitHandlerDeleteGroup = (event) => {
        event.preventDefault();
        dispatch(deleteSelectedWorkspaceGroup(theGroup.uuid));
    };

    return (
        <ModalWrapper className={styleClasses}>
            <form className="Modal-Container" onSubmit={formSubmitHandlerDeleteGroup}>
                <img src={closeIcon} alt="close modal" className="Modal-CloseModalIcon" onClick={closeThisModal}/>
                <h2>Delete Group</h2>
                <p>You are about to delete the following group:</p>
                {
                    (theGroup && selectedWorkspace) ?
                    (
                        <>
                        <p><small>Workspace: {selectedWorkspace.name}</small></p> 
                        <p>Group name: {theGroup.name}</p>
                        <p>Group description: {theGroup.description}</p>
                        <p>Group code: {theGroup.code}</p>
                        </>
                    ):
                    ("Group not found.")
                }
                <p>This action cannot be undone. Are you sure you want to proceed?</p>
                <button type="submit" className="Modal-PrimaryBtn" onClick={closeThisModal}>Delete group</button>
            </form>
        </ModalWrapper>
    )
}

export default ModalDeleteGroup;
