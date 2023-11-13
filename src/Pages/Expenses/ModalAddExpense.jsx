import { useEffect, useState, useReducer } from "react";
import { useSelector } from "react-redux";
import { toast } from 'react-toastify';
import Select from 'react-select'
import { MultiSelect } from "react-multi-select-component";
import Tag from "../../Components/Tag";
import ExpensesData from "../../Data/ExpenseData"
import ModalWrapper from "../../Components/ModalWrapper";
import closeIcon from "../../Assets/Images/close.png" //Source: Close icons created by Pixel perfect - Flaticon, available at https://www.flaticon.com/free-icons/close
import AddIcon from "../../Assets/Images/add.png"; //Source: Plus icons created by dmitri13 - Flaticon, at https://www.flaticon.com/free-icons/plus
import trashIcon from '../../Assets/Images/trash.png' // Source: Delete icons created by bqlqn - Flaticon, from https://www.flaticon.com/free-icons/delete
import editIcon from '../../Assets/Images/editing.png' // Modify icons created by Freepik - Flaticon, from https://www.flaticon.com/free-icons/modify
import "../../Assets/Styles/Modal.css"
import { ActionTypes } from "../../general_redux/types";

// function isAmount equal takes 2 numbers and returns true or false
function isAmountEqual(firstAmount, secondAmount) {
    //checks if its a number and returns it *100 as an int
    function validateNum(value) {
        const multipliedValue = value * 100;
        const intValue = parseInt(multipliedValue);
        if (isNaN(intValue)) {
            console.error("Amount must be a number.");
            return false;
        }
        return intValue;
    }
    let num1 = validateNum(firstAmount);
    let num2 = validateNum(secondAmount);
    return (num1 === num2);
}

//function divideAmount takes the amount and the number it should be divided by
//it outputs an object witht the quotient and remainder as string with 2 decimals
function divideAmount(amount, divisor) {
    if (divisor === 0 || !divisor || Number.isNaN(amount) || Number.isNaN(divisor)) {
        console.error("Numbers required for division.")
        return {
            quotient: 0,
            remainder: 0
        }
    }
    let quotient = (Math.round(amount * 100 / divisor)) / 100;
    let remainder = Math.abs(amount - (quotient * divisor));
    return {
        quotient: quotient.toFixed(2),
        remainder: remainder.toFixed(2), // limit the remainder to 2 decimal places
    };
}

const ACTIONS = {
    SELECTED: 'selected',
    USER_INPUT_BLUR: 'userInputBlur',
    USER_INPUT_AMOUNT: 'userInputAmount',
    CHECK_IS_VALID: 'checkIsValid',
    RECALCULATE: 'recalculate',
    CLEAR: 'clear'
    // INPUT_BLUR: 'inputBlur'
}

//MIGHT WANT TO ADD LOADER TO ACTIONS BELLOW...

function multipleGroupReducer(state, action) {
    switch (action.type) {
        //action called when groups are selected in the MultiSelect element:
        case ACTIONS.SELECTED:
            //THIS ACTION NEEDS: action.val.objs and action.val.totalAmount
            let { objs, totalAmount } = action.val;
            const numSelectedGroups = objs.length;

            // Return if no objects
            // if (numSelectedGroups === 0) { // no longer needed
            //     return state
            // }

            // Calculate amount per group and handle remainder using divideAmount
            let setAmountPerGroup;
            let remainder = false;

            if (numSelectedGroups === 1) {
                setAmountPerGroup = (totalAmount === '' || totalAmount == '0' || isNaN(Number(totalAmount))) ? '' : parseFloat(totalAmount).toFixed(2);
                console.log("here")
                console.log(setAmountPerGroup)
            } else {
                if (totalAmount === '' || totalAmount == '0' || isNaN(Number(totalAmount))) {
                    setAmountPerGroup = '';
                } else {
                    let divisionResult = divideAmount(Number(totalAmount), numSelectedGroups);
                    setAmountPerGroup = divisionResult.quotient;
                    divisionResult.remainder !== 0 ? remainder = divisionResult.remainder : remainder = false;
                }
            }
            // Save array of groups selected along with their share of the total expense amount
            const newGroupSelection = objs.map((group, index) => {
                let theAmount = setAmountPerGroup;
                if (index === 0 && theAmount !== '' && remainder && remainder !== "0.00") {
                    theAmount = (((Number(theAmount) * 100) + (remainder * 100))) / 100
                    theAmount = parseFloat(theAmount.toFixed(2))
                }
                return {
                    uuid: group.value,
                    name: group.label,
                    amount: theAmount,
                };
            });

            return {
                groupsChosen: newGroupSelection,
                sumOfAmounts: totalAmount,
                isValid: true,
                allowRecalculation: false,
            };

        //action to be called when user changes the amount for a group (while typing):
        case ACTIONS.USER_INPUT_AMOUNT:
            //THIS ACTION NEEDS: action.val.uuid, action.val.input
            return {
                groupsChosen: state.groupsChosen.map(group => {
                    if (group.uuid === action.val.uuid) {
                        return {
                            ...group,
                            amount: action.val.amount,
                        };
                    }
                    return group;
                }), sumOfAmounts: state.totalAmount,
                isValid: state.isValid, allowRecalculation: state.allowRecalculation
            };

        //action to be called when user changes the amount for a group (on blur):
        case ACTIONS.USER_INPUT_BLUR:
            //THIS ACTION NEEDS: action.val.uuid, action.val.amount, and action.val.totalAmount
            const { uuid, amount, totalAmount: theTotalAmount } = action.val;

            //validate amount
            if (isNaN(Number(amount))) {
                toast.error("Amount must be a number. Format: 0 or 0.0 or 0.00.")
                return state;
            }
            //save updated amount to the group in question and update sumofAmounts
            let allGroupsChosen = [...state.groupsChosen]
            let newSumOfAmounts = 0;
            let isEqual = false;

            for (let i = 0; i < allGroupsChosen.length; i++) {
                const group = allGroupsChosen[i];

                if (group.uuid === uuid) {
                    group.amount = parseFloat(Number(amount)).toFixed(2);
                }

                newSumOfAmounts += Number(group.amount) * 100;
            }

            newSumOfAmounts = newSumOfAmounts / 100;

            // Check if sum of amounts equals total amount of expense
            isEqual = isAmountEqual(newSumOfAmounts, Number(theTotalAmount));

            return {
                groupsChosen: allGroupsChosen,
                sumOfAmounts: newSumOfAmounts,
                isValid: isEqual,
                allowRecalculation: isEqual,
            };

        //action called if user changes expense's total amount
        case ACTIONS.CHECK_IS_VALID:
            //THIS ACTION NEEDS: action.val.totalAmount
            let checkValidity;
            if (state.groupsChosen.length > 0) {
                if (Number(action.val.totalAmount) === 0 || action.val.totalAmount === '') {
                    checkValidity = (state.sumOfAmounts === 0);
                } else if (isNaN(Number(action.val.totalAmount))) {
                    checkValidity = false;
                } else {
                    checkValidity = isAmountEqual(state.sumOfAmounts, action.val.totalAmount)
                }
            } else {
                checkValidity = false;
            }
            return {
                groupsChosen: state.groupsChosen, sumOfAmounts: state.sumOfAmounts,
                isValid: checkValidity, allowRecalculation: checkValidity
            }
        //action called if user wants to divide expense amount equally among selected groups
        case ACTIONS.RECALCULATE: //// CHECK THIS ACTION --- might need recalculation more similar to ACTIONS.SELECTED!!!!!!!!!!!!!!!!!!!!!!
            //THIS ACTION NEEDS: action.val.totalAmount
            let totalExpenseAmount = Number(action.val.totalAmount);

            // validate total amount
            if (isNaN(totalExpenseAmount)) {
                toast.error("The expense must be assigned a total amount as a number.");
                return state;
            }
            //now, divide the total expense amount by the number of groups selected
            let amountPerGroup;
            let theRemainder = false;
            if (state.groupsChosen.length === 1) {
                amountPerGroup = totalExpenseAmount;
            } else if (state.groupsChosen.length > 1) {
                const { quotient, remainder } = divideAmount(totalExpenseAmount, state.groupsChosen.length);
                amountPerGroup = quotient;
                theRemainder = remainder !== "0.00" ? remainder : false;
            } else {
                amountPerGroup = 0;
            }

            return {
                groupsChosen: state.groupsChosen, sumOfAmounts: totalExpenseAmount,
                isValid: true, allowRecalculation: false
            }
        case ACTIONS.CLEAR:
            return {
                groupsChosen: [], sumOfAmounts: 0,
                isValid: undefined, allowRecalculation: false
            }

        default:
            return state;
    }
}

//dont forget: if total of the expense is changed, do not update the amounts of groups, but warn user.
//place button for re-calculating the division.

function ModalAddExpense(props) {
    const styleClasses = 'ModalAddExpense ' + props.className;
    const selectedWorkspace = useSelector((state) => state.selectedWorkspace.selectedWorkspace);
    const selectedWorkspaceGroups = useSelector((state) => state.selectedWorkspace.selectedWorkspaceGroups);
    const selectedWorkspaceAccounts = useSelector((state) => state.selectedWorkspace.selectedWorkspaceAccounts);
    const selectedWorkspaceTags = useSelector((state) => state.selectedWorkspace.selectedWorkspaceTags);
    const selectedWorkspaceExpenseCategories = useSelector((state) => state.selectedWorkspace.selectedWorkspaceExpenseCategories);
    const [enteredDate, setDate] = useState(new Date().toISOString().substring(0, 10));
    const [enteredDescription, setDescription] = useState('');
    const [enteredAmount, setAmount] = useState('');
    const [enteredCategory, setCategory] = useState('');
    const [selectGroupOptions, setSelectGroupOptions] = useState([]); //Group options to be fed to Multi-Select element
    const [enteredGroup, setGroup] = useState([]); //Multi-Select modal stores selected Groups here
    const [enteredAccount, setAccount] = useState('');
    const [selectTagOptions, setSelectTagOptions] = useState(''); //Tag options to be fed to Select element
    const [periodSelected, setperiodSelected] = useState(false);
    const [periodStart, setPeriodStart] = useState('');
    const [periodEnd, setPeriodEnd] = useState('');
    const [isRecurringSelected, setIsRecurringSelected] = useState(false);
    const [isRecurringInterval, setIsRecurringInterval] = useState('monthly');
    const [isRecurringPeriod, setIsRecurringPeriod] = useState('current');

    //State to manage selected groups and amounts set per group
    const [multipleGroupSelection, dispatchMultipleGroupSelection] = useReducer(multipleGroupReducer, {
        groupsChosen: [], //objects with group uuid, name, amount
        sumOfAmounts: 0,
        isValid: undefined,
        allowRecalculation: false //use to control button to re-divide group amounts
    })

    //Group options to be used in MultiSelect element
    useEffect(() => {
        if (selectedWorkspaceGroups && selectedWorkspaceGroups.length !== 0) {
            let groupOptions = []
            selectedWorkspaceGroups.forEach(group => {
                let groupObj = {
                    value: group.uuid,
                    label: group.name
                };
                groupOptions.push(groupObj)
            })
            setSelectGroupOptions(groupOptions)
        }
    }, [selectedWorkspaceGroups])

    // Manage amount per group when group selection changes
    useEffect(() => {
        if (enteredGroup.length === 0) {
            dispatchMultipleGroupSelection({ type: ACTIONS.CLEAR })
        } else {
            dispatchMultipleGroupSelection(
                { type: ACTIONS.SELECTED, val: { objs: enteredGroup, totalAmount: enteredAmount } }
            )
        }
    }, [enteredGroup])

    // Check validity of group amount input when user changes Expense Amount
    useEffect(() => {
        dispatchMultipleGroupSelection(
            { type: ACTIONS.CHECK_IS_VALID, val: { totalAmount: enteredAmount } }
        )
        console.log("CHECK_IS_VALID")
        console.log(multipleGroupSelection)
    }, [enteredAmount])

    //Show available tags as options in Select element 
    useEffect(() => {
        if (selectedWorkspaceTags && selectedWorkspaceTags.length !== 0) {
            let tagOptions = []
            selectedWorkspaceTags.forEach(tag => {
                let tagObj = {
                    value: tag.name,
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

    //GROUPS -- NEW
    function changeGroupAmountHandler(event) {
        dispatchMultipleGroupSelection({
            type: ACTIONS.USER_INPUT_AMOUNT,
            val: { amount: event.target.value, uuid: event.target.dataset.uuid }
        })
        console.log("USER_INPUT_AMOUNT")
        console.log(multipleGroupSelection)
    }
    function changeGroupAmountOnBlurHandler(event) {
        dispatchMultipleGroupSelection({
            type: ACTIONS.USER_INPUT_BLUR,
            val: { amount: event.target.value, uuid: event.target.dataset.uuid, totalAmount: enteredAmount }
        })
        console.log("USER_INPUT_BLUR")
        console.log(multipleGroupSelection)
    }


    //GROUPS BELLOW
    // function groupChangeHandler(e) {
    //     setGroup(e.target.value);
    // }
    // function multiGroupSelectionChangeHandler(e) {
    //     console.log(e.target)
    //     dispatchMultipleGroupSelection({ type: ACTIONS.USER_INPUT_SELECTION, val: e.target.value })
    // }
    // function multiGroupAmountChangeHandler(e) {
    //     let amount = Number(e.target.value);
    //     if (isNaN(amount)) {
    //         toast.error(`Error: amount must be a number.`);
    //     } else {
    //         dispatchMultipleGroupSelection({ type: ACTIONS.USER_INPUT_AMOUNT, val: amount })
    //     }
    // }
    // function multiGroupAddClickHandler(e) {
    //     e.preventDefault();
    //     dispatchMultipleGroupSelection({ type: ACTIONS.SELECTED })
    //     if (isAmountEqual(multipleGroupSelection.sumOfAmounts, enteredAmount)) {
    //         dispatchMultipleGroupSelection({ type: ACTIONS.SET_IS_VALID })
    //     }
    // }
    // function multiGroupDeleteClickHandler(e) {
    //     dispatchMultipleGroupSelection({ type: ACTIONS.DELETED })
    //     if (isAmountEqual(multipleGroupSelection.sumOfAmounts, enteredAmount)) {
    //         dispatchMultipleGroupSelection({ type: ACTIONS.SET_IS_VALID })
    //     }
    // }
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
        setGroup('');
        setCategory('');
        setAccount('');
        dispatchMultipleGroupSelection({ type: ACTIONS.CLEAR })
    }

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
                    <label htmlFor="expenseDate">Date:</label>
                    <input id="expenseDate" name="expenseDate" type="date" value={enteredDate} onChange={dateChangeHandler} />
                </div>
                {/* DESCRIPTION */}
                <div className="Modal-InputContainer">
                    <label htmlFor="expenseDescription">Description:</label>
                    <input id="expenseDescription" name="expenseDescription" type="text" minLength="1" maxLength="100" value={enteredDescription} onChange={descriptionChangeHandler} />
                </div>
                {/* AMOUNT */}
                <div className="Modal-InputContainer">
                    <label htmlFor="expenseAmount">Amount:</label>
                    <input id="expenseAmount" name="expenseAmount" type="number" min="0.00" step=".01"
                        value={enteredAmount} onChange={amountChangeHandler} />
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
                {/* <div className="Modal-InputContainer">
                    <label htmlFor="group">Assign to group:</label>
                    {
                        (!selectedWorkspaceGroups || selectedWorkspaceGroups.length === 0) ?
                            (
                                <select name="group" id="group" value="" disabled>
                                    <option value="">no groups</option>
                                </select>
                            ) :
                            (
                                <Select className="basic-single"
                                    classNamePrefix="select Modal-MultiSelect-Select" isClearable={false}
                                    theme={(theme) => ({
                                        ...theme,
                                        borderRadius: 0,
                                        colors: {
                                            ...theme.colors,
                                            primary25: '#f1f2f7',
                                            primary: 'black',
                                        },
                                    })} options={selectGroupOptions} isMulti isSelectAll={true} onChange={handleGroupSelect} />
                            )
                    }
                </div> */}
                <div className="Modal-InputContainer">
                    <label htmlFor="group">Assign to group:</label>
                    {
                        (!selectedWorkspaceGroups || selectedWorkspaceGroups.length === 0) ?
                            (
                                <select name="group" id="group" value="" disabled>
                                    <option value="">no groups</option>
                                </select>
                            ) :
                            (
                                <MultiSelect
                                    options={selectGroupOptions}
                                    value={enteredGroup}
                                    onChange={setGroup}
                                    labelledBy="SelectGroup"
                                />
                            )
                    }
                </div>
                {
                    multipleGroupSelection.groupsChosen.length > 0 && (
                        <div>
                            <p>Define amount corresponding to each selected group bellow.</p>
                            <table className="Common-Table Common-Table-WhiteBg">
                                <tbody>
                                    <tr>
                                        <th>Group</th>
                                        <th>Amount</th>
                                        <th></th>
                                        <th></th>
                                    </tr>
                                    {multipleGroupSelection.groupsChosen.map((group, index) => (
                                        <tr key={index}>
                                            <td className="Common-Table-tdBullet">
                                                <div className="Common-Table-YellowDiv"></div>
                                                {group.name}</td>
                                            <td className="Common-Table-tdInfo">
                                                <input type="number" value={group.amount} data-uuid={group.uuid} onChange={changeGroupAmountHandler} onBlur={changeGroupAmountOnBlurHandler} />
                                            </td>
                                            <td className="Common-Table-tdIcon">
                                                <img role="button" src={editIcon} alt="edit element" className="Common-Icon" />
                                            </td>
                                            <td className="Common-Table-tdIcon">
                                                <img role="button" src={trashIcon} alt="delete element" className="Common-Icon" />
                                            </td>
                                        </tr>
                                    ))}
                                    <tr className="Common-Table-GrayRow Common-Table-InfoRow">
                                        <td>Sum:</td>
                                        <td>{multipleGroupSelection.sumOfAmounts}</td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                    <tr className="Common-Table-InfoRow">
                                        <td><i>Total Expense Amount:</i></td>
                                        <td><i>{enteredAmount}</i></td>
                                    </tr>
                                    <tr className="Common-Table-InfoRow">
                                        <td><i>Difference:</i></td>
                                        <td><i className={enteredAmount - multipleGroupSelection.sumOfAmounts === 0 ? "" : "Common-Text-Red"}>{enteredAmount - multipleGroupSelection.sumOfAmounts}</i></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                    )
                }
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
                                <Select className="basic-single"
                                    classNamePrefix="select Modal-MultiSelect-Select" isClearable={true}
                                    theme={(theme) => ({
                                        ...theme,
                                        borderRadius: 0,
                                        colors: {
                                            ...theme.colors,
                                            primary25: '#f1f2f7',
                                            primary: 'black',
                                        },
                                    })} options={selectTagOptions} isMulti />
                            )
                    }
                </div>
                {/* PERIOD */}
                <div>
                    <div className="Modal-CheckboxContainer">
                        <input type="checkbox" id="selectPeriod" name="selectPeriod" value="selectPeriod" checked={periodSelected} onChange={periodSelectedHandler} />
                        <label htmlFor="selectPeriod"> Define period</label>
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
                {/* RECURRING */}
                <div>
                    <div className="Modal-CheckboxContainer">
                        <input type="checkbox" id="selectRecurring" name="selectRecurring" value="selectRecurring" checked={isRecurringSelected} onChange={isRecurringSelectedHandler} />
                        <label htmlFor="selectPeriod"> Expense is recurring</label>
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
                {/* SUBMIT */}
                <button type="submit" className="Modal-PrimaryBtn" onClick={closeThisModal}>Add expense</button>
            </form>
        </ModalWrapper >
    )
}

export default ModalAddExpense;
