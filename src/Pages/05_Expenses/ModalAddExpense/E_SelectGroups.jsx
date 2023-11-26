import { useEffect, useState, useReducer } from "react";
import { useSelector } from "react-redux";
import { toast } from 'react-toastify';
import { MultiSelect } from "react-multi-select-component";
import { PropTypes } from 'prop-types';
import { isAmountEqual, divideEquallyAmongObjects } from './E_selectGroupsHelpers'

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

//The calculation necessary for the correct allocation of costs will be performed by the backend. 
//From this file, what is sent is: the chosen cost allocation option and, in the case it is option 3 or 4, the array of either groups or subgroups there were specific costs allocated to.

const COST_ALLOCATION_OPTIONS = {
    NO_ALLOCATION: "none",
    EQUAL_AMONG_SUBGROUPS: "equalSubgroup",
    EQUAL_AMONG_GROUPS: "equalGroup",
    SPECIFIC_BY_SUBGROUP: "specificSubgroup",
    SPECIFIC_BY_GROUP: "specificGroup"
}

const ACTIONS = {
    USER_SELECTED_OBJ: "userSelectedObj",
    USER_INPUT_AMOUNT: 'userInputAmount',
    USER_INPUT_BLUR: 'userInputBlur',
    COST_ALLOCATION_CHANGED: 'costAllocationChanged',
    CHECK_IS_VALID: 'checkIsValid', //valid if total amount of expense was allocated to objects
    CLEAR: 'clear'
}

// MIGHT WANT TO ADD LOADER TO ACTIONS BELLOW...

function multipleGroupReducer(state, action) {
    switch (action.type) {
        case ACTIONS.USER_SELECTED_OBJ:
            //THIS ACTION NEEDS: action.val.objs and action.val.totalAmount
            let { objs, totalAmount } = action.val;
            let newObjsArray = divideEquallyAmongObjects(totalAmount, objs)
            return {
                groupsChosen: newObjsArray,
                sumOfAmounts: totalAmount,
                isValid: true,
                allocationOption: state.allocationOption
            };

        case ACTIONS.USER_INPUT_AMOUNT://action to be called when user changes the amount for a group (while typing):
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
                isValid: undefined, allocationOption: state.allocationOption
            };
        case ACTIONS.USER_INPUT_BLUR:
            //THIS ACTION NEEDS: action.val.uuid, action.val.amount, and action.val.totalAmount
            const { uuid, amount, totalAmount: theTotalAmount } = action.val;

            if (isNaN(Number(amount))) {//validate amount
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
            isEqual = isAmountEqual(newSumOfAmounts, Number(theTotalAmount));// Check if sum of amounts equals total amount of expense

            return {
                groupsChosen: allGroupsChosen,
                sumOfAmounts: newSumOfAmounts,
                isValid: isEqual,
                allocationOption: state.allocationOption
            };

        case ACTIONS.CHECK_IS_VALID: //action called if user changes expense's total amount
            let checkValidity;//THIS ACTION NEEDS: action.val.totalAmount
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
                isValid: checkValidity, allocationOption: state.allocationOption
            }

        case ACTIONS.COST_ALLOCATION_CHANGED:
            //THIS ACTION NEEDS: action.val.newAllocationOption
            return {
                groupsChosen: [], sumOfAmounts: 0,
                isValid: undefined, allocationOption: action.val.newAllocationOption
            }

        case ACTIONS.CLEAR:
            return {
                groupsChosen: [], sumOfAmounts: 0,
                isValid: undefined, allocationOption: state.allocationOption
            }

        default:
            return state;
    }
}

function SelectGroups(props) {
    //Props
    const { clearSelection, enteredAmount, passInfo } = props;

    const passInfoToParentComponent = (groupsArray, isValid, clearSelection) => {
        passInfo(groupsArray, isValid, clearSelection)
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
            return COST_ALLOCATION_OPTIONS.NO_ALLOCATION;
        }
    });

    //Multi-select Element:
    //Group (or subgroup) options to be fed to Multi-Select element (depends on type of costAssignmentTo):
    const [selectGroupOptions, setSelectGroupOptions] = useState([]);
    const [enteredGroup, setEnteredGroup] = useState([]); //Multi-Select modal stores selected Groups here

    //Reducer: will store information pertaining to user's selection
    const [multipleGroupSelection, dispatchMultipleGroupSelection] = useReducer(multipleGroupReducer, {
        groupsChosen: [], //objects with uuid, name, amount -- can be groups or subgroups
        sumOfAmounts: 0,
        isValid: undefined,
        allocationOption: costAssignmentTo
    })//State to manage selected groups and amounts set per group

    //This useEffect will list either groups or subgroups to be fed to MultiSelect according to COST_ALLOCATION_OPTIONS choice
    useEffect(() => {
        setEnteredGroup([])
        if (costAssignmentTo === COST_ALLOCATION_OPTIONS.SPECIFIC_BY_GROUP) {
            setSelectGroupOptions(
                selectedWorkspaceGroups?.map((group) => ({
                    value: group.uuid,
                    label: group.name,
                })) || []
            )
        } else if (costAssignmentTo === COST_ALLOCATION_OPTIONS.SPECIFIC_BY_SUBGROUP) {
            setSelectGroupOptions(
                selectedWorkspaceSubgroups?.map((subgroup) => ({
                    value: subgroup.uuid,
                    label: subgroup.name,
                }))
            )
        } else {
            setSelectGroupOptions([])
        }
        dispatchMultipleGroupSelection(
            { type: ACTIONS.COST_ALLOCATION_CHANGED, val: { newAllocationOption: costAssignmentTo } })
    }, [costAssignmentTo])

    // Manage amount per group when group selection changes
    useEffect(() => {
        if (enteredGroup.length === 0) {
            dispatchMultipleGroupSelection({ type: ACTIONS.CLEAR })
        } else {
            dispatchMultipleGroupSelection(
                { type: ACTIONS.USER_SELECTED_OBJ, val: { objs: enteredGroup, totalAmount: enteredAmount } }
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
        passInfoToParentComponent(multipleGroupSelection.groupsChosen, multipleGroupSelection.isValid, multipleGroupSelection.allocationOption, false)
    }, [multipleGroupSelection.groupsChosen, multipleGroupSelection.isValid, multipleGroupSelection.allocationOption])

    //Clear selection when modal is closed
    useEffect(() => {
        if (clearSelection) {
            dispatchMultipleGroupSelection({ type: ACTIONS.CLEAR });
            setEnteredGroup('');
            passInfoToParentComponent(undefined, [], "", false)
        }
    }, [clearSelection])

    function changeCostAssignmentHandler(event) {
        setCostAssignmentTo(event.target.value);
    }

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
                (costAssignmentTo === COST_ALLOCATION_OPTIONS.SPECIFIC_BY_GROUP || costAssignmentTo === COST_ALLOCATION_OPTIONS.SPECIFIC_BY_SUBGROUP) && (
                    <div className="Modal-InputContainer">
                        <label htmlFor="group">{costAssignmentTo === COST_ALLOCATION_OPTIONS.SPECIFIC_BY_GROUP ? "Select group:" : "Select sub-group:"}</label>
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
                                        onChange={setEnteredGroup}
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
                                            {group.label}</td>
                                        <td className="Common-Table-tdInfo">
                                            <input type="number" value={group.amount} data-uuid={group.uuid} onChange={changeGroupAmountHandler} onBlur={changeGroupAmountOnBlurHandler}
                                                step="0.01" />
                                        </td>
                                    </tr>
                                ))}
                                <tr className="Common-Table-GrayRow Common-Table-InfoRow">
                                    <td>Sum:</td>
                                    <td>{enteredAmount === "" || multipleGroupSelection.sumOfAmounts === "" || isNaN(Number(multipleGroupSelection.sumOfAmounts)) ?
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
    clearSelection: PropTypes.bool.isRequired,
    enteredAmount: PropTypes.string.isRequired,
    passInfo: PropTypes.func.isRequired
};

export default SelectGroups 