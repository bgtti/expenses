import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
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

    const selectedWorkspaceCurrency = useSelector((state) => state.selectedWorkspace.selectedWorkspace.currency);

    const [isForeignCurrency, setForeignCurrency] = useState({
        isForeign: false,
        currency: "",
        amount: "",
        exchangeRate: "",
        isValid: true, // false if isForeign is true but no input on other statements
    });

    const [showSetAmountBtn, setShowSetAmountBtn] = useState(false);

    useEffect(() => {
        if (isForeignCurrency.isForeign) {
            if (enteredAmount !== "" && isForeignCurrency.amount !== "" && isForeignCurrency.exchangeRate === "") {
                //if amount set and original amount set, but no exchange rate, set exchange rate = amount/original amount
                //division, 8 digs after dot. unless too many 0 digits...?
                // const suggestExchangeRate = divideWithPrecision()
            } else if (enteredAmount !== "" && isForeignCurrency.amount === "" && isForeignCurrency.exchangeRate !== "") {
                //if amount set and exchange rate set, but no original amount set, set original amount = amount/exchange rate
            } else if (enteredAmount === "" && isForeignCurrency.amount !== "" && isForeignCurrency.exchangeRate !== "") {
                //if original amount set and exchange rate set, but no amount: suggest amount = original amount * exchange rate and show button to set this as amount.
                setShowSetAmountBtn(true);
            } else {
                //check if isForeignCurrency is valid
            }
        }

    }, [enteredAmount, isForeignCurrency.amount, isForeignCurrency.exchangeRate]);

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
                                        <input type="number" id="setAmount" name="setAmount" value={isForeignCurrency.amount} onChange={amountChangeHandler} />
                                    </div>
                                    <div className="Modal-InputContainer-Dropdown">
                                        <label htmlFor="exchangeRate">Exchange rate:</label>
                                        <input type="number" id="exchangeRate" name="exchangeRate" value={isForeignCurrency.exchangeRate} onChange={exchangeRateChangeHandler} />
                                    </div>
                                    <div>
                                        <p>1 {selectedWorkspaceCurrency} = X {isForeignCurrency.currency}</p>
                                    </div>
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
};

export default DefineForeignCurrency;