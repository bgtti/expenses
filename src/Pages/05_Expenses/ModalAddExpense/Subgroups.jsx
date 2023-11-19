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
import Groups from "./Groups";

//DELETE FOLLOWING WHEN BACKEND FIXED
const SUBGROUPS = [
    {
        uuid: "123456",
        name: "sub1",
        group_uuid: "652aabfdd8224264a2d2f8c602136918"
    },
    {
        uuid: "234567",
        name: "sub2",
        group_uuid: "652aabfdd8224264a2d2f8c602136918"
    },
    {
        uuid: "345678",
        name: "sub3",
        group_uuid: "652aabfdd8224264a2d2f8c602136918"
    },
    {
        uuid: "456789",
        name: "subX",
        group_uuid: "503664b7625046c29adc27c89d47dbf5"
    }
]

function Subgroup() {
    const selectedSubgroups = SUBGROUPS; //CHANGE LATER

    return (
        <p>subgroups</p>
    )
}

export default Subgroup