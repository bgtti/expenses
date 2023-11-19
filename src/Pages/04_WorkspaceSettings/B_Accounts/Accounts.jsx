import React, { lazy, Suspense, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Loader from "../../../Components/Loader";
import AddButton from "../../../Components/AddButton";
import trashIcon from '../../../Assets/Images/trash.png' // Source: Delete icons created by bqlqn - Flaticon, from https://www.flaticon.com/free-icons/delete
import editIcon from '../../../Assets/Images/editing.png' // Modify icons created by Freepik - Flaticon, from https://www.flaticon.com/free-icons/modify
import AddIcon from "../../../Assets/Images/add.png"; //Source: Plus icons created by dmitri13 - Flaticon, at https://www.flaticon.com/free-icons/plus
import "../../../Assets/Styles/Common.css"

const ModalAddAccount = lazy(() => import("./ModalAddAccount"));
const ModalEditAccount = lazy(() => import("./ModalEditAccount"));
const ModalDeleteAccount = lazy(() => import("./ModalDeleteAccount"));

function Accounts() {

    const selectedWorkspaceAccounts = useSelector((state) => state.selectedWorkspace.selectedWorkspaceAccounts);
    const [modalAddAccountStatus, setModalAddAccountStatus] = useState(false);
    const [modalEditAccountStatus, setModalEditAccountStatus] = useState(false);
    const [modalDeleteAccountStatus, setModalDeleteAccountStatus] = useState(false);
    const [accountToEditUuid, setAccountToEditUuid] = useState("");
    const [accountToDeleteUuid, setAccountToDeleteUuid] = useState("");

    useEffect(() => {
        if (modalEditAccountStatus === false) {
            setAccountToEditUuid("");
        }
    }, [modalEditAccountStatus])

    function addAccountModalToggler(openOrClose) {
        openOrClose === "close" ? setModalAddAccountStatus(false) : setModalAddAccountStatus(true);
    }
    function editAccountModalToggler(openOrClose) {
        openOrClose === "close" ? setModalEditAccountStatus(false) : setModalEditAccountStatus(true);
    }
    function deleteAccountModalToggler(openOrClose) {
        openOrClose === "close" ? setModalDeleteAccountStatus(false) : setModalDeleteAccountStatus(true);
    }

    return (
        <>
            <Suspense fallback={<Loader />}>
                {
                    modalAddAccountStatus && (
                        <ModalAddAccount
                            className={modalAddAccountStatus === false ? "Common-hidden" : ""}
                            addAccountModalToggler={addAccountModalToggler}>
                        </ModalAddAccount>
                    )
                }
                {
                    accountToEditUuid && modalEditAccountStatus && (
                        <ModalEditAccount
                            className={modalEditAccountStatus === false ? "Common-hidden" : ""}
                            editAccountModalToggler={editAccountModalToggler} uuid={accountToEditUuid}>
                        </ModalEditAccount>
                    )
                }
                {
                    accountToDeleteUuid && modalDeleteAccountStatus && (
                        <ModalDeleteAccount
                            className={modalDeleteAccountStatus === false ? "Common-hidden" : ""}
                            deleteAccountModalToggler={deleteAccountModalToggler} uuid={accountToDeleteUuid}>
                        </ModalDeleteAccount>
                    )
                }
            </Suspense>
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
        </>
    )

}
export default Accounts;