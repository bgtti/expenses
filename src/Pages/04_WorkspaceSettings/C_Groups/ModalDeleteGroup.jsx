import { useDispatch, useSelector } from "react-redux";
import { deleteSelectedWorkspaceGroup } from '../../../general_redux/Workspace/actions';
import ModalWrapper from "../../../Components/ModalWrapper";
import closeIcon from "../../../Assets/Images/close.png" //Source: Close icons created by Pixel perfect - Flaticon, available at https://www.flaticon.com/free-icons/close
import "../../../Assets/Styles/Modal.css"

function ModalDeleteGroup(props) {
    const dispatch = useDispatch();
    const styleClasses = props.className;
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
        closeThisModal()
    };

    return (
        <ModalWrapper className={styleClasses}>
            <form className="Modal-Container" onSubmit={formSubmitHandlerDeleteGroup}>
                <div className="Modal-Heading">
                    <h2>Delete Group</h2>
                    <div>
                        <img src={closeIcon} alt="close modal" className="Modal-CloseModalIcon" onClick={closeThisModal} />
                    </div>
                </div>
                <p className="Modal-SubHeading-Info">Workspace: {selectedWorkspace.abbreviation.toUpperCase()} | {selectedWorkspace.name}</p>
                <p>You are about to delete the following group:</p>
                {
                    (theGroup && selectedWorkspace) ?
                        (
                            <div className="Modal-InformationGroupingDiv">
                                <p><b>Group name: {theGroup.name}</b></p>
                                <p className="Modal-InformationGroupingDiv-Pgray">Group description: {theGroup.description ? theGroup.description : "-"}</p>
                                <p className="Modal-InformationGroupingDiv-Pgray">Group code: {theGroup.code ? theGroup.code : "-"}</p>
                            </div>
                        ) :
                        (<p><b>Group not found.</b></p>)
                }
                <p>This action cannot be undone. Are you sure you want to proceed?</p>
                <button type="submit" className="Modal-PrimaryBtn">Delete group</button>
            </form>
        </ModalWrapper>
    )
}

export default ModalDeleteGroup;
