import React from "react";
import { PropTypes } from "prop-types";

function DefineExpNum(props) {
    const { customNumber, setCustomNumber } = props;

    function customNumberSelectedHandler(event) {
        setCustomNumber({
            hasCustomNumber: event.target.checked,
            customNumber: "",
        })
    }
    function customNumberHandler(event) {
        setCustomNumber(prevState => ({
            ...prevState,
            customNumber: event.target.value
        }))
    }

    return (
        <div>
            <div className="Modal-CheckboxContainer">
                <input type="checkbox" id="selectCustomExpenseNumber" name="selectCustomExpenseNumber" onChange={customNumberSelectedHandler} value="selectCustomExpenseNumber" />
                <label htmlFor="selectCustomExpenseNumber"> Custom expense number</label>
            </div>
            {
                customNumber.hasCustomNumber && (
                    <div className="Modal-DropdownContainerForFurtherInput">
                        <div className="Modal-InputContainer-Dropdown">
                            <label htmlFor="customNr">Set number:</label>
                            <input type="text" id="customNr" name="customNr" value={customNumber.customNumber} onChange={customNumberHandler} minLength="1" maxLength="25" />
                        </div>
                    </div>
                )
            }
        </div>
    )
};

DefineExpNum.propTypes = {
    customNumber: PropTypes.object.isRequired,
    setCustomNumber: PropTypes.func.isRequired,
};

export default DefineExpNum;