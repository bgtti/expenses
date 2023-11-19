import React, { useEffect, useState, useReducer } from "react";
import { useSelector } from "react-redux";
import { toast } from 'react-toastify';
import Select, { createFilter } from 'react-select'
import { MultiSelect } from "react-multi-select-component";
// import { filterConfigforReactSelectComponent } from "../../utils/helpersSelectElement"
import Tag from "../../../Components/Tag";
import ExpensesData from "../../../Data/ExpenseData"
import ModalWrapper from "../../../Components/ModalWrapper";
import closeIcon from "../../../Assets/Images/close.png" //Source: Close icons created by Pixel perfect - Flaticon, available at https://www.flaticon.com/free-icons/close
import AddIcon from "../../../Assets/Images/add.png"; //Source: Plus icons created by dmitri13 - Flaticon, at https://www.flaticon.com/free-icons/plus
import trashIcon from '../../../Assets/Images/trash.png' // Source: Delete icons created by bqlqn - Flaticon, from https://www.flaticon.com/free-icons/delete
import editIcon from '../../../Assets/Images/editing.png' // Modify icons created by Freepik - Flaticon, from https://www.flaticon.com/free-icons/modify
import "../../../Assets/Styles/Modal.css"
import { ActionTypes } from "../../../general_redux/types";
import Supplier from "./Supplier"
import Groups from "./Groups";
import Subgroup from "./Subgroups"

//Search select element built with react-select using label instead of value
const filterConfigforReactSelectComponent = createFilter({
    matchFrom: 'any',
    stringify: option => `${option.label}`,
})
//De-bugging orstyling react-select component: add menuIsOpen to the component




//dont forget: if total of the expense is changed, do not update the amounts of groups, but warn user.
//place button for re-calculating the division.

function ModalAddExpense(props) {
    const styleClasses = 'ModalAddExpense ' + props.className;
    //IMPORTED DATA:
    const selectedWorkspace = useSelector((state) => state.selectedWorkspace.selectedWorkspace);
    // const selectedWorkspaceGroups = useSelector((state) => state.selectedWorkspace.selectedWorkspaceGroups);
    const selectedWorkspaceAccounts = useSelector((state) => state.selectedWorkspace.selectedWorkspaceAccounts);
    const selectedWorkspaceTags = useSelector((state) => state.selectedWorkspace.selectedWorkspaceTags);
    const selectedWorkspaceExpenseCategories = useSelector((state) => state.selectedWorkspace.selectedWorkspaceExpenseCategories);
    //STATE:
    //Date:
    const [enteredDate, setDate] = useState(new Date().toISOString().substring(0, 10));
    //Amount:
    const [enteredAmount, setAmount] = useState('');
    //Supplier:
    // gone
    //Description:
    const [enteredDescription, setDescription] = useState('');
    //Account:
    const [enteredAccount, setAccount] = useState('');
    //Category:
    const [enteredCategory, setCategory] = useState('');
    //Group:
    const [enteredGroups, setEnteredGroups] = useState({
        isValid: undefined,
        groupData: [],//objects with group uuis, name, amount
        clearGroupSelection: false //clears group selection in component
    }); //Note Group is managed by a separate component and fed here by props exchange

    //Tag:
    const [selectTagOptions, setSelectTagOptions] = useState(''); //Tag options to be fed to Select element
    //Define period:
    const [periodSelected, setperiodSelected] = useState(false);
    const [periodStart, setPeriodStart] = useState('');
    const [periodEnd, setPeriodEnd] = useState('');
    //Foreign Currency:
    const [isForeignCurrency, setForeignCurrency] = useState({
        isForeign: false,
        currency: '',
        amount: '',
    });
    //VAT:
    const [VAT, setVAT] = useState({
        hasVAT: false,
        amount: '',
    });
    //Note:
    const [note, setNote] = useState({
        hasNote: false,
        note: '',
    });
    //Recurring:
    const [isRecurringSelected, setIsRecurringSelected] = useState(false);
    const [isRecurringInterval, setIsRecurringInterval] = useState('monthly');
    const [isRecurringPeriod, setIsRecurringPeriod] = useState('current');
    //Custom number:
    const [customNumber, setCustomNumber] = useState({
        hasCustomNumber: false,
        customNumber: '',
    });


    //Show available tags as options in Select element 
    useEffect(() => {
        if (selectedWorkspaceTags && selectedWorkspaceTags.length !== 0) {
            let tagOptions = []
            selectedWorkspaceTags.forEach(tag => {
                let tagObj = {
                    value: tag.uuid,
                    label: <div className="Expense-ModalAddExpense-TagDiv">
                        <Tag colour={tag.colour} name={tag.name}></Tag>
                        <br />
                    </div>
                };
                tagOptions.push(tagObj)
            })
            setSelectTagOptions(tagOptions)
        }
    }, [selectedWorkspaceTags])


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
    function descriptionChangeHandler(e) {
        setDescription(e.target.value);
    }
    function amountChangeHandler(e) {
        setAmount(e.target.value);
    }
    function categoryChangeHandler(e) {
        setCategory(e.target.value);
    }
    function groupChangeHandler(groupArray, isValid, clearSelection) {
        setEnteredGroups({
            isValid: isValid,
            groupData: groupArray,
            clearGroupSelection: clearSelection
        })
    }

    function accountChangeHandler(e) {
        setAccount(e.target.value);
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
    function isRecurringSelectedHandler(event) {
        if (event.target.checked) {
            setIsRecurringSelected(true);
        } else {
            setIsRecurringSelected(false);
        }
    }
    function isRecurringIntervalHandler(event) {
        setIsRecurringInterval(event.target.value);
    }
    function isRecurringPeriodHandler(event) {
        setIsRecurringPeriod(event.target.value);
    }

    function closeThisModal() {
        props.addExpenseModalToggler("close");
        setDate('');
        setDescription('');
        setAmount('');
        setEnteredGroups({
            isValid: undefined,
            groupData: [],
            clearGroupSelection: true
        })
        setCategory('');
        setAccount('');
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
                <Supplier></Supplier>
                {/* DESCRIPTION */}
                <div className="Modal-InputContainer">
                    <label htmlFor="expenseDescription">Description:</label>
                    <input id="expenseDescription" name="expenseDescription" type="text" minLength="1" maxLength="100" value={enteredDescription} onChange={descriptionChangeHandler} />
                </div>
                {/* CATEGORY */}
                <div className="Modal-InputContainer">
                    <label htmlFor="category">Expense category:</label>
                    <select className="Modal-SelectElement" name="category" id="category" onChange={categoryChangeHandler} value={enteredCategory === "" ? "Other" : enteredCategory} disabled={!selectedWorkspaceExpenseCategories || selectedWorkspaceExpenseCategories.length === 0}>
                        {
                            (!selectedWorkspaceExpenseCategories || selectedWorkspaceExpenseCategories.length === 0) ?
                                (<option value="">no category</option>) :
                                (selectedWorkspaceExpenseCategories.map((category, index) => (
                                    <option key={index} value={category.uuid}>{category.name}</option>
                                )))
                        }
                    </select>
                </div>
                {/* GROUP*/}
                <Groups passInfo={groupChangeHandler} enteredAmount={enteredAmount} clearSelection={enteredGroups.clearGroupSelection}></Groups>
                <Subgroup></Subgroup>
                {/* ACCOUNT */}
                <div className="Modal-InputContainer">
                    <label htmlFor="account">Account:</label>
                    <select name="account" id="account" onChange={accountChangeHandler} value={enteredAccount === "" ? "Bank" : enteredAccount} disabled={!selectedWorkspaceAccounts || selectedWorkspaceAccounts.length === 0}>
                        {
                            (!selectedWorkspaceAccounts || selectedWorkspaceAccounts.length === 0) ?
                                (<option value="" >no accounts</option>) :
                                (selectedWorkspaceAccounts.map((account, index) => (
                                    <option key={index} value={account.uuid}>{account.name}</option>
                                )))
                        }
                    </select>
                </div>
                {/* TAGS */}
                <div className="Modal-InputContainer">
                    <label htmlFor="tag">Add tags:</label>
                    {
                        (!selectedWorkspaceTags || selectedWorkspaceTags.length === 0) ?
                            (
                                <select name="tag" id="tag" value="" disabled>
                                    <option value="">no tags</option>
                                </select>
                            ) :
                            (
                                <Select
                                    name="tag"
                                    id="tag"
                                    className="basic-single"
                                    classNamePrefix="select Modal-MultiSelect-Select"
                                    isClearable={true}
                                    theme={(theme) => ({
                                        ...theme,
                                        borderRadius: 0,
                                        colors: {
                                            ...theme.colors,
                                            primary25: '#f1f2f7',
                                            primary: 'black',
                                        },
                                    })}
                                    filterOption={filterConfigforReactSelectComponent}
                                    options={selectTagOptions}
                                    isMulti
                                />
                            )
                    }
                </div>
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
                {/* to be completed... */}
                <div>
                    <div className="Modal-CheckboxContainer">
                        <input type="checkbox" id="selectForeignCurrency" name="selectForeignCurrency" value="selectForeignCurrency" />
                        <label htmlFor="selectForeignCurrency"> Original amount in foreign currency</label>
                    </div>
                </div>
                {/* INCLUDE VAT */}
                {/* to be completed... */}
                <div>
                    <div className="Modal-CheckboxContainer">
                        <input type="checkbox" id="selectVAT" name="selectVAT" value="selectVAT" />
                        <label htmlFor="selectVAT"> Include VAT amount</label>
                    </div>
                </div>
                {/* RECURRING */}
                <div>
                    <div className="Modal-CheckboxContainer">
                        <input type="checkbox" id="selectRecurring" name="selectRecurring" value="selectRecurring" checked={isRecurringSelected} onChange={isRecurringSelectedHandler} />
                        <label htmlFor="selectRecurring"> Expense is recurring</label>
                    </div>
                    {isRecurringSelected && (
                        <div className="Modal-InformationGroupingDiv Modal-DropdownContainerForFurtherInput">
                            <div className="Modal-Modal-DropdownContainerForFurtherInput-SubDiv">
                                <p>Interval:</p>
                                <div className="Modal-RadioBtnContainer">
                                    <input type="radio" id="weekly" name="weekly" value="weekly" checked={isRecurringInterval === 'weekly'} onChange={isRecurringIntervalHandler} />
                                    <label htmlFor="weekly">weekly</label>
                                </div>
                                <div className="Modal-RadioBtnContainer">
                                    <input type="radio" id="monthly" name="monthly" value="monthly" checked={isRecurringInterval === 'monthly'} onChange={isRecurringIntervalHandler} />
                                    <label htmlFor="monthly">monthly</label>
                                </div>
                                <div className="Modal-RadioBtnContainer">
                                    <input type="radio" id="yearly" name="yearly" value="yearly" checked={isRecurringInterval === 'yearly'} onChange={isRecurringIntervalHandler} />
                                    <label htmlFor="yearly">yearly</label>
                                </div>
                            </div>
                            <div className="Modal-Modal-DropdownContainerForFurtherInput-SubDiv">
                                <p>Period:</p>
                                <div className="Modal-RadioBtnContainer">
                                    <input type="radio" id="pre" name="pre" value="pre" checked={isRecurringPeriod === 'pre'} onChange={isRecurringPeriodHandler} />
                                    <label htmlFor="pre">predate</label>
                                </div>
                                <div className="Modal-RadioBtnContainer">
                                    <input type="radio" id="as" name="as" value="as" checked={isRecurringPeriod === 'as'} onChange={isRecurringPeriodHandler} />
                                    <label htmlFor="as">as date</label>
                                </div>
                                <div className="Modal-RadioBtnContainer">
                                    <input type="radio" id="post" name="post" value="post" checked={isRecurringPeriod === 'post'} onChange={isRecurringPeriodHandler} />
                                    <label htmlFor="post">postdate</label>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                {/* CUSTOM INVOICE NUMBER */}
                {/* to be completed... */}
                <div>
                    <div className="Modal-CheckboxContainer">
                        <input type="checkbox" id="selectCustomInvoiceNumber" name="selectCustomInvoiceNumber" value="selectCustomInvoiceNumber" />
                        <label htmlFor="selectCustomInvoiceNumber"> Custom invoice number</label>
                    </div>
                </div>
                {/* NOTE */}
                {/* to be completed... */}
                <div>
                    <div className="Modal-CheckboxContainer">
                        <input type="checkbox" id="selectNote" name="selectNote" value="selectNote" />
                        <label htmlFor="selectNote">Add a note</label>
                    </div>
                </div>
                {/* SUBMIT */}
                <button type="submit" className="Modal-PrimaryBtn" onClick={closeThisModal}>Add expense</button>
            </form>
        </ModalWrapper >
    )
}

export default ModalAddExpense;
