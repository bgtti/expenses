import React, { useEffect, useState } from "react";
import { PropTypes } from 'prop-types';

function DefinePeriod(props) {
    const { enteredDate, definedPeriod, setDefinedPeriod } = props;
    const [periodSelected, setPeriodSelected] = useState(false);

    //Defined period should not change if user checks the box to define manually
    useEffect(() => {
        const theDate = new Date(enteredDate)
        if (!periodSelected && theDate && !isNaN(theDate)) {
            const theDateStart = new Date(theDate.getFullYear(), theDate.getMonth(), 2)
            const theDateEnd = new Date(theDate.getFullYear(), theDate.getMonth() + 1, 1)
            setDefinedPeriod({
                periodStart: theDateStart.toISOString().substring(0, 10),
                periodEnd: theDateEnd.toISOString().substring(0, 10)
            });
        }
    }, [enteredDate, periodSelected])

    function periodStartChangeHandler(e) {
        setDefinedPeriod(prevState => ({
            ...prevState,
            periodStart: e.target.value,
        }));
    }
    function periodEndChangeHandler(e) {
        setDefinedPeriod(prevState => ({
            ...prevState,
            periodEnd: e.target.value,
        }));
    }
    function periodSelectedHandler(event) {
        setPeriodSelected(event.target.checked);
    }

    return (
        <div>
            <div className="Modal-CheckboxContainer">
                <input type="checkbox" id="selectPeriod" name="selectPeriod" value="selectPeriod" checked={periodSelected} onChange={periodSelectedHandler} />
                <label htmlFor="selectPeriod">Define period manually</label>
            </div>
            {periodSelected && (
                <div className="Modal-DropdownContainerForFurtherInput">
                    <div className="Modal-InputContainer-Dropdown">
                        <label htmlFor="periodFrom">From:</label>
                        <input type="date" id="periodFrom" name="periodFrom" value={definedPeriod.periodStart} onChange={periodStartChangeHandler} />
                    </div>
                    <div className="Modal-InputContainer-Dropdown">
                        <label htmlFor="periodTo">To:</label>
                        <input type="date" id="periodTo" name="periodTo" value={definedPeriod.periodEnd} onChange={periodEndChangeHandler} />
                    </div>
                </div>
            )}
        </div>
    )
};

DefinePeriod.propTypes = {
    enteredDate: PropTypes.string.isRequired,
    definedPeriod: PropTypes.object.isRequired,
    setDefinedPeriod: PropTypes.func.isRequired
};

export default DefinePeriod