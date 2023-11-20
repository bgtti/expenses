import { useEffect, useState, useReducer } from "react";
import { useSelector } from "react-redux";
import { toast } from 'react-toastify';
import Select, { createFilter } from 'react-select'
import { MultiSelect } from "react-multi-select-component";
import { PropTypes } from 'prop-types';


import { isAmountEqual, divideAmount } from "./helpers";



//Explanation:
//The user can choose how the total expense amount is allocated to groups or subgroups
//Assuming the user has both groups and subgroups, the user's choices are:
//1) equally between sub-groups
//2) equally between groups
//3) specify amount per sub-group
//4) specify amount per group
//5) do not allocate costs

//If the user has no groups (and thus, no subgroups), the default should be option 5)
//If the user has groups but no subgroups, the default should be option 2)
//If the user has both groups and subgroups, the default should be option 1)

//Option 1 will divide the total expense amount between the number of subgroups the user has. The groups these subgroups belong to will then inherit the sum of the amount of its children.
//Option 2 will divide the total expense amount between the number of groups the user has. The group's amount will then be divided among it's children.
//Option 3 will allow the user to specify amount per selected subgroup. The parents of the subgroups selected will inherit their amounts from the sum of amounts of its children.
//Option 4 will allow the user to specify the amount per selected group. The children (subgroups) of the selected parents will have the parent's amount divided equally among them.
//Option 5 will not allocate any cost to either groups or subgroups

const COST_ALLOCATION_OPTIONS = {
    NO_ALLOCATION: "none",
    EQUAL_AMONG_SUBGROUPS: "equalSubgroup",
    EQUAL_AMONG_GROUPS: "equalGroup",
    SPECIFIC_BY_SUBGROUP: "specificSubgroup",
    SPECIFIC_BY_GROUP: "specificGroup"
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

function SelectGroups(props) {
    //Props
    const enteredAmount = props.enteredAmount;
    const clearSelection = props.clearSelection;
    const passInfoToParentComponent = (groupsArray, isValid, clearSelection) => {
        props.passInfo(groupsArray, isValid, clearSelection)
    }
    //Redux Groups & Subgroups
    const selectedWorkspaceGroups = useSelector((state) => state.selectedWorkspace.selectedWorkspaceGroups);
    const selectedWorkspaceSubgroups = useSelector((state) => state.selectedWorkspace.selectedWorkspaceSubgroups);

    //Component state

    //Decides whether group or subgroup have assigned cost
    const [costAssignmentTo, setCostAssignmentTo] = useState(() => {
        if (!selectedWorkspaceGroups || selectedWorkspaceGroups.length === 0) {
            return COST_ALLOCATION_OPTIONS.NO_ALLOCATION;
        } else if (selectedWorkspaceSubgroups.length > 0) {
            return COST_ALLOCATION_OPTIONS.EQUAL_AMONG_SUBGROUPS;
        } else if (selectedWorkspaceSubgroups.length === 0 && selectedWorkspaceGroups.length > 0) {
            return COST_ALLOCATION_OPTIONS.EQUAL_AMONG_GROUPS;
        } else {
            // Default value if none of the conditions match
            return COST_ALLOCATION_OPTIONS.NO_ALLOCATION;
        }
    });

    function changeCostAssignmentHandler(event) {
        setCostAssignmentTo(event.target.value);
    }

    //Group options to be fed to Multi-Select element:
    const [selectGroupOptions, setSelectGroupOptions] = useState(
        selectedWorkspaceGroups?.map((group) => ({
            value: group.uuid,
            label: group.name,
        })) || []
    );
    const [enteredGroup, setGroup] = useState([]); //Multi-Select modal stores selected Groups here

    const [multipleGroupSelection, dispatchMultipleGroupSelection] = useReducer(multipleGroupReducer, {
        groupsChosen: [], //objects with group uuid, name, amount
        sumOfAmounts: 0,
        isValid: undefined,
        allowRecalculation: false //use to control button to re-divide group amounts
    })//State to manage selected groups and amounts set per group


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
    }

    return (
        <>
            <div className="Modal-InputContainer">
                <label htmlFor="costAllocationGroups">Assign cost to:</label>
                {
                    (!selectedWorkspaceGroups || selectedWorkspaceGroups.length === 0) && (
                        <select name="costAllocationGroups" id="costAllocationGroups" value="none" disabled>
                            <option value="none">no groups</option>
                        </select>
                    )
                }
                {
                    selectedWorkspaceGroups && selectedWorkspaceGroups.length > 0 && (
                        <select name="costAllocationGroups" id="costAllocationGroups" onChange={changeCostAssignmentHandler} value={costAssignmentTo}>
                            {
                                selectedWorkspaceSubgroups && selectedWorkspaceSubgroups.length > 0 && (
                                    <option value="equalSubgroup">equally among sub-groups</option>
                                )
                            }
                            <option value="equalGroup">equally among groups</option>
                            {
                                selectedWorkspaceSubgroups && selectedWorkspaceSubgroups.length > 1 && (
                                    <option value="specificSubgroup">specify per sub-group</option>
                                )
                            }
                            {
                                selectedWorkspaceGroups.length > 1 && (
                                    <option value="specificGroup">specify per group</option>
                                )
                            }
                            <option value="none">do not allocate cost</option>
                        </select>
                    )
                }
            </div>
            {
                costAssignmentTo === COST_ALLOCATION_OPTIONS.SPECIFIC_BY_GROUP && (
                    <div className="Modal-InputContainer">
                        <label htmlFor="group">Select group:</label>
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
                )
            }
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
                                    <td>{enteredAmount === "" || isNaN(Number(multipleGroupSelection.sumOfAmounts)) ?
                                        "-" : parseInt(multipleGroupSelection.sumOfAmounts).toFixed(2)}</td>
                                </tr>
                                <tr className="Common-Table-InfoRow">
                                    <td><i>Total Expense Amount:</i></td>
                                    <td><i>{enteredAmount === "" || isNaN(Number(enteredAmount)) ?
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
};

SelectGroups.propTypes = {
    enteredAmount: PropTypes.string,
    clearSelection: PropTypes.bool,
    passInfo: PropTypes.func.isRequired
};

export default SelectGroups 