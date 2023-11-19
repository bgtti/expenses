import React, { lazy, Suspense, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Loader from "../../../Components/Loader";
import AddButton from "../../../Components/AddButton";
import Tag from "../../../Components/Tag";
import trashIcon from '../../../Assets/Images/trash.png' // Source: Delete icons created by bqlqn - Flaticon, from https://www.flaticon.com/free-icons/delete
import editIcon from '../../../Assets/Images/editing.png' // Modify icons created by Freepik - Flaticon, from https://www.flaticon.com/free-icons/modify
import AddIcon from "../../../Assets/Images/add.png"; //Source: Plus icons created by dmitri13 - Flaticon, at https://www.flaticon.com/free-icons/plus
import "../../../Assets/Styles/Common.css"

const ModalAddTag = lazy(() => import("./ModalAddTag"));
const ModalEditTag = lazy(() => import("./ModalEditTag"));
const ModalDeleteTag = lazy(() => import("./ModalDeleteTag"));

function Tags() {
    const selectedWorkspaceTags = useSelector((state) => state.selectedWorkspace.selectedWorkspaceTags);

    const [modalAddTagStatus, setModalAddTagStatus] = useState(false);
    const [modalEditTagStatus, setModalEditTagStatus] = useState(false);
    const [modalDeleteTagStatus, setModalDeleteTagStatus] = useState(false);
    const [tagToEditUuid, setTagToEditUuid] = useState("");
    const [tagToDeleteUuid, setTagToDeleteUuid] = useState("");

    useEffect(() => {
        if (modalEditTagStatus === false) {
            setTagToEditUuid("");
        }
    }, [modalEditTagStatus])

    function addTagModalToggler(openOrClose) {
        openOrClose === "close" ? setModalAddTagStatus(false) : setModalAddTagStatus(true);
    }
    function editTagModalToggler(openOrClose) {
        openOrClose === "close" ? setModalEditTagStatus(false) : setModalEditTagStatus(true);
    }
    function deleteTagModalToggler(openOrClose) {
        openOrClose === "close" ? setModalDeleteTagStatus(false) : setModalDeleteTagStatus(true);
    }


    return (
        <>
            <Suspense fallback={<Loader />}>
                {
                    modalAddTagStatus && (
                        <ModalAddTag
                            className={modalAddTagStatus === false ? "Common-hidden" : ""}
                            addTagModalToggler={addTagModalToggler}>
                        </ModalAddTag>
                    )
                }
                {
                    tagToEditUuid && modalEditTagStatus && (
                        <ModalEditTag
                            className={modalEditTagStatus === false ? "Common-hidden" : ""}
                            editTagModalToggler={editTagModalToggler} uuid={tagToEditUuid}>
                        </ModalEditTag>
                    )
                }
                {
                    tagToDeleteUuid && modalDeleteTagStatus && (
                        <ModalDeleteTag
                            className={modalDeleteTagStatus === false ? "Common-hidden" : ""}
                            deleteTagModalToggler={deleteTagModalToggler} uuid={tagToDeleteUuid}>
                        </ModalDeleteTag>
                    )
                }
            </Suspense>
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

        </>
    )

}
export default Tags;