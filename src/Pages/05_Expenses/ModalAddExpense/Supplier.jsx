import React, { useEffect, useState, useReducer } from "react";
import { useSelector } from "react-redux";
import { toast } from 'react-toastify';
import Select, { createFilter } from 'react-select'
import { MultiSelect } from "react-multi-select-component";
// import { filterConfigforReactSelectComponent } from "../../utils/helpersSelectElement"
import Tag from "../../../Components/Tag";
import ExpensesData from "../../../Data/ExpenseData"
import ModalWrapper from "../../../Components/ModalWrapper";
import closeIcon from "../../../Assets/Images/close.png" //Source: Close icons created by Pixel perfect - Flaticon, available at https://www.flaticon.com/free-icons/close
import AddIcon from "../../../Assets/Images/add.png"; //Source: Plus icons created by dmitri13 - Flaticon, at https://www.flaticon.com/free-icons/plus
import trashIcon from '../../../Assets/Images/trash.png' // Source: Delete icons created by bqlqn - Flaticon, from https://www.flaticon.com/free-icons/delete
import editIcon from '../../../Assets/Images/editing.png' // Modify icons created by Freepik - Flaticon, from https://www.flaticon.com/free-icons/modify
import "../../../Assets/Styles/Modal.css"
import { ActionTypes } from "../../../general_redux/types";
import CreatableSelect from 'react-select/creatable';

//Search select element built with react-select using label instead of value
const filterConfigforReactSelectComponent = createFilter({
    matchFrom: 'any',
    stringify: option => `${option.label}`,
})

function supplierDataReducer(state, action) {
    //WRITE LOGIC FOR supplier data here ---CONSIDER MAKING SEPARATE COMPONENT
}

const SUPPLIERS = [
    {
        uuid: "987654",
        name: "John",
        common_description: "Rent"
    },
    {
        uuid: "876543",
        name: "Laugh & co.",
        common_description: "Mask supplies"
    },
    {
        uuid: "765432",
        name: "MGM",
        common_description: ""
    }
]

function Supplier() {
    const selectedSuppliers = SUPPLIERS; //CHANGE LATER
    const [selectSupplierOptions, setSelectSupplierOptions] = useState(''); //Supplier options to be fed to Select element
    const [supplierSelection, setSupplierSelection] = useState('');//selected from select element
    const [supplierData, dispatchSupplierData] = useReducer(supplierDataReducer, {
        supplierSelected: false,
        suppliersUuid: '',
        isNewSupplier: false,
        isOneTimeSupplier: false,
        suppliersName: ''
    });
    //Show available suppliers as options in Select element 
    useEffect(() => {
        if (selectedSuppliers && selectedSuppliers.length !== 0) {
            let supplierOptions = [{
                value: "newSupplier",
                label: "New supplier"
            },
            {
                value: "oneTimeSupplier",
                label: "One-time supplier"
            }]
            selectedSuppliers.forEach(supplier => {
                let supplierObj = {
                    value: supplier.uuid,
                    label: supplier.name
                };
                supplierOptions.push(supplierObj)
            })
            setSelectSupplierOptions(supplierOptions)
        }
    }, [selectedSuppliers])

    //https://react-select.com/props#creatable-props
    //https://stackoverflow.com/questions/63652644/hide-remove-create-new-menu-in-react-select

    return (
        <div className="Modal-InputContainer">
            <label htmlFor="supplier">Paid to:</label>
            <CreatableSelect
                name="supplier"
                id="supplier"
                classNamePrefix="select Modal-MultiSelect-Select"
                components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}
                noOptionsMessage={() => null}
                isValidNewOption={() => true}
                promptTextCreator={() => false}
                // formatCreateLabel={() => undefined}
                placeholder=""
                isClearable
                options={selectSupplierOptions}
                filterOption={filterConfigforReactSelectComponent} />
            {/* <Select
                name="supplier"
                id="supplier"
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
                options={selectSupplierOptions}
                filterOption={filterConfigforReactSelectComponent} /> */}
        </div>
    )
}

export default Supplier