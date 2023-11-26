import React, { useEffect, useState, useReducer } from "react";


function DefineNote() {
    const [note, setNote] = useState({
        hasNote: false,
        note: '',
    });

    return (
        <div>
            <div className="Modal-CheckboxContainer">
                <input type="checkbox" id="selectNote" name="selectNote" value="selectNote" />
                <label htmlFor="selectNote">Add a note</label>
            </div>
        </div>
    )
}

export default DefineNote