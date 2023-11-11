import { useDispatch, useSelector } from "react-redux";
import { deleteSelectedWorkspaceAccount } from '../../general_redux/Workspace/actions';
import ModalWrapper from "../../Components/ModalWrapper";
import closeIcon from "../../Assets/Images/close.png" //Source: Close icons created by Pixel perfect - Flaticon, available at https://www.flaticon.com/free-icons/close
import "../../Assets/Styles/Modal.css"

// Note this modal deletes an account belonging to the WS, not the user's account

function ModalDeleteAccount(props) {
    const dispatch = useDispatch();
    const styleClasses = props.className;
    const selectedWorkspace = useSelector((state) => state.selectedWorkspace.selectedWorkspace);
    const allAccounts = useSelector((state) => state.selectedWorkspace.selectedWorkspaceAccounts);
    const accountUuid = props.uuid;
    const theAccount = allAccounts.find(account => account.uuid === accountUuid);
    function closeThisModal() {
        props.deleteAccountModalToggler("close"); ///PROPS
    }
    const formSubmitHandlerDeleteAccount = (event) => {
        event.preventDefault();
        dispatch(deleteSelectedWorkspaceAccount(theAccount.uuid));
    };

    return (
        <ModalWrapper className={styleClasses}>
            <form className="Modal-Container" onSubmit={formSubmitHandlerDeleteAccount}>
                <div className="Modal-Heading">
                    <h2>Delete Account</h2>
                    <div>
                        <img src={closeIcon} alt="close modal" className="Modal-CloseModalIcon" onClick={closeThisModal} />
                    </div>
                </div>
                <p className="Modal-SubHeading-Info">Workspace: {selectedWorkspace.abbreviation.toUpperCase()} | {selectedWorkspace.name}</p>
                <p>You are about to delete the following account:</p>
                {
                    (theAccount && selectedWorkspace) ?
                        (
                            <div className="Modal-InformationGroupingDiv">
                                <p><b>Account name: {theAccount.name}</b></p>
                                <p className="Modal-InformationGroupingDiv-Pgray">Account description: {theAccount.description ? theAccount.description : "-"}</p>
                                <p className="Modal-InformationGroupingDiv-Pgray">Account code: {theAccount.code ? theAccount.code : "-"}</p>
                            </div>
                        ) :
                        (<p><b>Account not found.</b></p>)
                }
                <p>This action cannot be undone. Are you sure you want to proceed?</p>
                <button type="submit" className="Modal-PrimaryBtn" onClick={closeThisModal}>Delete account</button>
            </form>
        </ModalWrapper>
    )
}

export default ModalDeleteAccount;
