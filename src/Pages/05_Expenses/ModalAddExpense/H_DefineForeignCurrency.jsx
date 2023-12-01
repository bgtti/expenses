import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { PropTypes } from "prop-types";
import { divideWithPrecision, multiplyWithPrecision } from "../../../utils/precisionCalculations";
import { manageTrailingZeroesInDecimals } from "../../../utils/calculationHelpers"
import currency_list from "../../../Data/currencyList";

//Only use precision calculations in this component
//Given 2 inputs, the component will suggest the third. Form validity checked when values update.
// - Exchange rate = converted currency (user's base currency) / original currency
// - Original currency = converted currency (user's base currency) / exchange rate
// - Converted currency (user's base currency) = original currency * exchange rate

// Test: original currency = 2200 and exchange rate = 1.1625, converted currency should be 2557.50.
//       converted currency = 63.10 and exchange rate is 0.631, original currency should be 100.00
//       converted currency = 100.00 and original currency = 561.67, exchange rate should be 0.17804049
// use edge cases to test as well, eg: iranian rial versus Kuwaiti Dinar
// CH uses the following exchange rates: https://www.bazg.admin.ch/bazg/en/home/services/services-firmen/services-firmen_einfuhr-ausfuhr-durchfuhr/devisenkurse-verkauf.html

function DefineForeignCurrency(props) {
    const { enteredAmount, setAmount, isForeignCurrency, setForeignCurrency } = props;

    const selectedWorkspaceCurrency = useSelector((state) => state.selectedWorkspace.selectedWorkspace.currency);

    const [suggestedExpenseAmount, setSuggestedExpenseAmount] = useState("");

    useEffect(() => {
        if (isForeignCurrency.expenseAmountChanged === true) {
            setForeignCurrency(prevState => ({
                ...prevState,
                expenseAmountChanged: false,
            }));
            isForeignOnBlurHandler();
        }
    }, [isForeignCurrency.expenseAmountChanged]);

    function isForeignOnBlurHandler() {
        if (isForeignCurrency.isForeign) {
            if (enteredAmount !== "" && isForeignCurrency.amount !== "" && isForeignCurrency.exchangeRate === "") {
                //if amount set and original amount set, but no exchange rate, set exchange rate = converted amount / original amount
                let newExRate = divideWithPrecision(enteredAmount, isForeignCurrency.amount, 8);
                //if exchange rate with 8 decimal points have trailing zeroes, remove them. Set exchange rate to a minimum of 4 decimals
                let newRateWithoutTrailing = manageTrailingZeroesInDecimals(newExRate, 4);
                setForeignCurrency(prevState => ({
                    ...prevState,
                    exchangeRate: newRateWithoutTrailing,
                    isValid: true,
                }));
            } else if (enteredAmount !== "" && isForeignCurrency.amount === "" && isForeignCurrency.exchangeRate !== "") {
                //if amount set and exchange rate set, but no original amount set, set original amount = converted amount/exchange rate
                //let originalAmount = divideWithPrecision(enteredAmount, isForeignCurrency.exchangeRate, 2);
                let originalAmount = divideWithPrecision(enteredAmount, isForeignCurrency.exchangeRate, 2);
                setForeignCurrency(prevState => ({
                    ...prevState,
                    amount: originalAmount,
                    isValid: true,
                }));
            } else if (enteredAmount === "" && isForeignCurrency.amount !== "" && isForeignCurrency.exchangeRate !== "") {
                //if original amount set and exchange rate set, but no amount: suggest converted amount = original amount * exchange rate and show button to set this as amount.
                let suggestExpenseAmount = multiplyWithPrecision(isForeignCurrency.amount, isForeignCurrency.exchangeRate, 2);
                setSuggestedExpenseAmount(suggestExpenseAmount)
            } else {
                //check if isForeignCurrency is valid
                if (enteredAmount !== "" && isForeignCurrency.amount !== "" && isForeignCurrency.exchangeRate !== "") {
                    let expenseAmount = multiplyWithPrecision(isForeignCurrency.amount, isForeignCurrency.exchangeRate, 2);
                    setForeignCurrency(prevState => ({
                        ...prevState,
                        isValid: (expenseAmount === parseFloat(enteredAmount).toFixed(2)),
                    }));
                    let suggestion = (expenseAmount === parseFloat(enteredAmount).toFixed(2)) ? "" : expenseAmount;
                    setSuggestedExpenseAmount(suggestion);
                } else {
                    setForeignCurrency(prevState => ({
                        ...prevState,
                        isValid: false,
                    }));
                    setSuggestedExpenseAmount("");
                }
            }
        }
    }

    function isForeignChangeHandler(e) {
        setForeignCurrency({
            isForeign: e.target.checked,
            currency: "",
            amount: "",
            exchangeRate: "",
            isValid: true,
            expenseAmountChanged: false,
        });
    }

    function currencyChangeHandler(e) {
        setForeignCurrency(prevState => ({
            ...prevState,
            currency: e.target.value,
        }));
    }

    function amountChangeHandler(e) {
        setForeignCurrency(prevState => ({
            ...prevState,
            amount: e.target.value,
        }));
    }

    function exchangeRateChangeHandler(e) {
        setForeignCurrency(prevState => ({
            ...prevState,
            exchangeRate: e.target.value[0] === "." ? `0${e.target.value}` : e.target.value,
        }));
    }

    function setExpenseAmount() {
        setAmount(suggestedExpenseAmount);
        setForeignCurrency(prevState => ({
            ...prevState,
            isValid: true,
        }));
        setSuggestedExpenseAmount("");
    }


    return (
        <div>
            <div className="Modal-CheckboxContainer">
                <input checked={isForeignCurrency.isForeign} id="selectForeignCurrency" name="selectForeignCurrency" onChange={isForeignChangeHandler} type="checkbox" value="selectForeignCurrency" />
                <label htmlFor="selectForeignCurrency"> Original amount in foreign currency</label>
            </div>
            {
                isForeignCurrency.isForeign && (
                    <div className="Modal-DropdownContainerForFurtherInput">
                        <div className="Modal-InputContainer-Dropdown">
                            <label htmlFor="foreignCurrency">Original currency:*</label>
                            <select id="foreignCurrency" name="foreignCurrency" onChange={currencyChangeHandler} value={isForeignCurrency.currency}>
                                <option key={-1} value="">(select an option)</option>
                                {currency_list.map((currency, index) => (
                                    <option key={index} value={currency.code}>{currency.code} ({currency.name})</option>
                                ))}
                            </select>
                        </div>
                        {
                            isForeignCurrency.currency !== "" && (
                                <>
                                    <div className="Modal-InputContainer-Dropdown">
                                        <label htmlFor="setAmount">Original amount:</label>
                                        <input type="number" id="setAmount" name="setAmount" value={isForeignCurrency.amount} onChange={amountChangeHandler} onBlur={isForeignOnBlurHandler} />
                                    </div>
                                    <div className="Modal-InputContainer-Dropdown">
                                        <label htmlFor="exchangeRate">Exchange rate:</label>
                                        <input type="number" id="exchangeRate" name="exchangeRate" value={isForeignCurrency.exchangeRate} onChange={exchangeRateChangeHandler} onBlur={isForeignOnBlurHandler} />
                                    </div>
                                    <div>
                                        <p>1 {selectedWorkspaceCurrency} = {!isForeignCurrency.exchangeRate ? "0" : isForeignCurrency.exchangeRate} {isForeignCurrency.currency}</p>
                                    </div>
                                    {
                                        enteredAmount === "" && isForeignCurrency.exchangeRate !== "" && isForeignCurrency.amount !== "" && (
                                            <div>
                                                <p>{suggestedExpenseAmount} {selectedWorkspaceCurrency} = {isForeignCurrency.exchangeRate} × {isForeignCurrency.amount} {isForeignCurrency.currency}</p>
                                                <button type="button" className="Modal-PrimaryBtn" onClick={setExpenseAmount}>Set expense amount to {suggestedExpenseAmount}</button>
                                            </div>
                                        )
                                    }
                                    {
                                        enteredAmount !== "" && isForeignCurrency.exchangeRate !== "" && isForeignCurrency.amount !== "" && !isForeignCurrency.isValid && (
                                            <div>
                                                <p>Check your input: {enteredAmount} {selectedWorkspaceCurrency} ≠ {isForeignCurrency.exchangeRate} × {isForeignCurrency.amount} {isForeignCurrency.currency}</p>
                                                <p>Suggestion: {suggestedExpenseAmount} {selectedWorkspaceCurrency} = {isForeignCurrency.exchangeRate} × {isForeignCurrency.amount} {isForeignCurrency.currency}</p>
                                                <button type="button" className="Modal-PrimaryBtn" onClick={setExpenseAmount}>Set expense amount to {suggestedExpenseAmount}</button>
                                            </div>
                                        )
                                    }
                                </>
                            )
                        }
                    </div>
                )
            }
        </div>
    );
}

DefineForeignCurrency.propTypes = {
    enteredAmount: PropTypes.string.isRequired,
    setAmount: PropTypes.func.isRequired,
    isForeignCurrency: PropTypes.object.isRequired,
    setForeignCurrency: PropTypes.func.isRequired,
};

export default DefineForeignCurrency;