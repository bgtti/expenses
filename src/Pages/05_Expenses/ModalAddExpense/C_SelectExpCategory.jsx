import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { PropTypes } from 'prop-types';


function SelectExpCategory(props) {
    const { enteredCategory, setCategory } = props;

    const selectedWorkspaceExpenseCategories = useSelector((state) => state.selectedWorkspace.selectedWorkspaceExpenseCategories);

    useEffect(() => {
        if (selectedWorkspaceExpenseCategories.length > 1) {
            setCategory(selectedWorkspaceExpenseCategories[0].uuid);
        }
    }, [selectedWorkspaceExpenseCategories]);

    function categoryChangeHandler(e) {
        setCategory(e.target.value);
    }

    return (
        <div className="Modal-InputContainer">
            <label htmlFor="category">Expense category:</label>
            <select
                className="Modal-SelectElement"
                disabled={!selectedWorkspaceExpenseCategories || selectedWorkspaceExpenseCategories.length === 0}
                id="category"
                name="category"
                onChange={categoryChangeHandler}
                value={enteredCategory}
            >
                {
                    (!selectedWorkspaceExpenseCategories || selectedWorkspaceExpenseCategories.length === 0) ?
                        (<option value="">no category</option>) :
                        (selectedWorkspaceExpenseCategories.map((category, index) => (
                            <option key={index} value={category.uuid}>{category.name}</option>
                        )))
                }
            </select>
        </div>
    )
};
SelectExpCategory.propTypes = {
    enteredCategory: PropTypes.string.isRequired,
    setCategory: PropTypes.func.isRequired
};

export default SelectExpCategory;