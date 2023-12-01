import React from "react";
import { PropTypes } from "prop-types";


function DefineNote(props) {
    const { note, setNote } = props;

    function defineNoteSelectedHandler(event) {
        setNote({
            hasNote: event.target.checked,
            note: "",
        })
    }
    function defineNoteHandler(event) {
        setNote(prevState => ({
            ...prevState,
            note: event.target.value
        }))
    }

    return (
        <div>
            <div className="Modal-CheckboxContainer">
                <input type="checkbox" id="selectNote" name="selectNote" value="selectNote" onChange={defineNoteSelectedHandler} />
                <label htmlFor="selectNote">Add a note</label>
            </div>
            {
                note.hasNote && (
                    <div className="Modal-DropdownContainerForFurtherInput">
                        <div className="Modal-InputContainer-Dropdown">
                            <label htmlFor="note">Note:</label>
                            <input type="text" id="note" name="note" value={note.note} onChange={defineNoteHandler} minLength="1" maxLength="100" />
                        </div>
                    </div>
                )
            }
        </div>
    )
};

DefineNote.propTypes = {
    note: PropTypes.object.isRequired,
    setNote: PropTypes.func.isRequired,
};

export default DefineNote;