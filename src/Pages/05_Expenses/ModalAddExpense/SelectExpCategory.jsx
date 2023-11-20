import React, { useEffect, useState, useReducer } from "react";
import { useSelector } from "react-redux";


function SelectExpCategory() {
  const selectedWorkspaceExpenseCategories = useSelector((state) => state.selectedWorkspace.selectedWorkspaceExpenseCategories);
  const [enteredCategory, setCategory] = useState('');

  function categoryChangeHandler(e) {
    setCategory(e.target.value);
  }

  return (
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
  )
}

export default SelectExpCategory