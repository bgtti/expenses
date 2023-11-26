import React, { useEffect, useState, useReducer } from "react";
import { PropTypes } from 'prop-types';

function DefineRecurring() {

    //Recurring:
    const [isRecurringSelected, setIsRecurringSelected] = useState(false);
    const [isRecurringInterval, setIsRecurringInterval] = useState('monthly');
    const [isRecurringPeriod, setIsRecurringPeriod] = useState('current');

    function isRecurringSelectedHandler(event) {
        if (event.target.checked) {
            setIsRecurringSelected(true);
        } else {
            setIsRecurringSelected(false);
        }
    }
    function isRecurringIntervalHandler(event) {
        setIsRecurringInterval(event.target.value);
    }
    function isRecurringPeriodHandler(event) {
        setIsRecurringPeriod(event.target.value);
    }


    return (
        <div>
            <div className="Modal-CheckboxContainer">
                <input type="checkbox" id="selectRecurring" name="selectRecurring" value="selectRecurring" checked={isRecurringSelected} onChange={isRecurringSelectedHandler} />
                <label htmlFor="selectRecurring"> Expense is recurring</label>
            </div>
            {isRecurringSelected && (
                <div className="Modal-InformationGroupingDiv Modal-DropdownContainerForFurtherInput">
                    <div className="Modal-Modal-DropdownContainerForFurtherInput-SubDiv">
                        <p>Interval:</p>
                        <div className="Modal-RadioBtnContainer">
                            <input type="radio" id="weekly" name="weekly" value="weekly" checked={isRecurringInterval === 'weekly'} onChange={isRecurringIntervalHandler} />
                            <label htmlFor="weekly">weekly</label>
                        </div>
                        <div className="Modal-RadioBtnContainer">
                            <input type="radio" id="monthly" name="monthly" value="monthly" checked={isRecurringInterval === 'monthly'} onChange={isRecurringIntervalHandler} />
                            <label htmlFor="monthly">monthly</label>
                        </div>
                        <div className="Modal-RadioBtnContainer">
                            <input type="radio" id="yearly" name="yearly" value="yearly" checked={isRecurringInterval === 'yearly'} onChange={isRecurringIntervalHandler} />
                            <label htmlFor="yearly">yearly</label>
                        </div>
                    </div>
                    <div className="Modal-Modal-DropdownContainerForFurtherInput-SubDiv">
                        <p>Period:</p>
                        <div className="Modal-RadioBtnContainer">
                            <input type="radio" id="pre" name="pre" value="pre" checked={isRecurringPeriod === 'pre'} onChange={isRecurringPeriodHandler} />
                            <label htmlFor="pre">predate</label>
                        </div>
                        <div className="Modal-RadioBtnContainer">
                            <input type="radio" id="as" name="as" value="as" checked={isRecurringPeriod === 'as'} onChange={isRecurringPeriodHandler} />
                            <label htmlFor="as">as date</label>
                        </div>
                        <div className="Modal-RadioBtnContainer">
                            <input type="radio" id="post" name="post" value="post" checked={isRecurringPeriod === 'post'} onChange={isRecurringPeriodHandler} />
                            <label htmlFor="post">postdate</label>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default DefineRecurring