import React, { useEffect, useState, useReducer } from "react";

function DefineVAT() {
    //VAT:
    const [VAT, setVAT] = useState({
        hasVAT: false,
        amount: '',
    });

    return (
        <div>
            <div className="Modal-CheckboxContainer">
                <input type="checkbox" id="selectVAT" name="selectVAT" value="selectVAT" />
                <label htmlFor="selectVAT"> Include VAT amount</label>
            </div>
        </div>
    )
}

export default DefineVAT