import React, { lazy, Suspense, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Loader from "../../../Components/Loader";
import AddButton from "../../../Components/AddButton";
import trashIcon from '../../../Assets/Images/trash.png' // Source: Delete icons created by bqlqn - Flaticon, from https://www.flaticon.com/free-icons/delete
import editIcon from '../../../Assets/Images/editing.png' // Modify icons created by Freepik - Flaticon, from https://www.flaticon.com/free-icons/modify
import AddIcon from "../../../Assets/Images/add.png"; //Source: Plus icons created by dmitri13 - Flaticon, at https://www.flaticon.com/free-icons/plus
import "../../../Assets/Styles/Common.css"

const ModalAddGroup = lazy(() => import("./ModalAddGroup"));
const ModalEditGroup = lazy(() => import("./ModalEditGroup"));
const ModalDeleteGroup = lazy(() => import("./ModalDeleteGroup"));

function Groups() {
    const selectedWorkspaceGroups = useSelector((state) => state.selectedWorkspace.selectedWorkspaceGroups);
    const [modalAddGroupStatus, setModalAddGroupStatus] = useState(false);
    const [modalEditGroupStatus, setModalEditGroupStatus] = useState(false);
    const [modalDeleteGroupStatus, setModalDeleteGroupStatus] = useState(false);
    const [groupToEditUuid, setGroupToEditUuid] = useState("");
    const [groupToDeleteUuid, setGroupToDeleteUuid] = useState("");

    useEffect(() => {
        if (modalEditGroupStatus === false) {
            setGroupToEditUuid("");
        }
    }, [modalEditGroupStatus])

    function addGroupModalToggler(openOrClose) {
        openOrClose === "close" ? setModalAddGroupStatus(false) : setModalAddGroupStatus(true);
    }
    function editGroupModalToggler(openOrClose) {
        openOrClose === "close" ? setModalEditGroupStatus(false) : setModalEditGroupStatus(true);
    }
    function deleteGroupModalToggler(openOrClose) {
        openOrClose === "close" ? setModalDeleteGroupStatus(false) : setModalDeleteGroupStatus(true);
    }


    return (
        <>
            <Suspense fallback={<Loader />}>
                {
                    modalAddGroupStatus && (
                        <ModalAddGroup
                            className={modalAddGroupStatus === false ? "Common-hidden" : ""}
                            addGroupModalToggler={addGroupModalToggler}>
                        </ModalAddGroup>
                    )
                }
                {
                    groupToEditUuid && modalEditGroupStatus && (
                        <ModalEditGroup
                            className={modalEditGroupStatus === false ? "Common-hidden" : ""}
                            editGroupModalToggler={editGroupModalToggler} uuid={groupToEditUuid}>
                        </ModalEditGroup>
                    )
                }
                {
                    groupToDeleteUuid && modalDeleteGroupStatus && (
                        <ModalDeleteGroup
                            className={modalDeleteGroupStatus === false ? "Common-hidden" : ""}
                            deleteGroupModalToggler={deleteGroupModalToggler} uuid={groupToDeleteUuid}>
                        </ModalDeleteGroup>
                    )
                }
            </Suspense>
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
                                            <td className={group.code ? "" : "Common-Table-tdInfo"}>
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
        </>
    )

}
export default Groups;