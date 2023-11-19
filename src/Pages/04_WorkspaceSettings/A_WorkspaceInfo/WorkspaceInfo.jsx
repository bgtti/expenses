import React, { lazy, Suspense, useState } from "react";
import { useSelector } from "react-redux";
import Loader from "../../../Components/Loader";
import AddButton from "../../../Components/AddButton";
import editIcon from '../../../Assets/Images/editing.png' // Modify icons created by Freepik - Flaticon, from https://www.flaticon.com/free-icons/modify
import "../../../Assets/Styles/Common.css"

function WorkspaceInfo() {
    const ModalEditWorkspace = lazy(() => import("../../02_User/ModalEditWorkspace/ModalEditWorkspace"));

    const selectedWorkspace = useSelector((state) => state.selectedWorkspace.selectedWorkspace);
    const [modalEditWorkspaceStatus, setModalEditWorkspaceStatus] = useState(false);

    function editWorkspaceModalToggler(openOrClose) {
        openOrClose === "close" ? setModalEditWorkspaceStatus(false) : setModalEditWorkspaceStatus(true);
    }

    return (
        <>
            {
                selectedWorkspace.uuid && (
                    <Suspense fallback={<Loader />}>
                        {
                            modalEditWorkspaceStatus && (
                                <ModalEditWorkspace
                                    className={modalEditWorkspaceStatus === false ? "Common-hidden" : ""}
                                    editWorkspaceModalToggler={editWorkspaceModalToggler} uuid={selectedWorkspace.uuid}>
                                </ModalEditWorkspace>
                            )
                        }
                    </Suspense>
                )
            }
            <section>
                <h3>Workspace Information</h3>
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
        </>
    )

}
export default WorkspaceInfo;