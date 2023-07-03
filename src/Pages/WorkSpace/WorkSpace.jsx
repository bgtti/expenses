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
            <h2>Work Space</h2>
            <p>Actially this area should disappear. The user can make changes to this workspace in settings....</p>
            <p>Makes no sense to keet this. Clicking on 'Workspace' should bring the user to the area of the workspace in question</p>
        </section>
        
    )
}

export default WorkSpace;