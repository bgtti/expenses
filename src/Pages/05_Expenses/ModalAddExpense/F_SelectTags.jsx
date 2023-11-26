import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Select from 'react-select';
import { PropTypes } from 'prop-types';
import Tag from "../../../Components/Tag";
import "../../../Assets/Styles/Modal.css"

//Search select element built with react-select using name attribute inside label instead of value
const customFilter = (option, rawInput) => {
    const tagLabel = option.label.props?.children[0]?.props.name?.toLowerCase() || '';
    const input = rawInput.toLowerCase();
    const result = tagLabel.includes(input);
    return result;
};

function SelectTags(props) {
    const { setEnteredTags } = props;

    const [selectTagOptions, setSelectTagOptions] = useState(''); //options used by the Select element

    const selectedWorkspaceTags = useSelector((state) => state.selectedWorkspace.selectedWorkspaceTags);

    useEffect(() => {
        if (selectedWorkspaceTags && selectedWorkspaceTags.length !== 0) {
            let tagOptions = selectedWorkspaceTags.map(tag => ({
                value: tag.uuid,
                label: (
                    <div className="Expense-ModalAddExpense-TagDiv">
                        <Tag colour={tag.colour} name={tag.name}></Tag>
                        <br />
                    </div>
                ),
            }));
            setSelectTagOptions(tagOptions);
        }
    }, [selectedWorkspaceTags]);

    function tagChangeHandler(selectedTags) {
        setEnteredTags(selectedTags);
    }

    return (
        <div className="Modal-InputContainer">
            <label htmlFor="tag">Add tags:</label>
            {
                (!selectedWorkspaceTags || selectedWorkspaceTags.length === 0) ?
                    (
                        <select disabled id="tag" name="tag" value="">
                            <option value="">no tags</option>
                        </select>
                    ) :
                    (
                        <Select
                            className="basic-single"
                            classNamePrefix="select Modal-MultiSelect-Select"
                            filterOption={customFilter}
                            id="tag"
                            isClearable={true}
                            isMulti
                            name="tag"
                            onChange={tagChangeHandler}
                            options={selectTagOptions}
                            theme={(theme) => ({
                                ...theme,
                                borderRadius: 0,
                                colors: {
                                    ...theme.colors,
                                    primary25: '#f1f2f7',
                                    primary: 'black',
                                },
                            })}
                        />
                    )
            }
        </div>
    );
}

SelectTags.propTypes = {
    setEnteredTags: PropTypes.func.isRequired
};

export default SelectTags;