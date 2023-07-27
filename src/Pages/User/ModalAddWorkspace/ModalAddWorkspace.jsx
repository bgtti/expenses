import { useState, useEffect } from "react";
import { useDispatch} from "react-redux";
import { addWorkspace } from "../../../general_redux/SignAndLogIn/actions";
import ModalWrapper from "../../../Components/ModalWrapper";
import closeIcon from "../../../Assets/Images/close.png" //Source: Close icons created by Pixel perfect - Flaticon, available at https://www.flaticon.com/free-icons/close
import "../../../Assets/Styles/Modal.css"
import "../User.css"
import currency_list from "../../../data/currencyList";

//MISSING: form validation: disable button until all fields are filled

function ModalAddWorkspace(props) {
    const dispatch = useDispatch();
    const styleClasses = 'ModalAddWorkspace ' + props.className;
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [newWorkspace, setNewWorkspace] = useState({
        name: "",
        abbreviation: "",
        currency: "",
    });
    function nameChangeHandler(e) {
        setNewWorkspace((prevState) => ({
            ...prevState,
            name: e.target.value,
        }));
    }
    function abbrevChangeHandler(e) {
        setNewWorkspace((prevState) => ({
            ...prevState,
            abbreviation: e.target.value,
        }));
    }
    function currencyChangeHandler(e) {
        setNewWorkspace((prevState) => ({
            ...prevState,
            currency: e.target.value,
        }));
    }
    useEffect(() => {
        console.log(newWorkspace);
    }, [newWorkspace]);

    function closeThisModal() {
        props.addWorkspaceModalToggler("close");
    }

    const formSubmitHandlerAddWorkspace = (event) => {
        event.preventDefault();
        dispatch(addWorkspace(newWorkspace.name, newWorkspace.abbreviation, newWorkspace.currency ))
        setNewWorkspace({
            name: "",
            abbreviation: "",
            currency: "",
        });
        setFormSubmitted(true);
    };

    return (
        <ModalWrapper className={styleClasses}>
            <form className="Modal-Container" onSubmit={formSubmitHandlerAddWorkspace}>
                <img src={closeIcon} alt="close modal" className="Modal-CloseModalIcon" onClick={closeThisModal} />
                <h2>Add Work Space</h2>
                <div className="Modal-InputContainer">
                    <label htmlFor="workspaceName">Name*:</label>
                    <input value={newWorkspace.name} id="workspaceName" name="workspaceName" type="text" maxLength="200" onChange={nameChangeHandler}/>
                    {/* <input id="expenseDate" name="expenseDate" type="date" value={enteredDate} onChange={dateChangeHandler} /> */}
                </div>
                <div className="Modal-InputContainer">
                    <label htmlFor="workspaceAbbreviation">2-letter abbreviation*:</label>
                    <input value={newWorkspace.abbreviation} id="workspaceAbbreviation" name="workspaceAbbreviation" type="text" maxLength="2" minLength="2" onChange={abbrevChangeHandler}/>
                </div>
                <div className="Modal-InputContainer">
                    <label htmlFor="workspaceCurrency">Currency*:</label>
                    <select name="workspaceCurrency" id="workspaceCurrency" onChange={currencyChangeHandler} value={formSubmitted ? '' : newWorkspace.currency}>
                        {currency_list.map((currency, index)=>(
                            <option key={index} value={currency.code}>{currency.code} ({currency.name})</option>
                        ))}
                    </select>
                </div>
                <button type="submit" className="Modal-PrimaryBtn" onClick={closeThisModal}>Add Work Space</button>
            </form>
        </ModalWrapper>
    )
}

export default ModalAddWorkspace;
