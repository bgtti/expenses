import { useState } from "react";
import { useDispatch, useSelector} from "react-redux";
import { editWorkspace } from "../../../general_redux/SignAndLogIn/actions";
import ModalWrapper from "../../../Components/ModalWrapper";
import closeIcon from "../../../Assets/Images/close.png" //Source: Close icons created by Pixel perfect - Flaticon, available at https://www.flaticon.com/free-icons/close
import "../../../Assets/Styles/Modal.css"
import "../User.css"
import currency_list from "../../../data/currencyList";

//MISSING: form validation: disable button until all fields are filled

function ModalEditWorkspace(props) {
    const dispatch = useDispatch();
    const styleClasses = 'ModalEditWorkspace ' + props.className;
    const allWorkspaces = useSelector((state) => state.allWorkspaces.workspaces);
    const workspaceUuid = props.uuid;
    const theWorkspace = allWorkspaces.find(workspace => workspace.uuid === workspaceUuid);

    const [thisWorkspace, setThisWorkspace] = useState({
        name: theWorkspace.name,
        abbreviation: theWorkspace.abbreviation,
        currency: theWorkspace.currency,
    });
    function nameChangeHandler(e) {
        setThisWorkspace((prevState) => ({
            ...prevState,
            name: e.target.value,
        }));
    }
    function abbrevChangeHandler(e) {
        setThisWorkspace((prevState) => ({
            ...prevState,
            abbreviation: e.target.value,
        }));
    }
    function currencyChangeHandler(e) {
        setThisWorkspace((prevState) => ({
            ...prevState,
            currency: e.target.value,
        }));
    }

    function closeThisModal() {
        props.editWorkspaceModalToggler("close");
    }

    const formSubmitHandlerEditWorkspace = (event) => {
        event.preventDefault();
        dispatch(editWorkspace(thisWorkspace.name, thisWorkspace.abbreviation, thisWorkspace.currency, workspaceUuid))
    };

    return (
        <ModalWrapper className={styleClasses}>
            <form className="Modal-Container" onSubmit={formSubmitHandlerEditWorkspace}>
                <img src={closeIcon} alt="close modal" className="Modal-CloseModalIcon" onClick={closeThisModal} />
                <h2>Add Work Space</h2>
                <div className="Modal-InputContainer">
                    <label htmlFor="workspaceName">Name*:</label>
                    <input value={thisWorkspace.name} id="workspaceName" name="workspaceName" type="text" minLength="1" maxLength="50" onChange={nameChangeHandler} required/>
                </div>
                <div className="Modal-InputContainer">
                    <label htmlFor="workspaceAbbreviation">2-letter abbreviation*:</label>
                    <input value={thisWorkspace.abbreviation} id="workspaceAbbreviation" name="workspaceAbbreviation" type="text" maxLength="2" minLength="2" onChange={abbrevChangeHandler} required/>
                </div>
                <div className="Modal-InputContainer">
                    <label htmlFor="workspaceCurrency">Currency*:</label>
                    <select name="workspaceCurrency" id="workspaceCurrency" onChange={currencyChangeHandler} defaultValue={thisWorkspace.currency} required>
                        {currency_list.map((currency, index)=>(
                            <option key={index} value={currency.code}>{currency.code} ({currency.name})</option>
                        ))}
                    </select>
                </div>
                <button type="submit" className="Modal-PrimaryBtn" onClick={closeThisModal}>Save Workspace</button>
            </form>
        </ModalWrapper>
    )
}

export default ModalEditWorkspace;
