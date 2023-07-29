// import APIURL from "../../config/api-url";
// import api from '../../config/axios';
// import { useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { logOut } from "../../general_redux/actions";
// import AddButton from "../../Components/AddButton";
// import editIcon from '../../Assets/Images/editing.png' // Modify icons created by Freepik - Flaticon, from https://www.flaticon.com/free-icons/modify
// import AddIcon from "../../Assets/Images/add.png"; //Source: Plus icons created by dmitri13 - Flaticon, at https://www.flaticon.com/free-icons/plus
// import trashIcon from '../../Assets/Images/trash.png' // Source: Delete icons created by bqlqn - Flaticon, from https://www.flaticon.com/free-icons/delete
import "../../Assets/Styles/Settings.css";


function WorkSpace(props) {
    return (
        <section className={`Settings Common-padding Common-expand-flex-1 ${props.className}`}>
            <h2>[Work Space Name] Dashboard</h2>
            <p>Workspace with no data show:</p>
            <p>Welcome! You can add expenses to see your data here...</p>
        </section>
        
    )
}

export default WorkSpace;