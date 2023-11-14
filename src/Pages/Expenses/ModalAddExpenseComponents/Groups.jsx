import { useEffect, useState, useReducer } from "react";
import { useSelector } from "react-redux";
import { toast } from 'react-toastify';
import Select, { createFilter } from 'react-select'
import { MultiSelect } from "react-multi-select-component";


import { isAmountEqual, divideAmount } from "./helpers";

const ACTIONS = {
    SELECTED: 'selected',
    USER_INPUT_BLUR: 'userInputBlur',
    USER_INPUT_AMOUNT: 'userInputAmount',
    CHECK_IS_VALID: 'checkIsValid',
    RECALCULATE: 'recalculate',
    CLEAR: 'clear'
    // INPUT_BLUR: 'inputBlur'
}

// MIGHT WANT TO ADD LOADER TO ACTIONS BELLOW...

function multipleGroupReducer(state, action) {
    switch (action.type) {
        //action called when groups are selected in the MultiSelect element:
        case ACTIONS.SELECTED:
            //THIS ACTION NEEDS: action.val.objs and action.val.totalAmount
            let { objs, totalAmount } = action.val;
            const numSelectedGroups = objs.length;

            // Calculate amount per group and handle remainder using divideAmount
            let setAmountPerGroup;
            let remainder = false;

            if (numSelectedGroups === 1) {
                setAmountPerGroup = (totalAmount === '' || totalAmount === '0' || isNaN(Number(totalAmount))) ? '' : parseFloat(totalAmount).toFixed(2);
            } else {
                if (totalAmount === '' || totalAmount === '0' || isNaN(Number(totalAmount))) {
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

function Groups(props) {
    const enteredAmount = props.enteredAmount;
    const clearSelection = props.clearSelection;
    const passInfoToParentComponent = (groupsArray, isValid, clearSelection) => {
        props.passInfo(groupsArray, isValid, clearSelection)
    }
    const selectedWorkspaceGroups = useSelector((state) => state.selectedWorkspace.selectedWorkspaceGroups);
    const [selectGroupOptions, setSelectGroupOptions] = useState([]); //Group options to be fed to Multi-Select element
    const [enteredGroup, setGroup] = useState([]); //Multi-Select modal stores selected Groups here
    const [multipleGroupSelection, dispatchMultipleGroupSelection] = useReducer(multipleGroupReducer, {
        groupsChosen: [], //objects with group uuid, name, amount
        sumOfAmounts: 0,
        isValid: undefined,
        allowRecalculation: false //use to control button to re-divide group amounts
    })//State to manage selected groups and amounts set per group

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
    }, [enteredAmount])

    // Pass selection to parent container via props
    useEffect(() => {
        passInfoToParentComponent(multipleGroupSelection.groupsChosen, multipleGroupSelection.isValid, false)
    }, [multipleGroupSelection.groupsChosen, multipleGroupSelection.isValid])

    //Clear selection when modal is closed
    useEffect(() => {
        if (clearSelection) {
            dispatchMultipleGroupSelection({ type: ACTIONS.CLEAR });
            setGroup('');
            passInfoToParentComponent(undefined, [], false)
        }
    }, [clearSelection])

    function changeGroupAmountHandler(event) {
        dispatchMultipleGroupSelection({
            type: ACTIONS.USER_INPUT_AMOUNT,
            val: { amount: event.target.value, uuid: event.target.dataset.uuid }
        })
    }
    function changeGroupAmountOnBlurHandler(event) {
        dispatchMultipleGroupSelection({
            type: ACTIONS.USER_INPUT_BLUR,
            val: { amount: event.target.value, uuid: event.target.dataset.uuid, totalAmount: enteredAmount }
        })
        console.log("USER_INPUT_BLUR")
        console.log(multipleGroupSelection)
    }

    return (
        <>
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
                                </tr>
                                {multipleGroupSelection.groupsChosen.map((group, index) => (
                                    <tr key={index}>
                                        <td className="Common-Table-tdBullet">
                                            <div className="Common-Table-YellowDiv"></div>
                                            {group.name}</td>
                                        <td className="Common-Table-tdInfo">
                                            <input type="number" value={group.amount} data-uuid={group.uuid} onChange={changeGroupAmountHandler} onBlur={changeGroupAmountOnBlurHandler}
                                                step="0.01" />
                                        </td>
                                    </tr>
                                ))}
                                <tr className="Common-Table-GrayRow Common-Table-InfoRow">
                                    <td>Sum:</td>
                                    <td>{isNaN(Number(multipleGroupSelection.sumOfAmounts)) ?
                                        "typing..." : parseInt(multipleGroupSelection.sumOfAmounts).toFixed(2)}</td>
                                </tr>
                                <tr className="Common-Table-InfoRow">
                                    <td><i>Total Expense Amount:</i></td>
                                    <td><i>{isNaN(Number(enteredAmount)) ?
                                        "-" : parseInt(enteredAmount).toFixed(2)}</i></td>
                                </tr>
                                <tr className="Common-Table-InfoRow">
                                    <td><i>Difference:</i></td>
                                    <td>
                                        <i className={Number(enteredAmount) * 100 - Number(multipleGroupSelection.sumOfAmounts) * 100 === 0 ? "" : "Common-Text-Red"}>
                                            {
                                                (isNaN((Number(enteredAmount) - Number(multipleGroupSelection.sumOfAmounts)))) ? "typing..." : ((Number(enteredAmount) * 100 - Number(multipleGroupSelection.sumOfAmounts) * 100) / 100).toFixed(2)
                                            }
                                        </i>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                )
            }
        </>
    )
}

export default Groups 