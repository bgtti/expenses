import React from "react";
import { PropTypes } from 'prop-types';
import "../../../Assets/Styles/Modal.css"

function SetDescription(props) {
    const { enteredDescription, setDescription } = props;

    function descriptionChangeHandler(e) {
        setDescription(e.target.value);
    }

    return (
        <div className="Modal-InputContainer">
            <label htmlFor="expenseDescription">Description:</label>
            <input id="expenseDescription" name="expenseDescription" type="text" minLength="1" maxLength="100" value={enteredDescription} onChange={descriptionChangeHandler} />
        </div>
    )
};

SetDescription.propTypes = {
    enteredDescription: PropTypes.string.isRequired,
    setDescription: PropTypes.func.isRequired
};

export default SetDescription;