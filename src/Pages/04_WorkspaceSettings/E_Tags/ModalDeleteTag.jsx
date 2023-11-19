import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteSelectedWorkspaceTag } from '../../../general_redux/Workspace/actions';
import Tag from "../../../Components/Tag";
import ModalWrapper from "../../../Components/ModalWrapper";
import closeIcon from "../../../Assets/Images/close.png" //Source: Close icons created by Pixel perfect - Flaticon, available at https://www.flaticon.com/free-icons/close
import "../../../Assets/Styles/Modal.css"

// Note this modal deletes an tag belonging to the WS, not the user's tag

function ModalDeleteTag(props) {
    const dispatch = useDispatch();
    const styleClasses = props.className;
    const selectedWorkspace = useSelector((state) => state.selectedWorkspace.selectedWorkspace);
    const allTags = useSelector((state) => state.selectedWorkspace.selectedWorkspaceTags);
    const tagUuid = props.uuid;
    const theTag = allTags.find(tag => tag.uuid === tagUuid);

    function closeThisModal() {
        props.deleteTagModalToggler("close"); ///PROPS
    }
    const formSubmitHandlerDeleteTag = (event) => {
        event.preventDefault();
        dispatch(deleteSelectedWorkspaceTag(theTag.uuid));
        closeThisModal()
    };

    return (
        <ModalWrapper className={styleClasses}>
            <form className="Modal-Container" onSubmit={formSubmitHandlerDeleteTag}>
                <div className="Modal-Heading">
                    <h2>Delete Tag</h2>
                    <div>
                        <img src={closeIcon} alt="close modal" className="Modal-CloseModalIcon" onClick={closeThisModal} />
                    </div>
                </div>
                <p className="Modal-SubHeading-Info">Workspace: {selectedWorkspace.abbreviation.toUpperCase()} | {selectedWorkspace.name}</p>
                <p>You are about to delete the following tag:</p>
                {
                    (theTag && selectedWorkspace) ?
                        (
                            <Tag colour={theTag.colour} name={theTag.name}></Tag>
                        ) :
                        (<p><b>Tag not found.</b></p>)
                }
                <p>This action cannot be undone. Are you sure you want to proceed?</p>
                <button type="submit" className="Modal-PrimaryBtn">Delete tag</button>
            </form>
        </ModalWrapper>
    )
}

export default ModalDeleteTag;
