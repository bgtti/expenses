import APIURL from "../../config/api-url";
import api from '../../config/axios';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../general_redux/actions";
import AddButton from "../../Components/AddButton";
import trashIcon from '../../Assets/Images/trash.png' // Source: Delete icons created by bqlqn - Flaticon, from https://www.flaticon.com/free-icons/delete
import "../../Assets/Styles/Settings.css";


function UserSettings(props) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const token = useSelector((state) => state.isLoggedIn.token);

    async function handleDeleteAccount() {
        console.log('clicked')
        const config = {
            headers: {
            Authorization: `Bearer ${token}`,
            },
        };

        try {
            // Make the POST request to delete the account. Second argument is set to null since no request data needs to be sent.
            const response = await api.post(APIURL.DELETE_ACCOUNT, null, config);

            if (response.status === 200) {
            // Logout the user if the account deletion is successful
            dispatch(logOut());
            navigate("/signup");
            } else {
            // Handle any errors that occur during the account deletion
            throw new Error("Account deletion failed");
            }
        } catch (error) {
            console.error(error);
            // Display an error message to the user or handle the error in any other way
        }
    }
    return (
        <section className={`Settings Common-padding Common-expand-flex-1 ${props.className}`}>
            <h2>User Settings</h2>
            <hr />
            <section>
                <h3>Account</h3>
                <p><b>Name:</b> user's name</p>
                <p><b>Email:</b> user's email</p>
                <p><b>Access:</b> you have not shared this workspace with anyone</p>
                <AddButton name="Delete Account" className="Common-button-secondary" onClickFunction={handleDeleteAccount}>
                    <img src={trashIcon} alt="delete user" className="Settings-Icon-light" />
                </AddButton>
            </section>
        </section>
    )
}

export default UserSettings;