import React, { useEffect, useState, useReducer } from "react";
import { useSelector } from "react-redux";
import { PropTypes } from 'prop-types';


function SelectAccount(props) {
    const { enteredAccount, setAccount } = props;

    const selectedWorkspaceAccounts = useSelector((state) => state.selectedWorkspace.selectedWorkspaceAccounts);

    useEffect(() => {
        if (selectedWorkspaceAccounts.length > 1) {
            setAccount(selectedWorkspaceAccounts[0].uuid);
        }
    }, [selectedWorkspaceAccounts]);

    function accountChangeHandler(e) {
        setAccount(e.target.value);
    }

    return (
        <div className="Modal-InputContainer">
            <label htmlFor="account">Account:</label>
            <select
                disabled={!selectedWorkspaceAccounts || selectedWorkspaceAccounts.length === 0}
                id="account"
                name="account"
                onChange={accountChangeHandler}
                value={enteredAccount}
            >
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
};

SelectAccount.propTypes = {
    enteredAccount: PropTypes.string.isRequired,
    setAccount: PropTypes.func.isRequired
};

export default SelectAccount;