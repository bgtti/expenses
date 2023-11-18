import React, { lazy, Suspense, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Loader from "../../Components/Loader";
import Tag from "../../Components/Tag";
// import ModalEditWorkspace from "../User/ModalEditWorkspace/ModalEditWorkspace";
// import ModalAddGroup from "./ModalAddGroup";
// import ModalAddAccount from "./ModalAddAccount";
// import ModalAddTag from "./ModalAddTag";
// import ModalEditTag from "./ModalEditTag";
// import ModalAddExpenseCategory from "./ModalAddExpenseCategory";
// import ModalEditGroup from "./ModalEditGroup";
// import ModalEditAccount from "./ModalEditAccount"
// import ModalEditExpenseCategory from "./ModalEditExpenseCategory";
// import ModalDeleteGroup from "./ModalDeleteGroup";
// import ModalDeleteAccount from "./ModalDeleteAccount";
// import ModalDeleteTag from "./ModalDeleteTag";
// import ModalDeleteExpenseCategory from "./ModalDeleteExpenseCategory";
// import ModalSetExpenseNumbering from "./ModalSetExpenseNumbering";
//import { ExpenseNumberingFormat } from "../../constants/enums";
import AddButton from "../../Components/AddButton";
import trashIcon from '../../Assets/Images/trash.png' // Source: Delete icons created by bqlqn - Flaticon, from https://www.flaticon.com/free-icons/delete
import editIcon from '../../Assets/Images/editing.png' // Modify icons created by Freepik - Flaticon, from https://www.flaticon.com/free-icons/modify
import AddIcon from "../../Assets/Images/add.png"; //Source: Plus icons created by dmitri13 - Flaticon, at https://www.flaticon.com/free-icons/plus
import "../../Assets/Styles/Common.css"

//Lady load modals:
const ModalEditWorkspace = lazy(() => import("../User/ModalEditWorkspace/ModalEditWorkspace"));
const ModalAddGroup = lazy(() => import("./ModalAddGroup"));
const ModalEditGroup = lazy(() => import("./ModalEditGroup"));
const ModalDeleteGroup = lazy(() => import("./ModalDeleteGroup"));
const ModalAddSubgroup = lazy(() => import("./ModalAddSubgroup"));
const ModalAddAccount = lazy(() => import("./ModalAddAccount"));
const ModalEditAccount = lazy(() => import("./ModalEditAccount"));
const ModalDeleteAccount = lazy(() => import("./ModalDeleteAccount"));
const ModalAddTag = lazy(() => import("./ModalAddTag"));
const ModalEditTag = lazy(() => import("./ModalEditTag"));
const ModalDeleteTag = lazy(() => import("./ModalDeleteTag"));
const ModalAddExpenseCategory = lazy(() => import("./ModalAddExpenseCategory"));
const ModalEditExpenseCategory = lazy(() => import("./ModalEditExpenseCategory"));
const ModalDeleteExpenseCategory = lazy(() => import("./ModalDeleteExpenseCategory"));
const ModalSetExpenseNumbering = lazy(() => import("./ModalSetExpenseNumbering"));

//Constants:
const THIS_YEAR = (new Date().getFullYear()).toString();
const THIS_MONTH = (new Date().getMonth() + 1).toString()

//Component:
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
    const [modalAddSubgroupStatus, setModalAddSubgroupStatus] = useState(false);
    const [modalAddAccountStatus, setModalAddAccountStatus] = useState(false);
    const [modalAddTagStatus, setModalAddTagStatus] = useState(false);
    const [modalAddExpenseCategoryStatus, setModalAddExpenseCategoryStatus] = useState(false);
    const [modalEditGroupStatus, setModalEditGroupStatus] = useState(false);
    const [modalEditAccountStatus, setModalEditAccountStatus] = useState(false);
    const [modalEditTagStatus, setModalEditTagStatus] = useState(false);
    const [modalEditExpenseCategoryStatus, setModalEditExpenseCategoryStatus] = useState(false);
    const [modalSetExpenseNumberingStatus, setModalSetExpenseNumberingStatus] = useState(false);
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

    // Togglers for add, edit, and delete modals
    function addGroupModalToggler(openOrClose) {
        openOrClose === "close" ? setModalAddGroupStatus(false) : setModalAddGroupStatus(true);
    }
    function addSubgroupModalToggler(openOrClose) {
        openOrClose === "close" ? setModalAddSubgroupStatus(false) : setModalAddSubgroupStatus(true);
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
                    <Suspense fallback={<Loader />}>
                        {
                            modalEditWorkspaceStatus && (
                                <ModalEditWorkspace
                                    className={modalEditWorkspaceStatus === false ? "Common-hidden" : ""}
                                    editWorkspaceModalToggler={editWorkspaceModalToggler} uuid={selectedWorkspace.uuid}>
                                </ModalEditWorkspace>
                            )
                        }
                        {
                            modalAddGroupStatus && (
                                <ModalAddGroup
                                    className={modalAddGroupStatus === false ? "Common-hidden" : ""}
                                    addGroupModalToggler={addGroupModalToggler}>
                                </ModalAddGroup>
                            )
                        }
                        {
                            modalAddSubgroupStatus && (
                                <ModalAddSubgroup
                                    className={modalAddSubgroupStatus === false ? "Common-hidden" : ""}
                                    addSubgroupModalToggler={addSubgroupModalToggler}>
                                </ModalAddSubgroup>
                            )
                        }
                        {
                            modalAddAccountStatus && (
                                <ModalAddAccount
                                    className={modalAddAccountStatus === false ? "Common-hidden" : ""}
                                    addAccountModalToggler={addAccountModalToggler}>
                                </ModalAddAccount>
                            )
                        }
                        {
                            modalAddTagStatus && (
                                <ModalAddTag
                                    className={modalAddTagStatus === false ? "Common-hidden" : ""}
                                    addTagModalToggler={addTagModalToggler}>
                                </ModalAddTag>
                            )
                        }
                        {
                            modalAddExpenseCategoryStatus && (
                                <ModalAddExpenseCategory className={modalAddExpenseCategoryStatus === false ? "Common-hidden" : ""}
                                    addExpenseCategoryModalToggler={addExpenseCategoryModalToggler}>
                                </ModalAddExpenseCategory>
                            )
                        }
                        {
                            modalSetExpenseNumberingStatus && (
                                <ModalSetExpenseNumbering
                                    className={modalSetExpenseNumberingStatus === false ? "Common-hidden" : ""}
                                    expenseNumberingModalToggler={expenseNumberingModalToggler}>
                                </ModalSetExpenseNumbering>
                            )
                        }
                    </Suspense>
                </>
                )
            }
            {groupToEditUuid &&
                (
                    <Suspense fallback={<Loader />}>
                        {
                            modalEditGroupStatus && (
                                <ModalEditGroup
                                    className={modalEditGroupStatus === false ? "Common-hidden" : ""}
                                    editGroupModalToggler={editGroupModalToggler} uuid={groupToEditUuid}>
                                </ModalEditGroup>
                            )
                        }
                    </Suspense>
                )
            }
            {accountToEditUuid &&
                (
                    <Suspense fallback={<Loader />}>
                        {
                            modalEditAccountStatus && (
                                <ModalEditAccount
                                    className={modalEditAccountStatus === false ? "Common-hidden" : ""}
                                    editAccountModalToggler={editAccountModalToggler} uuid={accountToEditUuid}>
                                </ModalEditAccount>
                            )
                        }
                    </Suspense>
                )
            }
            {tagToEditUuid &&
                (
                    <Suspense fallback={<Loader />}>
                        {
                            modalEditTagStatus && (
                                <ModalEditTag
                                    className={modalEditTagStatus === false ? "Common-hidden" : ""}
                                    editTagModalToggler={editTagModalToggler} uuid={tagToEditUuid}>
                                </ModalEditTag>
                            )
                        }
                    </Suspense>
                )
            }
            {expenseCategoryToEditUuid &&
                (
                    <Suspense fallback={<Loader />}>
                        {
                            modalEditExpenseCategoryStatus && (
                                <ModalEditExpenseCategory
                                    className={modalEditExpenseCategoryStatus === false ? "Common-hidden" : ""}
                                    editExpenseCategoryModalToggler={editExpenseCategoryModalToggler} uuid={expenseCategoryToEditUuid}>
                                </ModalEditExpenseCategory>
                            )
                        }
                    </Suspense>
                )
            }
            {groupToDeleteUuid &&
                (
                    <Suspense fallback={<Loader />}>
                        {
                            modalDeleteGroupStatus && (
                                <ModalDeleteGroup
                                    className={modalDeleteGroupStatus === false ? "Common-hidden" : ""}
                                    deleteGroupModalToggler={deleteGroupModalToggler} uuid={groupToDeleteUuid}>
                                </ModalDeleteGroup>
                            )
                        }
                    </Suspense>
                )
            }
            {accountToDeleteUuid &&
                (
                    <Suspense fallback={<Loader />}>
                        {
                            modalDeleteAccountStatus && (
                                <ModalDeleteAccount
                                    className={modalDeleteAccountStatus === false ? "Common-hidden" : ""}
                                    deleteAccountModalToggler={deleteAccountModalToggler} uuid={accountToDeleteUuid}>
                                </ModalDeleteAccount>
                            )
                        }
                    </Suspense>
                )
            }
            {tagToDeleteUuid &&
                (
                    <Suspense fallback={<Loader />}>
                        {
                            modalDeleteTagStatus && (
                                <ModalDeleteTag
                                    className={modalDeleteTagStatus === false ? "Common-hidden" : ""}
                                    deleteTagModalToggler={deleteTagModalToggler} uuid={tagToDeleteUuid}>
                                </ModalDeleteTag>
                            )
                        }
                    </Suspense>
                )
            }
            {expenseCategoryToDeleteUuid &&
                (
                    <Suspense fallback={<Loader />}>
                        {
                            modalDeleteExpenseCategoryStatus && (
                                <ModalDeleteExpenseCategory
                                    className={modalDeleteExpenseCategoryStatus === false ? "Common-hidden" : ""}
                                    deleteExpenseCategoryModalToggler={deleteExpenseCategoryModalToggler} uuid={expenseCategoryToDeleteUuid}>
                                </ModalDeleteExpenseCategory>
                            )
                        }
                    </Suspense>
                )
            }

            <h2>Workspace Settings</h2>
            {(!selectedWorkspace) ?
                (<section>
                    <h3>Oops, an error occurred.</h3>
                    <p>We could not find your workspace.</p>
                </section>)
                :
                (
                    <>
                        <section>
                            <h3>This Workspace</h3>
                            <table className="Common-InfoTable">
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
                                <img src={editIcon} alt="edit element" className="Common-Icon-light" />
                            </AddButton>
                        </section>
                        <hr />
                        <section>
                            <h3>General Workspace Settings</h3>
                            <div>
                                <h4>Groups</h4>
                                <p>You can group expenses by project, rental property, product, service, or any transactional good your company offers.</p>
                                <AddButton name="Add Group" className="Common-button-primary" onClickFunction={addGroupModalToggler}>
                                    <img src={AddIcon} alt="Add icon" />
                                </AddButton>
                                {
                                    (!selectedWorkspaceGroups || selectedWorkspaceGroups.length === 0) ?
                                        (<p className="Common-PSInfo-P">You have no groups yet.</p>) :
                                        (
                                            <table className="Common-Table ">
                                                <tbody>
                                                    <tr >
                                                        <th>Group</th>
                                                        <th>Description</th>
                                                        <th>Code</th>
                                                    </tr>
                                                    {selectedWorkspaceGroups.map((group, index) => (
                                                        <tr key={index}>
                                                            <td className="Common-Table-tdBullet"><div className="Common-Table-YellowDiv"></div>{group.name}</td>
                                                            <td className={group.description ? "" : "Common-Table-tdInfo"}>
                                                                {group.description ? group.description : "-"}
                                                            </td>
                                                            <td className={group.description ? "" : "Common-Table-tdInfo"}>
                                                                {group.code ? group.code : "-"}
                                                            </td>
                                                            <td className="Common-Table-tdIcon">
                                                                <img role="button" src={editIcon} alt="edit element" className="Common-Icon"
                                                                    onClick={() => { setGroupToEditUuid(`${group.uuid}`); editGroupModalToggler("open"); }} />
                                                            </td>
                                                            <td className="Common-Table-tdIcon">
                                                                <img role="button" src={trashIcon} alt="delete element" className="Common-Icon"
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
                                <h4>Sub-Groups</h4>
                                <p>You can further divide groups into sub-groups.</p>
                                {
                                    (!selectedWorkspaceGroups || selectedWorkspaceGroups.length === 0) ?
                                        (<p className="Common-PSInfo-P">You first need a group to be able to create sub-groups.</p>) :
                                        (
                                            <AddButton name="Add Sub-Group" className="Common-button-primary" onClickFunction={addSubgroupModalToggler}>
                                                <img src={AddIcon} alt="Add icon" />
                                            </AddButton>
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
                                    (!selectedWorkspaceAccounts || selectedWorkspaceAccounts.length === 0) ?
                                        (<p className="Common-PSInfo-P">You have no accounts yet.</p>) :
                                        (
                                            <table className="Common-Table">
                                                <tbody>
                                                    <tr >
                                                        <th>Account</th>
                                                        <th>Description</th>
                                                        <th>Code</th>
                                                    </tr>
                                                    {selectedWorkspaceAccounts.map((account, index) => (
                                                        <tr key={index}>
                                                            <td className="Common-Table-tdBullet"><div className="Common-Table-YellowDiv"></div>{account.name}</td>
                                                            <td className={account.description ? "" : "Common-Table-tdInfo"}>
                                                                {account.description ? account.description : "-"}
                                                            </td>
                                                            <td className={account.description ? "" : "Common-Table-tdInfo"}>
                                                                {account.code ? account.code : "-"}
                                                            </td>
                                                            <td className="Common-Table-tdIcon">
                                                                <img role="button" src={editIcon} alt="edit element" className="Common-Icon"
                                                                    onClick={() => { setAccountToEditUuid(`${account.uuid}`); editAccountModalToggler("open"); }} />
                                                            </td>
                                                            <td className="Common-Table-tdIcon">
                                                                <img role="button" src={trashIcon} alt="delete element" className="Common-Icon"
                                                                    onClick={() => { setAccountToDeleteUuid(`${account.uuid}`); deleteAccountModalToggler("open"); }} />
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
                                <h4>Tags</h4>
                                <p>You can set colourful description tags.</p>
                                <AddButton name="Add Tag" className="Common-button-primary"
                                    onClickFunction={addTagModalToggler}>
                                    <img src={AddIcon} alt="Add icon" />
                                </AddButton>
                                {
                                    (!selectedWorkspaceTags || selectedWorkspaceTags.length === 0) ?
                                        (<p className="Common-PSInfo-P">You have no tags yet.</p>) :
                                        (
                                            <table className="Common-Table ">
                                                <tbody>
                                                    <tr >
                                                        <th>Tag</th>
                                                    </tr>
                                                    {selectedWorkspaceTags.map((tag, index) => (
                                                        <tr key={index}>
                                                            <td className="Common-Table-tdBullet"><div className="Common-Table-YellowDiv"></div><Tag colour={tag.colour} name={tag.name}></Tag></td>
                                                            <td className="Common-Table-tdIcon">
                                                                <img role="button" src={editIcon} alt="edit element" className="Common-Icon"
                                                                    onClick={() => { setTagToEditUuid(`${tag.uuid}`); editTagModalToggler("open"); }} />
                                                            </td>
                                                            <td className="Common-Table-tdIcon">
                                                                <img role="button" src={trashIcon} alt="delete element" className="Common-Icon"
                                                                    onClick={() => { setTagToDeleteUuid(`${tag.uuid}`); deleteTagModalToggler("open"); }} />
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        )
                                }
                            </div>
                        </section>
                        <hr />
                        <section>
                            <h3>Expense Settings</h3>
                            <div>
                                <h4>Expense category</h4>
                                <p>You can assign a type of expense to each item.</p>
                                <AddButton name="Add Category" className="Common-button-primary" onClickFunction={addExpenseCategoryModalToggler}>
                                    <img src={AddIcon} alt="Add icon" />
                                </AddButton>
                                {
                                    (!selectedWorkspaceExpenseCategories || selectedWorkspaceExpenseCategories.length === 0) ?
                                        (<p className="Common-PSInfo-P">You have no category yet.</p>) :
                                        (
                                            <table className="Common-Table ">
                                                <tbody>
                                                    <tr >
                                                        <th>Expense Category</th>
                                                        <th>Description</th>
                                                        <th>Code</th>
                                                    </tr>
                                                    {selectedWorkspaceExpenseCategories.map((category, index) => (
                                                        <tr key={index}>
                                                            <td className="Common-Table-tdBullet"><div className="Common-Table-YellowDiv"></div>{category.name}</td>
                                                            <td className={category.description ? "" : "Common-Table-tdInfo"}>
                                                                {category.description ? category.description : "-"}
                                                            </td>
                                                            <td className={category.description ? "" : "Common-Table-tdInfo"}>
                                                                {category.code ? category.code : "-"}
                                                            </td>
                                                            <td className="Common-Table-tdIcon">
                                                                <img role="button" src={editIcon} alt="edit element" className="Common-Icon"
                                                                    onClick={() => { setExpenseCategoryToEditUuid(`${category.uuid}`); editExpenseCategoryModalToggler("open"); }} />
                                                            </td>
                                                            <td className="Common-Table-tdIcon">
                                                                <img role="button" src={trashIcon} alt="delete element" className="Common-Icon"
                                                                    onClick={() => { setExpenseCategoryToDeleteUuid(`${category.uuid}`); deleteExpenseCategoryModalToggler("open"); }} />
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
                                <h4>Expenses numbering</h4>
                                <p>Current format: {currentNumFormatState}</p>
                                <AddButton name="Edit Expense Numbering" className="Common-button-secondary" onClickFunction={expenseNumberingModalToggler}>
                                    <img src={editIcon} alt="edit element" className="Common-Icon-light" />
                                </AddButton>
                            </div>
                        </section>
                    </>
                )
            }
        </section>
    )
}

export default WorkspaceSettings;