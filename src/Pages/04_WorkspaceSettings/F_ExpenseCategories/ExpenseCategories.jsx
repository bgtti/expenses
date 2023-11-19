import React, { lazy, Suspense, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Loader from "../../../Components/Loader";
import AddButton from "../../../Components/AddButton";
import trashIcon from '../../../Assets/Images/trash.png' // Source: Delete icons created by bqlqn - Flaticon, from https://www.flaticon.com/free-icons/delete
import editIcon from '../../../Assets/Images/editing.png' // Modify icons created by Freepik - Flaticon, from https://www.flaticon.com/free-icons/modify
import AddIcon from "../../../Assets/Images/add.png"; //Source: Plus icons created by dmitri13 - Flaticon, at https://www.flaticon.com/free-icons/plus
import "../../../Assets/Styles/Common.css"

const ModalAddExpenseCategory = lazy(() => import("./ModalAddExpenseCategory"));
const ModalEditExpenseCategory = lazy(() => import("./ModalEditExpenseCategory"));
const ModalDeleteExpenseCategory = lazy(() => import("./ModalDeleteExpenseCategory"));

function ExpenseCategories() {
    const selectedWorkspaceExpenseCategories = useSelector((state) => state.selectedWorkspace.selectedWorkspaceExpenseCategories);
    const [modalAddExpenseCategoryStatus, setModalAddExpenseCategoryStatus] = useState(false);
    const [modalEditExpenseCategoryStatus, setModalEditExpenseCategoryStatus] = useState(false);
    const [modalDeleteExpenseCategoryStatus, setModalDeleteExpenseCategoryStatus] = useState(false);
    const [expenseCategoryToEditUuid, setExpenseCategoryToEditUuid] = useState("");
    const [expenseCategoryToDeleteUuid, setExpenseCategoryToDeleteUuid] = useState("");

    useEffect(() => {
        if (modalEditExpenseCategoryStatus === false) {
            setExpenseCategoryToEditUuid("");
        }
    }, [modalEditExpenseCategoryStatus])

    function addExpenseCategoryModalToggler(openOrClose) {
        openOrClose === "close" ? setModalAddExpenseCategoryStatus(false) : setModalAddExpenseCategoryStatus(true);
    }
    function editExpenseCategoryModalToggler(openOrClose) {
        openOrClose === "close" ? setModalEditExpenseCategoryStatus(false) : setModalEditExpenseCategoryStatus(true);
    }
    function deleteExpenseCategoryModalToggler(openOrClose) {
        openOrClose === "close" ? setModalDeleteExpenseCategoryStatus(false) : setModalDeleteExpenseCategoryStatus(true);
    }


    return (
        <>
            <Suspense fallback={<Loader />}>
                {
                    modalAddExpenseCategoryStatus && (
                        <ModalAddExpenseCategory className={modalAddExpenseCategoryStatus === false ? "Common-hidden" : ""}
                            addExpenseCategoryModalToggler={addExpenseCategoryModalToggler}>
                        </ModalAddExpenseCategory>
                    )
                }
                {
                    expenseCategoryToEditUuid && modalEditExpenseCategoryStatus && (
                        <ModalEditExpenseCategory
                            className={modalEditExpenseCategoryStatus === false ? "Common-hidden" : ""}
                            editExpenseCategoryModalToggler={editExpenseCategoryModalToggler} uuid={expenseCategoryToEditUuid}>
                        </ModalEditExpenseCategory>
                    )
                }
                {
                    expenseCategoryToDeleteUuid && modalDeleteExpenseCategoryStatus && (
                        <ModalDeleteExpenseCategory
                            className={modalDeleteExpenseCategoryStatus === false ? "Common-hidden" : ""}
                            deleteExpenseCategoryModalToggler={deleteExpenseCategoryModalToggler} uuid={expenseCategoryToDeleteUuid}>
                        </ModalDeleteExpenseCategory>
                    )
                }
            </Suspense>
            <div>
                <h4>Expense categories</h4>
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
                                        <th>Expense Categories</th>
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
        </>
    )

}
export default ExpenseCategories;