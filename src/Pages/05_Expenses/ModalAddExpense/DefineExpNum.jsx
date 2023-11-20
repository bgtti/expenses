import React, { useEffect, useState, useReducer } from "react";

function DefineExpNum() {
 const [customNumber, setCustomNumber] = useState({
  hasCustomNumber: false,
  customNumber: '',
 });

 return (
  <div>
   <div className="Modal-CheckboxContainer">
    <input type="checkbox" id="selectCustomExpenseNumber" name="selectCustomExpenseNumber" value="selectCustomExpenseNumber" />
    <label htmlFor="selectCustomExpenseNumber"> Custom expense number</label>
   </div>
  </div>
 )
}

export default DefineExpNum