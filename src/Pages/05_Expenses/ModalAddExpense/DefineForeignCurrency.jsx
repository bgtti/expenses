import React, { useEffect, useState, useReducer } from "react";

function DefineForeignCurrency() {
    //Foreign Currency:
    const [isForeignCurrency, setForeignCurrency] = useState({
        isForeign: false,
        currency: '',
        amount: '',
    });

    return (
        <div>
            <div className="Modal-CheckboxContainer">
                <input type="checkbox" id="selectForeignCurrency" name="selectForeignCurrency" value="selectForeignCurrency" />
                <label htmlFor="selectForeignCurrency"> Original amount in foreign currency</label>
            </div>
        </div>
    )
}

export default DefineForeignCurrency