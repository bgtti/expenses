import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Tag from "../../Components/Tag";
import ModalEditWorkspace from "../User/ModalEditWorkspace/ModalEditWorkspace";
import ModalAddGroup from "./ModalAddGroup";
import ModalAddAccount from "./ModalAddAccount";
import ModalAddTag from "./ModalAddTag";
import ModalEditTag from "./ModalEditTag";
import ModalAddExpenseCategory from "./ModalAddExpenseCategory";
import ModalEditGroup from "./ModalEditGroup";
import ModalEditAccount from "./ModalEditAccount"
import ModalEditExpenseCategory from "./ModalEditExpenseCategory";
import ModalDeleteGroup from "./ModalDeleteGroup";
import ModalDeleteAccount from "./ModalDeleteAccount";
import ModalDeleteTag from "./ModalDeleteTag";
import ModalDeleteExpenseCategory from "./ModalDeleteExpenseCategory";
import ModalSetExpenseNumbering from "./ModalSetExpenseNumbering";
//import { ExpenseNumberingFormat } from "../../constants/enums";
import AddButton from "../../Components/AddButton";
import trashIcon from '../../Assets/Images/trash.png' // Source: Delete icons created by bqlqn - Flaticon, from https://www.flaticon.com/free-icons/delete
import editIcon from '../../Assets/Images/editing.png' // Modify icons created by Freepik - Flaticon, from https://www.flaticon.com/free-icons/modify
import AddIcon from "../../Assets/Images/add.png"; //Source: Plus icons created by dmitri13 - Flaticon, at https://www.flaticon.com/free-icons/plus
import "./WorkspaceSettings.css";
import "../../Assets/Styles/Common.css"

const THIS_YEAR = (new Date().getFullYear()).toString();
const THIS_MONTH = (new Date().getMonth() + 1).toString()

function WorkspaceSettings() {
    // Note the word 'account' bellow refers to the object belonging to the WS, not the user's account
    const selectedWorkspace = useSelector((state) => state.selectedWorkspace.selectedWorkspace);
    const selectedWorkspaceGroups = useSelector((state) => state.selectedWorkspace.selectedWorkspaceGroups);
    const selectedWorkspaceAccounts = useSelector((state) => state.selectedWorkspace.selectedWorkspaceAccounts);
    const selectedWorkspaceTags = useSelector((state) => state.selectedWorkspace.selectedWorkspaceTags);
    const selectedWorkspaceExpenseCategories = useSelector((state) => state.selectedWorkspace.selectedWorkspaceExpenseCategories);
    const selectedWorkspaceExpenseNumberingFormat = useSelector((state) => state.selectedWorkspace.selectedWorkspaceExpenseNumberingFormat);
    const [currentNumFormatState, setCurrentNumFormat] = useState('2023-01-0001');
    const [modalEditWorkspaceStatus, setModalEditWorkspaceStatus] = useState(false);
    const [modalAddGroupStatus, setModalAddGroupStatus] = useState(false);
    const [modalAddAccountStatus, setModalAddAccountStatus] = useState(false);
    const [modalAddTagStatus, setModalAddTagStatus] = useState(false);
    const [modalAddExpenseCategoryStatus, setModalAddExpenseCategoryStatus] = useState(false);
    const [modalEditGroupStatus, setModalEditGroupStatus] = useState(false);
    const [modalEditAccountStatus, setModalEditAccountStatus] = useState(false);
    const [modalEditTagStatus, setModalEditTagStatus] = useState(false);
    const [modalEditExpenseCategoryStatus, setModalEditExpenseCategoryStatus] = useState(false);
    const [modalSetExpenseNumberingStatus, setModalSetExpenseNumberingStatus] = useState(false);
    //const [workspaceToEditUuid, setGroupToEditUuid] = useState("");
    const [groupToEditUuid, setGroupToEditUuid] = useState("");
    const [accountToEditUuid, setAccountToEditUuid] = useState("");
    const [tagToEditUuid, setTagToEditUuid] = useState("");
    const [expenseCategoryToEditUuid, setExpenseCategoryToEditUuid] = useState("");
    const [modalDeleteGroupStatus, setModalDeleteGroupStatus] = useState(false);
    const [modalDeleteAccountStatus, setModalDeleteAccountStatus] = useState(false);
    const [modalDeleteTagStatus, setModalDeleteTagStatus] = useState(false);
    const [modalDeleteExpenseCategoryStatus, setModalDeleteExpenseCategoryStatus] = useState(false);
    const [groupToDeleteUuid, setGroupToDeleteUuid] = useState("");
    const [accountToDeleteUuid, setAccountToDeleteUuid] = useState("");
    const [tagToDeleteUuid, setTagToDeleteUuid] = useState("");
    const [expenseCategoryToDeleteUuid, setExpenseCategoryToDeleteUuid] = useState("");

    useEffect(() => {
        if (modalEditGroupStatus === false) {
            setGroupToEditUuid("");
        }
    }, [modalEditGroupStatus])

    useEffect(() => {
        if (modalEditAccountStatus === false) {
            setAccountToEditUuid("");
        }
    }, [modalEditAccountStatus])

    useEffect(() => {
        if (modalEditTagStatus === false) {
            setTagToEditUuid("");
        }
    }, [modalEditTagStatus])

    useEffect(() => {
        if (modalEditExpenseCategoryStatus === false) {
            setExpenseCategoryToEditUuid("");
        }
    }, [modalEditExpenseCategoryStatus])

    // useEffect bellow used to display the current expense numbering format used in workspace
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
        let currMonth = (selectedWorkspaceExpenseNumberingFormat.number_format == "YMN" ? THIS_MONTH : null)
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

    // Togglers for add, edit, and delete modals
    function addGroupModalToggler(openOrClose) {
        openOrClose === "close" ? setModalAddGroupStatus(false) : setModalAddGroupStatus(true);
    }
    function addAccountModalToggler(openOrClose) {
        openOrClose === "close" ? setModalAddAccountStatus(false) : setModalAddAccountStatus(true);
    }
    function addTagModalToggler(openOrClose) {
        openOrClose === "close" ? setModalAddTagStatus(false) : setModalAddTagStatus(true);
    }
    function addExpenseCategoryModalToggler(openOrClose) {
        openOrClose === "close" ? setModalAddExpenseCategoryStatus(false) : setModalAddExpenseCategoryStatus(true);
    }
    function editWorkspaceModalToggler(openOrClose) {
        openOrClose === "close" ? setModalEditWorkspaceStatus(false) : setModalEditWorkspaceStatus(true);
    }
    function editGroupModalToggler(openOrClose) {
        openOrClose === "close" ? setModalEditGroupStatus(false) : setModalEditGroupStatus(true);
    }
    function editAccountModalToggler(openOrClose) {
        openOrClose === "close" ? setModalEditAccountStatus(false) : setModalEditAccountStatus(true);
    }
    function editTagModalToggler(openOrClose) {
        openOrClose === "close" ? setModalEditTagStatus(false) : setModalEditTagStatus(true);
    }
    function editExpenseCategoryModalToggler(openOrClose) {
        openOrClose === "close" ? setModalEditExpenseCategoryStatus(false) : setModalEditExpenseCategoryStatus(true);
    }
    function deleteGroupModalToggler(openOrClose) {
        openOrClose === "close" ? setModalDeleteGroupStatus(false) : setModalDeleteGroupStatus(true);
    }
    function deleteAccountModalToggler(openOrClose) {
        openOrClose === "close" ? setModalDeleteAccountStatus(false) : setModalDeleteAccountStatus(true);
    }
    function deleteTagModalToggler(openOrClose) {
        openOrClose === "close" ? setModalDeleteTagStatus(false) : setModalDeleteTagStatus(true);
    }
    function deleteExpenseCategoryModalToggler(openOrClose) {
        openOrClose === "close" ? setModalDeleteExpenseCategoryStatus(false) : setModalDeleteExpenseCategoryStatus(true);
    }
    function expenseNumberingModalToggler(openOrClose) {
        openOrClose === "close" ? setModalSetExpenseNumberingStatus(false) : setModalSetExpenseNumberingStatus(true);
    }
    return (
        <section className={`WorkspaceSettings Common-padding Common-expand-flex-1`}>
            {selectedWorkspace.uuid &&
                (<>
                    <ModalEditWorkspace
                        className={modalEditWorkspaceStatus === false ? "modalEditWorkspaceHidden" : ""}
                        editWorkspaceModalToggler={editWorkspaceModalToggler} uuid={selectedWorkspace.uuid}>
                    </ModalEditWorkspace>
                    <ModalAddGroup
                        className={modalAddGroupStatus === false ? "modalAddGroupHidden" : ""}
                        addGroupModalToggler={addGroupModalToggler}>
                    </ModalAddGroup>
                    <ModalAddAccount
                        className={modalAddAccountStatus === false ? "modalAddAccountHidden" : ""}
                        addAccountModalToggler={addAccountModalToggler}>
                    </ModalAddAccount>
                    <ModalAddTag
                        className={modalAddTagStatus === false ? "modalAddTagHidden" : ""}
                        addTagModalToggler={addTagModalToggler}>
                    </ModalAddTag>
                    <ModalAddExpenseCategory className={modalAddExpenseCategoryStatus === false ? "modalAddExpenseCategoryHidden" : ""}
                        addExpenseCategoryModalToggler={addExpenseCategoryModalToggler}>
                    </ModalAddExpenseCategory>
                </>
                )
            }
            {groupToEditUuid &&
                (
                    <ModalEditGroup
                        className={modalEditGroupStatus === false ? "modalEditGroupHidden" : ""}
                        editGroupModalToggler={editGroupModalToggler} uuid={groupToEditUuid}>
                    </ModalEditGroup>
                )
            }
            {accountToEditUuid &&
                (
                    <ModalEditAccount
                        className={modalEditAccountStatus === false ? "modalEditAccountHidden" : ""}
                        editAccountModalToggler={editAccountModalToggler} uuid={accountToEditUuid}>
                    </ModalEditAccount>
                )
            }
            {tagToEditUuid &&
                (
                    <ModalEditTag
                        className={modalEditTagStatus === false ? "modalEditTagHidden" : ""}
                        editTagModalToggler={editTagModalToggler} uuid={tagToEditUuid}>
                    </ModalEditTag>
                )
            }
            {expenseCategoryToEditUuid &&
                (
                    <ModalEditExpenseCategory
                        className={modalEditExpenseCategoryStatus === false ? "modalEditExpenseCategoryHidden" : ""}
                        editExpenseCategoryModalToggler={editExpenseCategoryModalToggler} uuid={expenseCategoryToEditUuid}>
                    </ModalEditExpenseCategory>
                )
            }
            {groupToDeleteUuid &&
                (
                    <ModalDeleteGroup
                        className={modalDeleteGroupStatus === false ? "modalDeleteGroupHidden" : ""}
                        deleteGroupModalToggler={deleteGroupModalToggler} uuid={groupToDeleteUuid}>
                    </ModalDeleteGroup>
                )
            }
            {accountToDeleteUuid &&
                (
                    <ModalDeleteAccount
                        className={modalDeleteAccountStatus === false ? "modalDeleteAccountHidden" : ""}
                        deleteAccountModalToggler={deleteAccountModalToggler} uuid={accountToDeleteUuid}>
                    </ModalDeleteAccount>
                )
            }
            {tagToDeleteUuid &&
                (
                    <ModalDeleteTag
                        className={modalDeleteTagStatus === false ? "modalDeleteTagHidden" : ""}
                        deleteTagModalToggler={deleteTagModalToggler} uuid={tagToDeleteUuid}>
                    </ModalDeleteTag>
                )
            }
            {expenseCategoryToDeleteUuid &&
                (
                    <ModalDeleteExpenseCategory
                        className={modalDeleteExpenseCategoryStatus === false ? "modalDeleteExpenseCategoryHidden" : ""}
                        deleteExpenseCategoryModalToggler={deleteExpenseCategoryModalToggler} uuid={expenseCategoryToDeleteUuid}>
                    </ModalDeleteExpenseCategory>
                )
            }
            <ModalSetExpenseNumbering
                className={modalSetExpenseNumberingStatus === false ? "modalSetExpenseNumberingHidden" : ""}
                expenseNumberingModalToggler={expenseNumberingModalToggler}>
            </ModalSetExpenseNumbering>

            <h2 className="Common-H2">Workspace Settings</h2>
            {(!selectedWorkspace) ?
                (<section>
                    <h3>Oops, an error occurred.</h3>
                    <p>We could not find your workspace.</p>
                </section>)
                :
                (
                    <>
                        <section>
                            <h3 className="Common-H3">This Workspace</h3>
                            <table className="WorkspaceSettings-WorkspaceInfoTable">
                                <tbody>
                                    <tr>
                                        <th>Name:</th><td>{selectedWorkspace.name}</td>
                                    </tr>
                                    <tr>
                                        <th>Abbrev.:</th><td>{selectedWorkspace.abbreviation.toUpperCase()}</td>
                                    </tr>
                                    <tr>
                                        <th>Currency:</th><td>{selectedWorkspace.currency}</td>
                                    </tr>
                                    <tr>
                                        <th>Access:</th><td><i>you have not shared this workspace with anyone</i></td>
                                    </tr>
                                </tbody>
                            </table>

                            <AddButton name="Edit Workspace" className="Common-button-secondary" onClickFunction={editWorkspaceModalToggler}>
                                <img src={editIcon} alt="edit element" className="WorkspaceSettings-Icon-light" />
                            </AddButton>
                        </section>
                        <hr />
                        <section>
                            <h3 className="Common-H3">General Workspace Settings</h3>
                            <div>
                                <h4 className="Common-H4">Groups</h4>
                                <p>You can group expenses by project, rental property, product, service, or any transactional good your company offers.</p>
                                <AddButton name="Add Group" className="Common-button-primary" onClickFunction={addGroupModalToggler}>
                                    <img src={AddIcon} alt="Add icon" />
                                </AddButton>
                                {
                                    (!selectedWorkspaceGroups) ?
                                        (<p>You have no groups yet.</p>) :
                                        (
                                            <table className="WorkspaceSettings-Table ">
                                                <tbody>
                                                    <tr >
                                                        <th>Group</th>
                                                        <th>Description</th>
                                                        <th>Code</th>
                                                    </tr>
                                                    {selectedWorkspaceGroups.map((group, index) => (
                                                        <tr key={index}>
                                                            <td className="WorkspaceSettings-Table-tdBullet"><div className="WorkspaceSettings-Table-YellowDiv"></div>{group.name}</td>
                                                            <td className={group.description ? "" : "WorkspaceSettings-Table-tdInfo"}>
                                                                {group.description ? group.description : "-"}
                                                            </td>
                                                            <td className={group.description ? "" : "WorkspaceSettings-Table-tdInfo"}>
                                                                {group.code ? group.code : "-"}
                                                            </td>
                                                            <td className="WorkspaceSettings-Table-tdIcon">
                                                                <img role="button" src={editIcon} alt="edit element" className="WorkspaceSettings-Icon"
                                                                    onClick={() => { setGroupToEditUuid(`${group.uuid}`); editGroupModalToggler("open"); }} />
                                                            </td>
                                                            <td className="WorkspaceSettings-Table-tdIcon">
                                                                <img role="button" src={trashIcon} alt="delete element" className="WorkspaceSettings-Icon"
                                                                    onClick={() => { setGroupToDeleteUuid(`${group.uuid}`); deleteGroupModalToggler("open"); }} />
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        )
                                }
                            </div>
                            <br />
                            <div>
                                <h4>Accounts</h4>
                                <p>You can set different accounts, such as 'Bank' or 'Cash' accounts.</p>
                                <AddButton name="Add Account" className="Common-button-primary" onClickFunction={addAccountModalToggler}>
                                    <img src={AddIcon} alt="Add icon" />
                                </AddButton>
                                {
                                    (!selectedWorkspaceAccounts) ?
                                        (<p>You have no accounts yet.</p>) :
                                        (
                                            <ul className="WorkspaceSettings-List">
                                                {selectedWorkspaceAccounts.map((account, index) => (
                                                    <li className="WorkspaceSettings-ListItem" key={index}>
                                                        <div className="WorkspaceSettings-ListBullet"></div>
                                                        <div>{account.name}</div>
                                                        <img role="button" src={editIcon} alt="edit element" className="WorkspaceSettings-Icon"
                                                            onClick={() => { setAccountToEditUuid(`${account.uuid}`); editAccountModalToggler("open"); }} />
                                                        <img role="button" src={trashIcon} alt="delete element" className="WorkspaceSettings-Icon"
                                                            onClick={() => { setAccountToDeleteUuid(`${account.uuid}`); deleteAccountModalToggler("open"); }} />
                                                    </li>
                                                ))}
                                            </ul>
                                        )
                                }
                            </div>
                            <br />
                            <div>
                                <h4>Tags</h4>
                                <p>You can set colourful description tags.</p>
                                <AddButton name="Add Tag" className="Common-button-primary"
                                    onClickFunction={addTagModalToggler}>
                                    <img src={AddIcon} alt="Add icon" />
                                </AddButton>
                                {
                                    (!selectedWorkspaceTags) ?
                                        (<p>You have no tags yet.</p>) :
                                        (
                                            <ul className="WorkspaceSettings-List">
                                                {selectedWorkspaceTags.map((tag, index) => (
                                                    <li className="WorkspaceSettings-ListItem" key={index}>
                                                        <div className="WorkspaceSettings-ListBullet"></div>
                                                        <Tag colour={tag.colour} name={tag.name}></Tag>
                                                        <img role="button" src={editIcon} alt="edit element" className="WorkspaceSettings-Icon"
                                                            onClick={() => { setTagToEditUuid(`${tag.uuid}`); editTagModalToggler("open"); }} />
                                                        <img role="button" src={trashIcon} alt="delete element" className="WorkspaceSettings-Icon"
                                                            onClick={() => { setTagToDeleteUuid(`${tag.uuid}`); deleteTagModalToggler("open"); }} />
                                                    </li>
                                                ))}
                                            </ul>
                                        )
                                }
                            </div>
                        </section>
                        <hr />
                        <section>
                            <h3>Expense Settings</h3>
                            <br />
                            <div>
                                <h4>Expense category</h4>
                                <p>You can assign a type of expense to each item.</p>
                                <AddButton name="Add Category" className="Common-button-primary" onClickFunction={addExpenseCategoryModalToggler}>
                                    <img src={AddIcon} alt="Add icon" />
                                </AddButton>
                                {
                                    (!selectedWorkspaceExpenseCategories) ?
                                        (<p>You have no category yet.</p>) :
                                        (
                                            <ul className="WorkspaceSettings-List">
                                                {selectedWorkspaceExpenseCategories.map((category, index) => (
                                                    <li className="WorkspaceSettings-ListItem" key={index}>
                                                        <div className="WorkspaceSettings-ListBullet"></div>
                                                        <div>{category.name}</div>
                                                        <img role="button" src={editIcon} alt="edit element" className="WorkspaceSettings-Icon"
                                                            onClick={() => { setExpenseCategoryToEditUuid(`${category.uuid}`); editExpenseCategoryModalToggler("open"); }} />
                                                        <img role="button" src={trashIcon} alt="delete element" className="WorkspaceSettings-Icon"
                                                            onClick={() => { setExpenseCategoryToDeleteUuid(`${category.uuid}`); deleteExpenseCategoryModalToggler("open"); }} />
                                                    </li>
                                                ))}
                                            </ul>
                                        )
                                }

                            </div>
                            <br />
                            <div>
                                <h4>Expenses numbering</h4>
                                <p>Expense numbering format: {currentNumFormatState}</p>
                                <AddButton name="Edit Expense Numbering" className="Common-button-secondary" onClickFunction={expenseNumberingModalToggler}>
                                    <img src={editIcon} alt="edit element" className="WorkspaceSettings-Icon-light" />
                                </AddButton>
                            </div>
                        </section>
                        {/* <hr />
            <section>
                <h3>Income Settings</h3>
                <p>income settings here...</p>
            </section>
            <hr />
            <section>
                <h3>Other Settings</h3>
                <br />
                <h4>Persons</h4>
                <p>If persons in your business collect cash payments or a partner in the company deposits money in the company's bank account you can add 'persons' to track such transactions.</p>
            </section> */}
                    </>
                )
            }
        </section>
    )
}

export default WorkspaceSettings;