import React, { lazy, Suspense, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Loader from "../../../Components/Loader";
import AddButton from "../../../Components/AddButton";
import trashIcon from '../../../Assets/Images/trash.png' // Source: Delete icons created by bqlqn - Flaticon, from https://www.flaticon.com/free-icons/delete
import editIcon from '../../../Assets/Images/editing.png' // Modify icons created by Freepik - Flaticon, from https://www.flaticon.com/free-icons/modify
import AddIcon from "../../../Assets/Images/add.png"; //Source: Plus icons created by dmitri13 - Flaticon, at https://www.flaticon.com/free-icons/plus
import "../../../Assets/Styles/Common.css"

const ModalAddSubgroup = lazy(() => import("./ModalAddSubgroup"));
const ModalEditSubgroup = lazy(() => import("./ModalEditSubgroup"));
const ModalDeleteSubgroup = lazy(() => import("./ModalDeleteSubgroup"));

function Subgroups() {
    const selectedWorkspaceGroups = useSelector((state) => state.selectedWorkspace.selectedWorkspaceGroups);
    const selectedWorkspaceSubgroups = useSelector((state) => state.selectedWorkspace.selectedWorkspaceSubgroups);

    const [modalAddSubgroupStatus, setModalAddSubgroupStatus] = useState(false);
    const [modalEditSubgroupStatus, setModalEditSubgroupStatus] = useState(false);
    const [modalDeleteSubgroupStatus, setModalDeleteSubgroupStatus] = useState(false);
    const [subgroupToEditUuid, setSubgroupToEditUuid] = useState("");
    const [subgroupToDeleteUuid, setSubgroupToDeleteUuid] = useState("");

    useEffect(() => {
        if (modalEditSubgroupStatus === false) {
            setSubgroupToEditUuid("");
        }
    }, [modalEditSubgroupStatus])

    function addSubgroupModalToggler(openOrClose) {
        openOrClose === "close" ? setModalAddSubgroupStatus(false) : setModalAddSubgroupStatus(true);
    }
    function editSubgroupModalToggler(openOrClose) {
        openOrClose === "close" ? setModalEditSubgroupStatus(false) : setModalEditSubgroupStatus(true);
    }
    function deleteSubgroupModalToggler(openOrClose) {
        openOrClose === "close" ? setModalDeleteSubgroupStatus(false) : setModalDeleteSubgroupStatus(true);
    }


    return (
        <>
            <Suspense fallback={<Loader />}>
                {
                    modalAddSubgroupStatus && (
                        <ModalAddSubgroup
                            className={modalAddSubgroupStatus === false ? "Common-hidden" : ""}
                            addSubgroupModalToggler={addSubgroupModalToggler}>
                        </ModalAddSubgroup>
                    )
                }
                {
                    subgroupToEditUuid && modalEditSubgroupStatus && (
                        <ModalEditSubgroup
                            className={modalEditSubgroupStatus === false ? "Common-hidden" : ""}
                            editSubgroupModalToggler={editSubgroupModalToggler} uuid={subgroupToEditUuid}>
                        </ModalEditSubgroup>
                    )
                }
                {
                    subgroupToDeleteUuid && modalDeleteSubgroupStatus && (
                        <ModalDeleteSubgroup
                            className={modalDeleteSubgroupStatus === false ? "Common-hidden" : ""}
                            deleteSubgroupModalToggler={deleteSubgroupModalToggler} uuid={subgroupToDeleteUuid}>
                        </ModalDeleteSubgroup>
                    )
                }
            </Suspense>
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
                {
                    (!selectedWorkspaceSubgroups || selectedWorkspaceSubgroups.length === 0) ?
                        (<p className="Common-PSInfo-P">You have no sub-groups yet.</p>) :
                        (
                            <table className="Common-Table ">
                                <tbody>
                                    <tr >
                                        <th>Group</th>
                                        <th>Sub-group</th>
                                        <th>Description</th>
                                        <th>Code</th>
                                    </tr>
                                    {selectedWorkspaceSubgroups.map((subgroup, index) => (
                                        <tr key={index}>
                                            <td className="Common-Table-tdBullet Common-Table-tdInfo"><div className="Common-Table-YellowDiv"></div>{subgroup.groupName}</td>
                                            <td>{subgroup.name}</td>
                                            <td className={subgroup.description ? "" : "Common-Table-tdInfo"}>
                                                {subgroup.description ? subgroup.description : "-"}
                                            </td>
                                            <td className={subgroup.code ? "" : "Common-Table-tdInfo"}>
                                                {subgroup.code ? subgroup.code : "-"}
                                            </td>
                                            <td className="Common-Table-tdIcon">
                                                <img role="button" src={editIcon} alt="edit element" className="Common-Icon"
                                                    onClick={() => { setSubgroupToEditUuid(`${subgroup.uuid}`); editSubgroupModalToggler("open"); }} />
                                            </td>
                                            <td className="Common-Table-tdIcon">
                                                <img role="button" src={trashIcon} alt="delete element" className="Common-Icon"
                                                    onClick={() => { setSubgroupToDeleteUuid(`${subgroup.uuid}`); deleteSubgroupModalToggler("open"); }} />
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
export default Subgroups;
