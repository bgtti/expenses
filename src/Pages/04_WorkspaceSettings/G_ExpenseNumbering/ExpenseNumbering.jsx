import React, { lazy, Suspense, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Loader from "../../../Components/Loader";
import AddButton from "../../../Components/AddButton";
import trashIcon from '../../../Assets/Images/trash.png' // Source: Delete icons created by bqlqn - Flaticon, from https://www.flaticon.com/free-icons/delete
import editIcon from '../../../Assets/Images/editing.png' // Modify icons created by Freepik - Flaticon, from https://www.flaticon.com/free-icons/modify
import AddIcon from "../../../Assets/Images/add.png"; //Source: Plus icons created by dmitri13 - Flaticon, at https://www.flaticon.com/free-icons/plus
import "../../../Assets/Styles/Common.css"

const ModalSetExpenseNumbering = lazy(() => import("./ModalSetExpenseNumbering"));

//Constants:
const THIS_YEAR = (new Date().getFullYear()).toString();
const THIS_MONTH = (new Date().getMonth() + 1).toString()

function ExpenseNumbering() {
    const selectedWorkspaceExpenseNumberingFormat = useSelector((state) => state.selectedWorkspace.selectedWorkspaceExpenseNumberingFormat);
    const [modalSetExpenseNumberingStatus, setModalSetExpenseNumberingStatus] = useState(false);
    const [currentNumFormatState, setCurrentNumFormat] = useState('2023-01-0001');

    useEffect(() => {
        let currPrefix = null;
        if (selectedWorkspaceExpenseNumberingFormat.number_custom_prefix) {
            currPrefix = selectedWorkspaceExpenseNumberingFormat.number_custom_prefix;
        }
        let currYear;
        if (selectedWorkspaceExpenseNumberingFormat.number_format === "YMN" || selectedWorkspaceExpenseNumberingFormat.number_format === "YN") {
            currYear = (selectedWorkspaceExpenseNumberingFormat.number_year_digits === 4 ? THIS_YEAR : THIS_YEAR.slice(-2))
        } else {
            currYear = null;
        }
        let currMonth = (selectedWorkspaceExpenseNumberingFormat.number_format === "YMN" ? THIS_MONTH : null)
        let currSeparator = selectedWorkspaceExpenseNumberingFormat.number_separator;
        let startNum = selectedWorkspaceExpenseNumberingFormat.number_start;
        let numDigitsSelected = selectedWorkspaceExpenseNumberingFormat.number_digits;
        let currNum;
        if (startNum > 1) {
            let startNumString = startNum.toString()
            if (startNumString.length >= parseInt(numDigitsSelected)) {
                currNum = startNumString
            } else {
                let numZeroes = parseInt(numDigitsSelected) - startNumString.length
                currNum = `${"0".repeat(numZeroes)}${startNumString}`;
            }
        } else {
            currNum = `${"0".repeat(parseInt(numDigitsSelected) - 1)}1`;
        }
        let currentFormat = `${currPrefix ? currPrefix + currSeparator : ""}${currYear ? currYear + currSeparator : ""}${currMonth ? currMonth + currSeparator : ""}${currNum}`;
        setCurrentNumFormat(currentFormat);
    }, [selectedWorkspaceExpenseNumberingFormat])

    function expenseNumberingModalToggler(openOrClose) {
        openOrClose === "close" ? setModalSetExpenseNumberingStatus(false) : setModalSetExpenseNumberingStatus(true);
    }


    return (
        <>
            <Suspense fallback={<Loader />}>
                {
                    modalSetExpenseNumberingStatus && (
                        <ModalSetExpenseNumbering
                            className={modalSetExpenseNumberingStatus === false ? "Common-hidden" : ""}
                            expenseNumberingModalToggler={expenseNumberingModalToggler}>
                        </ModalSetExpenseNumbering>
                    )
                }
            </Suspense>
            <div>
                <h4>Expense numbering</h4>
                <p>Current format: {currentNumFormatState}</p>
                <AddButton name="Edit Expense Numbering" className="Common-button-secondary" onClickFunction={expenseNumberingModalToggler}>
                    <img src={editIcon} alt="edit element" className="Common-Icon-light" />
                </AddButton>
            </div>
        </>
    )

}
export default ExpenseNumbering;