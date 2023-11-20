import React, { useEffect, useState, useReducer } from "react";
import { useSelector } from "react-redux";
import { toast } from 'react-toastify';
import Select, { createFilter } from 'react-select'
import { MultiSelect } from "react-multi-select-component";
// import { filterConfigforReactSelectComponent } from "../../utils/helpersSelectElement"
import ExpensesData from "../../../Data/ExpenseData"
import ModalWrapper from "../../../Components/ModalWrapper";
import closeIcon from "../../../Assets/Images/close.png" //Source: Close icons created by Pixel perfect - Flaticon, available at https://www.flaticon.com/free-icons/close
import AddIcon from "../../../Assets/Images/add.png"; //Source: Plus icons created by dmitri13 - Flaticon, at https://www.flaticon.com/free-icons/plus
import trashIcon from '../../../Assets/Images/trash.png' // Source: Delete icons created by bqlqn - Flaticon, from https://www.flaticon.com/free-icons/delete
import editIcon from '../../../Assets/Images/editing.png' // Modify icons created by Freepik - Flaticon, from https://www.flaticon.com/free-icons/modify
import "../../../Assets/Styles/Modal.css"
import { ActionTypes } from "../../../general_redux/types";
import SetDescription from "./SetDescription"
import SelectSupplier from "./SelectSupplier"
import SelectGroups from "./SelectGroups";
import Subgroup from "./Subgroups"
import SelectTags from "./SelectTags"
import SelectAccount from "./SelectAccount"
import SelectExpCategory from "./SelectExpCategory";
import DefineForeignCurrency from "./DefineForeignCurrency";
import DefineVAT from "./DefineVAT"
import DefineRecurring from "./DefineRecurring"
import DefineExpNum from "./DefineExpNum"
import DefineNote from "./DefineNote"

//De-bugging or styling react-select component: add menuIsOpen to the component

//dont forget: if total of the expense is changed, do not update the amounts of groups, but warn user.
//place button for re-calculating the division.

function ModalAddExpense(props) {
    const styleClasses = 'ModalAddExpense ' + props.className;
    //IMPORTED DATA:
    const selectedWorkspace = useSelector((state) => state.selectedWorkspace.selectedWorkspace);

    //STATE:
    //Date:
    const [enteredDate, setDate] = useState(new Date().toISOString().substring(0, 10));
    //Amount:
    const [enteredAmount, setAmount] = useState('');

    //Group:
    const [enteredGroups, setEnteredGroups] = useState({
        isValid: undefined,
        groupData: [],//objects with group uuis, name, amount
        clearGroupSelection: false //clears group selection in component
    }); //Note Group is managed by a separate component and fed here by props exchange


    // //Define period:
    const [periodSelected, setperiodSelected] = useState(false);
    const [periodStart, setPeriodStart] = useState('');
    const [periodEnd, setPeriodEnd] = useState('');




    //Set period start and period end
    useEffect(() => {
        const theDate = new Date(enteredDate)
        if (theDate && !isNaN(theDate)) {
            const theDateStart = new Date(theDate.getFullYear(), theDate.getMonth(), 2)
            setPeriodStart(theDateStart.toISOString().substring(0, 10))
            let theDateEnd = new Date(theDate.getFullYear(), theDate.getMonth() + 1, 1)
            setPeriodEnd(theDateEnd.toISOString().substring(0, 10))
        }
    }, [enteredDate])

    // Change handlers
    function dateChangeHandler(e) {
        setDate(e.target.value);
    }

    function amountChangeHandler(e) {
        setAmount(e.target.value);
    }

    function groupChangeHandler(groupArray, isValid, clearSelection) {
        setEnteredGroups({
            isValid: isValid,
            groupData: groupArray,
            clearGroupSelection: clearSelection
        })
    }


    function periodStartChangeHandler(e) {
        setPeriodStart(e.target.value);
    }
    function periodEndChangeHandler(e) {
        setPeriodEnd(e.target.value);
    }
    function periodSelectedHandler(event) {
        if (event.target.checked) {
            setperiodSelected(true);
        } else {
            setperiodSelected(false);
        }
    }


    function closeThisModal() {
        props.addExpenseModalToggler("close");
        setDate('');
        // setDescription(''); //work on this
        setAmount('');
        setEnteredGroups({
            isValid: undefined,
            groupData: [],
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
                        value={enteredAmount} onChange={amountChangeHandler} />
                </div>

                {/* SUPPLIER */}
                <SelectSupplier></SelectSupplier>

                {/* DESCRIPTION */}
                <SetDescription></SetDescription>

                {/* CATEGORY */}
                <SelectExpCategory></SelectExpCategory>

                {/* ACCOUNT */}
                <SelectAccount></SelectAccount>

                {/* GROUP*/}
                <SelectGroups passInfo={groupChangeHandler} enteredAmount={enteredAmount} clearSelection={enteredGroups.clearGroupSelection}></SelectGroups>
                {/* <Subgroup></Subgroup> */}


                {/* TAGS */}
                <SelectTags></SelectTags>

                {/* PERIOD */}
                <div>
                    <div className="Modal-CheckboxContainer">
                        <input type="checkbox" id="selectPeriod" name="selectPeriod" value="selectPeriod" checked={periodSelected} onChange={periodSelectedHandler} />
                        <label htmlFor="selectPeriod"> Define period manually</label>
                    </div>
                    {periodSelected && (
                        <div className="Modal-DropdownContainerForFurtherInput">
                            <div className="Modal-InputContainer-Dropdown">
                                <label htmlFor="periodFrom">From:</label>
                                <input type="date" id="periodFrom" name="periodFrom" value={periodStart} onChange={periodStartChangeHandler} />
                            </div>
                            <div className="Modal-InputContainer-Dropdown">
                                <label htmlFor="periodTo">To:</label>
                                <input type="date" id="periodTo" name="periodTo" value={periodEnd} onChange={periodEndChangeHandler} />
                            </div>
                        </div>
                    )}
                </div>
                {/* FOREIGN CURRENCY */}
                <DefineForeignCurrency></DefineForeignCurrency>

                {/* INCLUDE VAT */}
                <DefineVAT></DefineVAT>

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
}

export default ModalAddExpense;
