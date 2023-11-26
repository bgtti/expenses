import React, { useState, useEffect } from "react";
import { PropTypes } from "prop-types";
import { divideWithPrecision } from "../../../utils/precisionCalculations";
import currency_list from "../../../Data/currencyList";

//Missing: user should be able to input either an exchange rate or amount
//Perhaps allow for entered amount to be changed according to exchange rate would make sense
// Calculations should be such that Transaction currency = base currency / exchange rate
// So: if base currency is CHF:
// 555 BRL and 100CHF means an exchange rate of 5.55
// 2200eur at 1.1625 rate lead to 2557.5chf while the same amount at 1.1525 should be 1.1525
// use edge cases to test as well, eg: iranian rial versus Kuwaiti Dinar
//CH uses the following exchange rates: https://www.bazg.admin.ch/bazg/en/home/services/services-firmen/services-firmen_einfuhr-ausfuhr-durchfuhr/devisenkurse-verkauf.html
// use divideWithPrecision for calculations, and check the following:
// chf 100 to 1.11 to get amount in gbp. then, try to get the value of chf from the result...

function DefineForeignCurrency(props) {
    const { enteredAmount } = props;

    const [isForeignCurrency, setForeignCurrency] = useState({
        isForeign: false,
        currency: "",
        amount: "",
        exchangeRate: "",
        useAmount: true, // Added state for user's choice
    });

    const [exchangeRate, setExchangeRate] = useState("");

    useEffect(() => {
        // Calculate and set the exchange rate when the foreign amount or currency changes
        if (isForeignCurrency.isForeign && isForeignCurrency.currency && isForeignCurrency.amount && isForeignCurrency.useAmount) {
            const foreignAmount = parseFloat(isForeignCurrency.amount);
            const userAmount = parseFloat(enteredAmount);

            if (!isNaN(foreignAmount) && !isNaN(userAmount) && userAmount !== 0) {
                const calculatedExchangeRate = foreignAmount / userAmount;
                setExchangeRate(calculatedExchangeRate.toFixed(4));
            }
        } else if (isForeignCurrency.isForeign && isForeignCurrency.currency && isForeignCurrency.exchangeRate && !isForeignCurrency.useAmount) {
            const enteredExchangeRate = parseFloat(isForeignCurrency.exchangeRate);

            if (!isNaN(enteredExchangeRate) && enteredExchangeRate !== 0) {
                const calculatedAmount = enteredExchangeRate * parseFloat(enteredAmount);
                setForeignCurrency(prevState => ({ ...prevState, amount: calculatedAmount.toFixed(2) }));
            }
        } else {
            setExchangeRate("");
        }
    }, [isForeignCurrency.isForeign, isForeignCurrency.currency, isForeignCurrency.amount, isForeignCurrency.exchangeRate, enteredAmount, isForeignCurrency.useAmount]);

    function isForeignChangeHandler(e) {
        setForeignCurrency(prevState => ({
            ...prevState,
            isForeign: e.target.checked,
        }));
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
            exchangeRate: e.target.value,
        }));
    }

    function toggleUseAmountHandler(e) {
        setForeignCurrency(prevState => ({
            ...prevState,
            useAmount: !prevState.useAmount,
        }));
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
                            <label htmlFor="foreignCurrency">Original currency:</label>
                            <select id="foreignCurrency" name="foreignCurrency" onChange={currencyChangeHandler} value={isForeignCurrency.currency}>
                                <option key={-1} value="">(select an option)</option>
                                {currency_list.map((currency, index) => (
                                    <option key={index} value={currency.code}>{currency.code} ({currency.name})</option>
                                ))}
                            </select>
                        </div>
                        <div className="Modal-InputContainer-Dropdown">
                            {isForeignCurrency.useAmount ? (
                                <>
                                    <label htmlFor="setAmount">Original amount:</label>
                                    <input type="number" id="setAmount" name="setAmount" value={isForeignCurrency.amount} onChange={amountChangeHandler} />
                                </>
                            ) : (
                                <>
                                    <label htmlFor="exchangeRate">Exchange Rate:</label>
                                    <input type="number" id="exchangeRate" name="exchangeRate" value={isForeignCurrency.exchangeRate} onChange={exchangeRateChangeHandler} />
                                </>
                            )}
                        </div>
                        <div>
                            {/* Display exchange rate */}
                            {exchangeRate && <p>Exchange Rate: {exchangeRate}</p>}
                        </div>
                        <div>
                            <input type="checkbox" id="useAmount" name="useAmount" checked={isForeignCurrency.useAmount} onChange={toggleUseAmountHandler} />
                            <label htmlFor="useAmount"> Use Amount</label>
                        </div>
                    </div>
                )
            }
        </div>
    );
}

DefineForeignCurrency.propTypes = {
    enteredAmount: PropTypes.string.isRequired,
};

export default DefineForeignCurrency;