// import APIURL from "../../config/api-url";
// import api from '../../config/axios';
// import { useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { logOut } from "../../general_redux/actions";
// import AddButton from "../../Components/AddButton";
// import editIcon from '../../Assets/Images/editing.png' // Modify icons created by Freepik - Flaticon, from https://www.flaticon.com/free-icons/modify
// import AddIcon from "../../Assets/Images/add.png"; //Source: Plus icons created by dmitri13 - Flaticon, at https://www.flaticon.com/free-icons/plus
// import trashIcon from '../../Assets/Images/trash.png' // Source: Delete icons created by bqlqn - Flaticon, from https://www.flaticon.com/free-icons/delete
import "./WorkSpace.css";
import {useLocation} from 'react-router-dom';
import { useEffect, useState} from "react";


function WorkSpace(props) {
    const location = useLocation();
    const [locationState, setLocationState] = useState({uuid:''}) //from Navbar

    useEffect(()=>{
        if (location.state){
            // let _state=location.state as any; //ADD uuid from first workspace as default to load the route in case location is null
            setLocationState(location.state.uuid)
            // console.log(location)
            // console.log(locationState)
        }
    },[location])
    return (
        <section className={`Workspace Common-padding Common-expand-flex-1 ${props.className}`}>
            <h2>[Work Space Name] Dashboard</h2>
            <p>Workspace with no data show:</p>
            <p>Welcome! You can add expenses to see your data here...</p>
        </section>
        
    )
}

export default WorkSpace;