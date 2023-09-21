import { useDispatch, useSelector} from "react-redux";
import { deleteSelectedWorkspaceExpenseCategories } from '../../general_redux/Workspace/actions';
import ModalWrapper from "../../Components/ModalWrapper";
import closeIcon from "../../Assets/Images/close.png" //Source: Close icons created by Pixel perfect - Flaticon, available at https://www.flaticon.com/free-icons/close
import "../../Assets/Styles/Modal.css"

function ModalDeleteExpenseCategory(props) {
    const dispatch = useDispatch();
    const styleClasses = props.className;
    const selectedWorkspace = useSelector((state) => state.selectedWorkspace.selectedWorkspace);
    const allExpenseCategories = useSelector((state) => state.selectedWorkspace.selectedWorkspaceExpenseCategories);
    const categoryUuid = props.uuid;
    const theCategory = allExpenseCategories.find(category => category.uuid === categoryUuid);
    function closeThisModal() {
        props.deleteExpenseCategoryModalToggler("close"); ///PROPS
    }
    const formSubmitHandlerDeleteExpenseCategory = (event) => {
        event.preventDefault();
        dispatch(deleteSelectedWorkspaceExpenseCategories(theCategory.uuid));
    };

    return (
        <ModalWrapper className={styleClasses}>
            <form className="Modal-Container" onSubmit={formSubmitHandlerDeleteExpenseCategory}>
                <div className="Modal-Heading">
                    <h2>Delete Expense Category</h2>
                    <div>
                        <img src={closeIcon} alt="close modal" className="Modal-CloseModalIcon" onClick={closeThisModal}/>
                    </div>
                </div>
                <p className="Modal-SubHeading-Info">Workspace: {selectedWorkspace.abbreviation.toUpperCase()} | {selectedWorkspace.name}</p> 
                <p>You are about to delete the following category:</p>
                {
                    (theCategory && selectedWorkspace) ?
                    (
                        <div className="Modal-InformationGroupingDiv">
                        <p><b>Category name: {theCategory.name}</b></p>
                        <p className="Modal-InformationGroupingDiv-Pgray">Category description: {theCategory.description}</p>
                        <p className="Modal-InformationGroupingDiv-Pgray">Category code: {theCategory.code}</p>
                        </div>
                    ):
                    (<p><b>Category not found.</b></p>)
                }
                <p>This action cannot be undone. Are you sure you want to proceed?</p>
                <button type="submit" className="Modal-PrimaryBtn" onClick={closeThisModal}>Delete category</button>
            </form>
        </ModalWrapper>
    )
}

export default ModalDeleteExpenseCategory;
