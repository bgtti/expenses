import React, { useEffect } from "react";
import { PropTypes } from "prop-types";

function DefineVAT(props) {
    const { enteredAmount, VAT, setVAT } = props;

    function checkVATAmount(vatAmount) {
        if (vatAmount !== "") {
            vatAmount = Number(vatAmount);
            let expenseAmount;
            if (enteredAmount === "") {
                expenseAmount = 0;
            } else {
                expenseAmount = Number(enteredAmount);
            }
            return !(vatAmount >= expenseAmount);
        }
        return false;
    }

    useEffect(() => {
        if (VAT.expenseAmountChanged === true) {
            setVAT(prevState => ({
                ...prevState,
                expenseAmountChanged: false,
                isValid: checkVATAmount(VAT.amount),
            }));
        }
    }, [VAT.expenseAmountChanged]);

    function hasVATChangeHandler(e) {
        setVAT({
            hasVAT: e.target.checked,
            amount: "",
            isValid: !e.target.checked
        });
    }
    function vatChangeHandler(e) {
        setVAT(prevState => ({
            ...prevState,
            amount: e.target.value,
        }));
    }
    function vatCheckValidityHandler(e) {
        setVAT(prevState => ({
            ...prevState,
            isValid: checkVATAmount(e.target.value),
        }));
    }

    return (
        <div>
            <div className="Modal-CheckboxContainer">
                <input type="checkbox" id="selectVAT" name="selectVAT" value="selectVAT" onChange={hasVATChangeHandler} />
                <label htmlFor="selectVAT"> Include VAT amount</label>
            </div>
            {
                VAT.hasVAT && (
                    <div className="Modal-DropdownContainerForFurtherInput">
                        <div className="Modal-InputContainer-Dropdown">
                            <label htmlFor="vatAmount">Total VAT included in amount:*</label>
                            <input type="number" id="vatAmount" name="vatAmount" value={VAT.amount} onChange={vatChangeHandler} onBlur={vatCheckValidityHandler} />
                        </div>
                        {
                            VAT.amount !== "" && !VAT.isValid && enteredAmount !== "" && (
                                <p>Check your input: {VAT.amount} is greater than {enteredAmount}. </p>
                            )
                        }
                        {
                            VAT.amount !== "" && enteredAmount === "" && (
                                <p>Check your input: add an amount to this expense before adding VAT. </p>
                            )
                        }
                    </div>
                )
            }
        </div>
    )
}

DefineVAT.propTypes = {
    enteredAmount: PropTypes.string.isRequired,
    VAT: PropTypes.object.isRequired,
    setVAT: PropTypes.func.isRequired,
};

export default DefineVAT