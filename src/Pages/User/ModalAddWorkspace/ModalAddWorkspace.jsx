import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addWorkspace } from "../../../general_redux/SignAndLogIn/actions";
// import ExpensesData from "../../Data/ExpenseData";
import api from '../../../config/axios';
import ModalWrapper from "../../../Components/ModalWrapper";
import closeIcon from "../../../Assets/Images/close.png" //Source: Close icons created by Pixel perfect - Flaticon, available at https://www.flaticon.com/free-icons/close
import "../../../Assets/Styles/Modal.css"
import "../User.css"
import currency_list from "../../../data/currencyList";
import APIURL from "../../../config/api-url";

function ModalAddWorkspace(props) {
    // const dispatch = useDispatch();
    // const navigate = useNavigate();
    const dispatch = useDispatch();
    const token = useSelector((state) => state.isLoggedIn.token);
    const styleClasses = 'ModalAddWorkspace ' + props.className;
    
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

    // const [enteredName, setName] = useState('');
    // const [enteredAbbrev, setAbbrev] = useState('');
    // const [enteredCurrency, setCurrency] = useState('');

    // function nameChangeHandler(e) {
    //     setName(e.target.value);
    // }
    // function abbrevChangeHandler(e) {
    //     setAbbrev(e.target.value);
    // }
    // function currencyChangeHandler(e) {
    //     setCurrency(e.target.value);
    // }
    // async function formSubmitHandlerAddWorkspace(e) {
    //     e.preventDefault();
    //     const config = {
    //         headers: {
    //         Authorization: `Bearer ${token}`,
    //         },
    //     };
    //     // const newWorkspace = {
    //     //     name: enteredName, // defined bellow
    //     //     abbreviation: enteredAbbrev,
    //     //     currency: enteredCurrency,
    //     // }
    //     console.log(newWorkspace)
    //     try{
    //         const response = await api.post(APIURL.ADD_WORKSPACE, newWorkspace, config);
    //         console.log(response)
    //         if (response.status === 200) {
    //         // Logout the user if the account deletion is successful
    //         // dispatch(logOut());
    //         // navigate("/signup");
    //         console.log("success")
    //         } else {
    //         // Handle any errors that occur during the account deletion
    //         throw new Error("Adding workspace failed");
    //         }
    //     } catch (error) {
    //         console.error(error);
    //         // Display an error message to the user or handle the error in any other way
    //     }
    //     //SEND TO BE
    //     //next part to be replaced with closeThisModal:
    //     // setName("");
    //     // setAbbrev("");
    //     // setCurrency("");
    //     // Show success message
    //     // closeThisModal()
    // }
    // function closeThisModal() {
    //     props.addWorkspaceModalToggler("close");
    //     setName("");
    //     setAbbrev("");
    //     setCurrency("");
    // }
    function closeThisModal() {
        props.addWorkspaceModalToggler("close");
        setNewWorkspace({
            name: "",
            abbreviation: "",
            currency: "",
        });
    }

    const formSubmitHandlerAddWorkspace = (event) => {
        event.preventDefault();
        console.log(`lala: ${newWorkspace}`)
        dispatch(addWorkspace(newWorkspace.name, newWorkspace.abbreviation, newWorkspace.currency ))
    };

    return (
        <ModalWrapper className={styleClasses}>
            <form className="Modal-Container" onSubmit={formSubmitHandlerAddWorkspace}>
                <img src={closeIcon} alt="close modal" className="Modal-CloseModalIcon" onClick={closeThisModal} />
                <h2>Add Work Space</h2>
                <div className="Modal-InputContainer">
                    <label htmlFor="workspaceName">Name*:</label>
                    <input id="workspaceName" name="workspaceName" type="text" maxLength="200" onChange={nameChangeHandler}/>
                    {/* <input id="expenseDate" name="expenseDate" type="date" value={enteredDate} onChange={dateChangeHandler} /> */}
                </div>
                <div className="Modal-InputContainer">
                    <label htmlFor="workspaceAbbreviation">2-letter abbreviation*:</label>
                    <input id="workspaceAbbreviation" name="workspaceAbbreviation" type="text" maxLength="2" minLength="2" onChange={abbrevChangeHandler}/>
                </div>
                <div className="Modal-InputContainer">
                    <label htmlFor="workspaceCurrency">Currency*:</label>
                    <select name="workspaceCurrency" id="workspaceCurrency" onChange={currencyChangeHandler}>
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
