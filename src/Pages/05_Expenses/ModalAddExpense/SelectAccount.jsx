import React, { useEffect, useState, useReducer } from "react";
import { useSelector } from "react-redux";


function SelectAccount() {
 const selectedWorkspaceAccounts = useSelector((state) => state.selectedWorkspace.selectedWorkspaceAccounts);
 const [enteredAccount, setAccount] = useState('');
 function accountChangeHandler(e) {
  setAccount(e.target.value);
 }

 return (
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
 )
}

export default SelectAccount