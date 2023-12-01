import React from "react";
import { PropTypes } from "prop-types";

function DefineRecurring(props) {
    const { isRecurring, setIsRecurring } = props;

    function isRecurringSelectedHandler(event) {
        setIsRecurring({
            isRecurringSelected: event.target.checked,
            isRecurringInterval: "monthly"
        })
    }
    function isRecurringIntervalHandler(event) {
        setIsRecurring(prevState => ({
            ...prevState,
            isRecurringInterval: event.target.value
        }))
    }

    return (
        <div>
            <div className="Modal-CheckboxContainer">
                <input type="checkbox" id="selectRecurring" name="selectRecurring" value="selectRecurring" checked={isRecurring.isRecurringSelected} onChange={isRecurringSelectedHandler} />
                <label htmlFor="selectRecurring"> Expense is recurring</label>
            </div>
            {isRecurring.isRecurringSelected && (
                <div className="Modal-InformationGroupingDiv Modal-DropdownContainerForFurtherInput">
                    <div className="Modal-Modal-DropdownContainerForFurtherInput-SubDiv">
                        <p>Interval:</p>
                        <div className="Modal-RadioBtnContainer">
                            <input type="radio" id="weekly" name="weekly" value="weekly" checked={isRecurring.isRecurringInterval === 'weekly'} onChange={isRecurringIntervalHandler} />
                            <label htmlFor="weekly">weekly</label>
                        </div>
                        <div className="Modal-RadioBtnContainer">
                            <input type="radio" id="monthly" name="monthly" value="monthly" checked={isRecurring.isRecurringInterval === 'monthly'} onChange={isRecurringIntervalHandler} />
                            <label htmlFor="monthly">monthly</label>
                        </div>
                        <div className="Modal-RadioBtnContainer">
                            <input type="radio" id="yearly" name="yearly" value="yearly" checked={isRecurring.isRecurringInterval === 'yearly'} onChange={isRecurringIntervalHandler} />
                            <label htmlFor="yearly">yearly</label>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
};

DefineRecurring.propTypes = {
    isRecurring: PropTypes.object.isRequired,
    setIsRecurring: PropTypes.func.isRequired,
};

export default DefineRecurring;