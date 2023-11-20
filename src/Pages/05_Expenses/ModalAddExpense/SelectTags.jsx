import React, { useEffect, useState, useReducer } from "react";
// import { filterConfigforReactSelectComponent } from "../../utils/helpersSelectElement"
import Tag from "../../../Components/Tag";

import { useSelector } from "react-redux";
import Select, { createFilter } from 'react-select'
import { MultiSelect } from "react-multi-select-component";
import "../../../Assets/Styles/Modal.css"
import { ActionTypes } from "../../../general_redux/types";

//Search select element built with react-select using label instead of value
const filterConfigforReactSelectComponent = createFilter({
    matchFrom: 'any',
    stringify: option => `${option.label}`,
})

function SelectTags() {
    const selectedWorkspaceTags = useSelector((state) => state.selectedWorkspace.selectedWorkspaceTags);
    const [selectTagOptions, setSelectTagOptions] = useState(''); //Tag options to be fed to Select element

    //Show available tags as options in Select element 
    useEffect(() => {
        if (selectedWorkspaceTags && selectedWorkspaceTags.length !== 0) {
            let tagOptions = []
            selectedWorkspaceTags.forEach(tag => {
                let tagObj = {
                    value: tag.uuid,
                    label: <div className="Expense-ModalAddExpense-TagDiv">
                        <Tag colour={tag.colour} name={tag.name}></Tag>
                        <br />
                    </div>
                };
                tagOptions.push(tagObj)
            })
            setSelectTagOptions(tagOptions)
        }
    }, [selectedWorkspaceTags])

    return (
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
                        <Select
                            name="tag"
                            id="tag"
                            className="basic-single"
                            classNamePrefix="select Modal-MultiSelect-Select"
                            isClearable={true}
                            theme={(theme) => ({
                                ...theme,
                                borderRadius: 0,
                                colors: {
                                    ...theme.colors,
                                    primary25: '#f1f2f7',
                                    primary: 'black',
                                },
                            })}
                            filterOption={filterConfigforReactSelectComponent}
                            options={selectTagOptions}
                            isMulti
                        />
                    )
            }
        </div>
    )
}

export default SelectTags