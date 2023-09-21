import { useState, useEffect, useReducer } from "react";
import { useDispatch, useSelector} from "react-redux";
import { addSelectedExpenseNumberingPreference } from '../../general_redux/Workspace/actions';
import ModalWrapper from "../../Components/ModalWrapper";
import closeIcon from "../../Assets/Images/close.png" //Source: Close icons created by Pixel perfect - Flaticon, available at https://www.flaticon.com/free-icons/close
import "../../Assets/Styles/Modal.css"

//We are only validating the form for Name, since 'Description' and 'Code' are not required fields 
function ModalSetExpenseNumbering(props) {
    //const dispatch = useDispatch();
    const styleClasses = props.className;

    function closeThisModal() {
        props.addExpenseCategoryModalToggler("close"); ///PROPS
    };
    const formSubmitHandlerSetExpenseNumbering = (event) => {
        event.preventDefault();
        // code
        //dispatch(addSelectedExpenseNumberingPreference(workspaceUuid, selectedWorkspaceExpenseNumbering));
    };
    
    return (
        <ModalWrapper className={styleClasses}>
            <form className="Modal-Container" onSubmit={formSubmitHandlerSetExpenseNumbering}>
                <div className="Modal-Heading">
                    <h2>Set Expense Numbering Format</h2>
                    <div>
                        <img src={closeIcon} alt="close modal" className="Modal-CloseModalIcon" onClick={closeThisModal}/>
                    </div>
                </div>
                <div className="WorkspaceSettings-checkboxContainer">
                            <input type="checkbox" id="option1" name="option1" value="option1" checked/>
                            <label htmlFor="option1">YY-MM-number</label><br />
                        </div>
                        <div className="WorkspaceSettings-checkboxContainer">
                            <input type="checkbox" id="option2" name="option2" value="option2" />
                            <label htmlFor="option2">Number</label><br />
                        </div>
            </form>
        </ModalWrapper>
    )
}

export default ModalSetExpenseNumbering;
