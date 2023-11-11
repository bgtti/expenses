import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Select from 'react-select'
import Tag from "../../Components/Tag";
import ExpensesData from "../../Data/ExpenseData"
import ModalWrapper from "../../Components/ModalWrapper";
import closeIcon from "../../Assets/Images/close.png" //Source: Close icons created by Pixel perfect - Flaticon, available at https://www.flaticon.com/free-icons/close
import "../../Assets/Styles/Modal.css"

function ModalAddExpense(props) {
    const styleClasses = 'ModalAddExpense ' + props.className;
    const selectedWorkspace = useSelector((state) => state.selectedWorkspace.selectedWorkspace);
    const selectedWorkspaceGroups = useSelector((state) => state.selectedWorkspace.selectedWorkspaceGroups);
    const selectedWorkspaceAccounts = useSelector((state) => state.selectedWorkspace.selectedWorkspaceAccounts);
    const selectedWorkspaceTags = useSelector((state) => state.selectedWorkspace.selectedWorkspaceTags);
    const selectedWorkspaceExpenseCategories = useSelector((state) => state.selectedWorkspace.selectedWorkspaceExpenseCategories);
    const [enteredDate, setDate] = useState(new Date().toISOString().substring(0, 10));
    const [enteredDescription, setDescription] = useState('');
    const [enteredAmount, setAmount] = useState('');
    const [enteredProject, setProject] = useState('');
    const [enteredType, setType] = useState('');
    const [enteredAccount, setAccount] = useState('');
    const [selectTagOptions, setSelectTagOptions] = useState('');
    const [periodSelected, setperiodSelected] = useState(false);
    const [periodStart, setPeriodStart] = useState('');
    const [periodEnd, setPeriodEnd] = useState('');
    const [isRecurringSelected, setIsRecurringSelected] = useState(false);
    const [isRecurringInterval, setIsRecurringInterval] = useState('monthly');
    const [isRecurringPeriod, setIsRecurringPeriod] = useState('current');
    // console.log(new Date(new Date(enteredDate.getFullYear), new Date(enteredDate.getFullMonth), 1))

    //Show available tags as options in Select element 
    useEffect(() => {
        if (selectedWorkspaceTags && selectedWorkspaceTags.length != 0) {
            let tagOptions = []
            selectedWorkspaceTags.forEach(tag => {
                let tagObj = {
                    value: tag.name,
                    label: <div className="Expense-ModalAddExpense-TagDiv"><Tag colour={tag.colour} name={tag.name}></Tag><br /></div>
                };
                tagOptions.push(tagObj)
            })
            setSelectTagOptions(tagOptions)
        }
    }, [selectedWorkspaceTags])

    //Set period start and period end
    useEffect(() => {
        const theDate = new Date(enteredDate)
        if (theDate && !isNaN(theDate)) {
            const theDateStart = new Date(theDate.getFullYear(), theDate.getMonth(), 2)
            setPeriodStart(theDateStart.toISOString().substring(0, 10))
            let theDateEnd = new Date(theDate.getFullYear(), theDate.getMonth() + 1, 1)
            setPeriodEnd(theDateEnd.toISOString().substring(0, 10))
        }
    }, [enteredDate])

    function dateChangeHandler(e) {
        setDate(e.target.value);
    }
    function descriptionChangeHandler(e) {
        setDescription(e.target.value);
    }
    function amountChangeHandler(e) {
        setAmount(e.target.value);
    }
    function periodStartChangeHandler(e) {
        setPeriodStart(e.target.value);
    }
    function periodEndChangeHandler(e) {
        setPeriodEnd(e.target.value);
    }
    function periodSelectedHandler(event) {
        if (event.target.checked) {
            setperiodSelected(true);
        } else {
            setperiodSelected(false);
        }
    }
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







    function projectChangeHandler(e) {
        setProject(e.target.value);
    }
    function typeChangeHandler(e) {
        setType(e.target.value);
    }
    function accountChangeHandler(e) {
        setAccount(e.target.value);
    }
    function closeThisModal() {
        props.addExpenseModalToggler("close");
        setDate('');
        setDescription('');
        setAmount('');
        setProject('');
        setType('');
        setAccount('');
    }
    async function getUniqueInvoiceNr(theDate) {
        let invoicePrefix = `${theDate.getFullYear().toString().slice(-2)}-${("0" + (theDate.getMonth() + 1)).slice(-2)}`;
        let invoiceNrCounter = 1;
        let tentativeNum = "00" + ((ExpensesData.filter(e => e.exNr.includes(invoicePrefix)).length) + invoiceNrCounter);
        if (parseInt(tentativeNum) < 1000) { tentativeNum.slice(-3) };

        let tentativeInvoiceNum = `${invoicePrefix}-${tentativeNum}`;

        if (ExpensesData.filter(e => e.exNr === tentativeInvoiceNum).length === 0) {
            return tentativeInvoiceNum;

        } else {
            let arrayOfInvoiceNums = (ExpensesData.filter(e => e.exNr.includes(invoicePrefix))).map((e) => { return parseInt(e.exNr.slice(6)) });
            let greatestInvoiceNum = Math.max(...arrayOfInvoiceNums);

            tentativeNum = "00" + (greatestInvoiceNum + 1);
            if (parseInt(tentativeNum) < 1000) { tentativeNum.slice(-3) };
            tentativeInvoiceNum = `${invoicePrefix}-${tentativeNum}`;

            return tentativeInvoiceNum;
        }
    }

    async function getUniqueExpenseNr() {
        let arrayOfExpenseNums = ExpensesData.map((e) => { return parseInt(e.id.slice(2)) });
        let getBiggestNr = Math.max(...arrayOfExpenseNums);
        let newExpNr = `ex${getBiggestNr + 1}`;
        return newExpNr;
    }

    async function formSubmitHandler(e) {
        e.preventDefault();
        const newExpense = {
            id: 'X', // defined bellow
            exDate: new Date(enteredDate),
            exNr: 'X', //defined bellow
            exDescription: enteredDescription,
            exAmount: enteredAmount,
            project: enteredProject, //dont forget to account for "" ********************
            type: enteredType, //dont forget to account for "" *****************
            account: enteredAccount
        }
        let expenseNr = await getUniqueExpenseNr();
        newExpense.id = expenseNr;

        let invoiceNr = await getUniqueInvoiceNr(newExpense.exDate);
        newExpense.exNr = invoiceNr;

        ExpensesData.push(newExpense);

        console.log(ExpensesData);

        //next part to be replaced with closeThisModal:
        setDate("");
        setDescription("");
        setAmount("");
        setProject(""); //project and type wont reset and jsx, fix
        setType("");
        setAccount("");
    }

    return (
        <ModalWrapper className={styleClasses}>
            <form className="Modal-Container" onSubmit={formSubmitHandler}>
                <div className="Modal-Heading">
                    <h2>Add Expense</h2>
                    <div>
                        <img src={closeIcon} alt="close modal" className="Modal-CloseModalIcon" onClick={closeThisModal} />
                    </div>
                </div>
                <div className="Modal-InputContainer">
                    <label htmlFor="expenseDate">Date:</label>
                    <input id="expenseDate" name="expenseDate" type="date" value={enteredDate} onChange={dateChangeHandler} />
                </div>
                <div className="Modal-InputContainer">
                    <label htmlFor="expenseDescription">Description:</label>
                    <input id="expenseDescription" name="expenseDescription" type="text" minLength="1" maxLength="100" value={enteredDescription} onChange={descriptionChangeHandler} />
                </div>
                <div className="Modal-InputContainer">
                    <label htmlFor="expenseAmount">Amount:</label>
                    <input id="expenseAmount" name="expenseAmount" type="number" min="0.01" step="0.01"
                        value={enteredAmount} onChange={amountChangeHandler} />
                </div>
                <div className="Modal-InputContainer">
                    <label htmlFor="category">Expense category:</label>
                    <select className="Modal-SelectElement" name="category" id="category" onChange={typeChangeHandler} value={enteredType === "" ? "Other" : enteredType} disabled={!selectedWorkspaceExpenseCategories || selectedWorkspaceExpenseCategories.length === 0}>
                        {
                            (!selectedWorkspaceExpenseCategories || selectedWorkspaceExpenseCategories.length === 0) ?
                                (<option value="">no category</option>) :
                                (selectedWorkspaceExpenseCategories.map((category, index) => (
                                    <option key={index} value={category.uuid}>{category.name}</option>
                                )))
                        }
                    </select>
                </div>
                <div className="Modal-InputContainer">
                    <label htmlFor="group">Assign to group:</label>
                    <select name="group" id="group" onChange={projectChangeHandler} value={enteredProject === "" ? "Project 1" : enteredProject} disabled={!selectedWorkspaceGroups || selectedWorkspaceGroups.length === 0}>
                        {
                            (!selectedWorkspaceGroups || selectedWorkspaceGroups.length === 0) ?
                                (<option value="">no groups</option>) :
                                (selectedWorkspaceGroups.map((group, index) => (
                                    <option key={index} value={group.uuid}>{group.name}</option>
                                )))
                        }
                    </select>
                </div>
                <div className="Modal-InputContainer">
                    <label htmlFor="account">Account:</label>
                    <select name="account" id="account" onChange={accountChangeHandler} value={enteredAccount === "" ? "Bank" : enteredAccount} disabled={!selectedWorkspaceAccounts || selectedWorkspaceAccounts.length === 0}>
                        {
                            (!selectedWorkspaceAccounts || selectedWorkspaceAccounts.length === 0) ?
                                (<option value="" >no accounts</option>) :
                                (selectedWorkspaceAccounts.map((account, index) => (
                                    <option key={index} value={account.uuid}>{account.name}</option>
                                )))
                        }
                    </select>
                </div>
                <div className="Modal-InputContainer">
                    <label htmlFor="tag">Add tags:</label>
                    {
                        (!selectedWorkspaceTags || selectedWorkspaceTags.length === 0) ?
                            (
                                <select name="tag" id="tag" value="" disabled>
                                    <option value="">no tags</option>
                                </select>
                            ) :
                            (
                                <Select className="basic-single"
                                    classNamePrefix="select Modal-MultiSelect-Select" isClearable={true}
                                    theme={(theme) => ({
                                        ...theme,
                                        borderRadius: 0,
                                        colors: {
                                            ...theme.colors,
                                            primary25: '#f1f2f7',
                                            primary: 'black',
                                        },
                                    })} options={selectTagOptions} isMulti />
                            )
                    }
                </div>
                <div>
                    <div className="Modal-CheckboxContainer">
                        <input type="checkbox" id="selectPeriod" name="selectPeriod" value="selectPeriod" checked={periodSelected} onChange={periodSelectedHandler} />
                        <label htmlFor="selectPeriod"> Define Period</label>
                    </div>
                    {periodSelected && (
                        <div className="Modal-DropdownContainerForFurtherInput">
                            <div className="Modal-InputContainer-Dropdown">
                                <label htmlFor="periodFrom">From:</label>
                                <input type="date" id="periodFrom" name="periodFrom" value={periodStart} onChange={periodStartChangeHandler} />
                            </div>
                            <div className="Modal-InputContainer-Dropdown">
                                <label htmlFor="periodTo">To:</label>
                                <input type="date" id="periodTo" name="periodTo" value={periodEnd} onChange={periodEndChangeHandler} />
                            </div>
                        </div>
                    )}
                </div>
                <div>
                    <div className="Modal-CheckboxContainer">
                        <input type="checkbox" id="selectRecurring" name="selectRecurring" value="selectRecurring" checked={isRecurringSelected} onChange={isRecurringSelectedHandler} />
                        <label htmlFor="selectPeriod"> Expense is recurring</label>
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
                                    <label htmlFor="pre">pre-date</label>
                                </div>
                                <div className="Modal-RadioBtnContainer">
                                    <input type="radio" id="current" name="current" value="current" checked={isRecurringPeriod === 'current'} onChange={isRecurringPeriodHandler} />
                                    <label htmlFor="current">current</label>
                                </div>
                                <div className="Modal-RadioBtnContainer">
                                    <input type="radio" id="post" name="post" value="post" checked={isRecurringPeriod === 'post'} onChange={isRecurringPeriodHandler} />
                                    <label htmlFor="post">post-date</label>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                <button type="submit" className="Modal-PrimaryBtn" onClick={closeThisModal}>Add expense</button>
            </form>
        </ModalWrapper >
    )
}

export default ModalAddExpense;
