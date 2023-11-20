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
import SelectSupplier from "./SelectSupplier"
import SelectGroups from "./SelectGroups";
import Subgroup from "./Subgroups"
import SelectTags from "./SelectTags"

function SetDescription() {
 //Description:
 const [enteredDescription, setDescription] = useState('');

 function descriptionChangeHandler(e) {
  setDescription(e.target.value);
 }


 return (
  <div className="Modal-InputContainer">
   <label htmlFor="expenseDescription">Description:</label>
   <input id="expenseDescription" name="expenseDescription" type="text" minLength="1" maxLength="100" value={enteredDescription} onChange={descriptionChangeHandler} />
  </div>
 )
}

export default SetDescription