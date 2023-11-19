import { useDispatch, useSelector } from "react-redux";
import { deleteSelectedWorkspaceSubgroup } from '../../general_redux/Workspace/actions';
import ModalWrapper from "../../Components/ModalWrapper";
import closeIcon from "../../Assets/Images/close.png" //Source: Close icons created by Pixel perfect - Flaticon, available at https://www.flaticon.com/free-icons/close
import "../../Assets/Styles/Modal.css"

function ModalDeleteSubgroup(props) {
    const dispatch = useDispatch();
    const styleClasses = props.className;
    const selectedWorkspace = useSelector((state) => state.selectedWorkspace.selectedWorkspace);
    const allSubgroups = useSelector((state) => state.selectedWorkspace.selectedWorkspaceSubgroups);
    const subgroupUuid = props.uuid;
    const theSubgroup = allSubgroups.find(group => group.uuid === subgroupUuid);
    function closeThisModal() {
        props.deleteSubgroupModalToggler("close"); ///PROPS
    }
    const formSubmitHandlerDeleteGroup = (event) => {
        event.preventDefault();
        dispatch(deleteSelectedWorkspaceSubgroup(theSubgroup.uuid));
        closeThisModal()
    };

    return (
        <ModalWrapper className={styleClasses}>
            <form className="Modal-Container" onSubmit={formSubmitHandlerDeleteGroup}>
                <div className="Modal-Heading">
                    <h2>Delete Sub-Group</h2>
                    <div>
                        <img src={closeIcon} alt="close modal" className="Modal-CloseModalIcon" onClick={closeThisModal} />
                    </div>
                </div>
                <p className="Modal-SubHeading-Info">Workspace: {selectedWorkspace.abbreviation.toUpperCase()} | {selectedWorkspace.name}</p>
                <p>You are about to delete the following group:</p>
                {
                    (theSubgroup && selectedWorkspace) ?
                        (
                            <div className="Modal-InformationGroupingDiv">
                                <p><b>Sub-group name: {theSubgroup.name}</b></p>
                                <p className="Modal-InformationGroupingDiv-Pgray">Sub-group description: {theSubgroup.description ? theSubgroup.description : "-"}</p>
                                <p className="Modal-InformationGroupingDiv-Pgray">Sub-group code: {theSubgroup.code ? theSubgroup.code : "-"}</p>
                            </div>
                        ) :
                        (<p><b>Sub-group not found.</b></p>)
                }
                <p>This action cannot be undone. Are you sure you want to proceed?</p>
                <button type="submit" className="Modal-PrimaryBtn">Delete sub-group</button>
            </form>
        </ModalWrapper>
    )
}

export default ModalDeleteSubgroup;