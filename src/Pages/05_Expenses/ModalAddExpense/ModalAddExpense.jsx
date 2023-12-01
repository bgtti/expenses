import React, { useEffect, useState, useReducer } from "react";
import { useSelector } from "react-redux";
import { toast } from 'react-toastify';
import { PropTypes } from 'prop-types';
// import { filterConfigforReactSelectComponent } from "../../utils/helpersSelectElement"
import ModalWrapper from "../../../Components/ModalWrapper";
import closeIcon from "../../../Assets/Images/close.png" //Source: Close icons created by Pixel perfect - Flaticon, available at https://www.flaticon.com/free-icons/close
import "../../../Assets/Styles/Modal.css"
import { ActionTypes } from "../../../general_redux/types";
import SelectSupplier from "./A_SelectSupplier"
import SetDescription from "./B_SetDescription"
import SelectExpCategory from "./C_SelectExpCategory";
import SelectAccount from "./D_SelectAccount"
import SelectGroups from "./E_SelectGroups";
import SelectTags from "./F_SelectTags"
import DefinePeriod from "./G_DefinePeriod";
import DefineForeignCurrency from "./H_DefineForeignCurrency";
import DefineVAT from "./I_DefineVAT"
import DefineRecurring from "./J_DefineRecurring"
import DefineExpNum from "./K_DefineExpNum"
import DefineNote from "./L_DefineNote"

//De-bugging or styling react-select component: add menuIsOpen to the component

//dont forget: if total of the expense is changed, do not update the amounts of groups, but warn user.
//place button for re-calculating the division.

function ModalAddExpense(props) {
    const addExpenseModalToggler = props.addExpenseModalToggler;
    const styleClasses = 'ModalAddExpense'

    //REDUX:
    const selectedWorkspace = useSelector((state) => state.selectedWorkspace.selectedWorkspace);

    //COMPONENT STATE:
    //Date:
    const [enteredDate, setDate] = useState(new Date().toISOString().substring(0, 10));

    //Amount:
    const [enteredAmount, setAmount] = useState('');

    //Supplier/Paid to:
    //THIS PART IS MISSING *****************

    //Description:
    const [enteredDescription, setDescription] = useState('');

    //Category:
    const [enteredCategory, setCategory] = useState('');

    //Account:
    const [enteredAccount, setAccount] = useState('');

    //Groups:
    //Group is a complex component. ClearGroupSelection is managed here, but other data is fed by a separate state in the child. The reason to use 2 states is to keep the complexity solely on the child component and diminish it here.
    const [enteredGroups, setEnteredGroups] = useState({
        isValid: undefined,
        groupData: [],//objects with group uuis, name, amount
        allocationOption: "",
        clearGroupSelection: false //clears group selection in component
    });

    //Tags:
    const [enteredTags, setEnteredTags] = useState([]);

    //Define period:
    const [definedPeriod, setDefinedPeriod] = useState({
        periodStart: "",
        periodEnd: ""
    })

    //Foreign Currency
    const [isForeignCurrency, setForeignCurrency] = useState({
        isForeign: false,
        currency: "",
        amount: "",
        exchangeRate: "",
        isValid: true, // false if isForeign is true but no input on other statements
        expenseAmountChanged: false //enteredAmout re-checked after onBlur
    });

    //VAT
    const [VAT, setVAT] = useState({
        hasVAT: false,
        amount: "",
        isValid: true,
        expenseAmountChanged: false //enteredAmout re-checked after onBlur
    });

    //CONTINUE HERE


    // useEffect(() => {
    //     console.log(definedPeriod)
    // }, [definedPeriod])


    // Change handlers
    function dateChangeHandler(e) {
        setDate(e.target.value);
    }

    function amountChangeHandler(e) {
        setAmount(e.target.value);
    }

    function amountOnBlurHandler() {
        if (isForeignCurrency.isForeign) {
            setForeignCurrency(prevState => ({
                ...prevState,
                expenseAmountChanged: true,
            }));
        }
        if (VAT.hasVAT) {
            setVAT(prevState => ({
                ...prevState,
                expenseAmountChanged: true,
            }));
        }
    }

    function groupChangeHandler(groupArray, isValid, allocationOptionChosen, clearSelection) {
        setEnteredGroups({
            isValid: isValid,
            groupData: groupArray,
            allocationOption: allocationOptionChosen,
            clearGroupSelection: clearSelection
        })
    }


    function closeThisModal() {
        // props.addExpenseModalToggler("close");
        addExpenseModalToggler("close");
        setDate('');
        // setDescription(''); //work on this
        setAmount('');
        setEnteredGroups({
            isValid: undefined,
            groupData: [],
            allocationOption: "",
            clearGroupSelection: true
        })
        // setCategory('');
        // setAccount('');
        //clearing of some fields missing!!
    }
    //Send to BE:
    // date, amount, paid-to, createNewSupplier (true/false), description, expense category,...

    return (
        <ModalWrapper className={styleClasses}>
            <form className="Modal-Container" onSubmit={closeThisModal}>
                <div className="Modal-Heading">
                    <h2>Add Expense</h2>
                    <div>
                        <img src={closeIcon} alt="close modal" className="Modal-CloseModalIcon" onClick={closeThisModal} />
                    </div>
                </div>
                {/* DATE */}
                <div className="Modal-InputContainer">
                    <label htmlFor="expenseDate">Date:*</label>
                    <input id="expenseDate" name="expenseDate" type="date" value={enteredDate} onChange={dateChangeHandler} />
                </div>
                {/* AMOUNT */}
                <div className="Modal-InputContainer">
                    <label htmlFor="expenseAmount">Amount:*</label>
                    <input id="expenseAmount" name="expenseAmount" type="number" min="0.00" step=".01"
                        value={enteredAmount} onChange={amountChangeHandler} onBlur={amountOnBlurHandler} />
                </div>

                {/* SUPPLIER */}
                <SelectSupplier></SelectSupplier>

                {/* DESCRIPTION */}
                <SetDescription
                    enteredDescription={enteredDescription}
                    setDescription={setDescription}>
                </SetDescription>

                {/* CATEGORY */}
                <SelectExpCategory
                    enteredCategory={enteredCategory}
                    setCategory={setCategory}>
                </SelectExpCategory>

                {/* ACCOUNT */}
                <SelectAccount
                    enteredAccount={enteredAccount}
                    setAccount={setAccount}>
                </SelectAccount>

                {/* GROUP / SUBGROUP*/}
                <SelectGroups
                    clearSelection={enteredGroups.clearGroupSelection}
                    enteredAmount={enteredAmount}
                    passInfo={groupChangeHandler}>
                </SelectGroups>

                {/* TAGS */}
                <SelectTags
                    setEnteredTags={setEnteredTags}>
                </SelectTags>

                {/* PERIOD */}
                <DefinePeriod
                    enteredDate={enteredDate}
                    definedPeriod={definedPeriod}
                    setDefinedPeriod={setDefinedPeriod}>
                </DefinePeriod>

                {/* FOREIGN CURRENCY */}
                <DefineForeignCurrency
                    enteredAmount={enteredAmount} setAmount={setAmount}
                    isForeignCurrency={isForeignCurrency} setForeignCurrency={setForeignCurrency}>
                </DefineForeignCurrency>

                {/* INCLUDE VAT */}
                <DefineVAT
                    enteredAmount={enteredAmount} VAT={VAT} setVAT={setVAT}>
                </DefineVAT>

                {/* RECURRING */}
                <DefineRecurring></DefineRecurring>

                {/* CUSTOM EXPENSE NUMBER */}

                <DefineExpNum></DefineExpNum>

                {/* NOTE */}
                <DefineNote></DefineNote>

                {/* SUBMIT */}
                <button type="submit" className="Modal-PrimaryBtn" onClick={closeThisModal}>Add expense</button>
            </form>
        </ModalWrapper >
    )
};
ModalAddExpense.propTypes = {
    addExpenseModalToggler: PropTypes.func.isRequired
};

export default ModalAddExpense;
