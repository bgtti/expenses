import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from 'react-toastify';
import { logOut } from "../../../general_redux/SignAndLogIn/actions";
import { loaderOff, loaderOn } from "../../../general_redux/Loader/actions";
import APIURL from "../../../config/api-url";
import api from '../../../config/axios';
import ModalWrapper from "../../../Components/ModalWrapper";
import closeIcon from "../../../Assets/Images/close.png" //Source: Close icons created by Pixel perfect - Flaticon, available at https://www.flaticon.com/free-icons/close
import "../../../Assets/Styles/Modal.css"
import "../User.css"

function ModalDeleteUserAccount(props) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const token = useSelector((state) => state.isLoggedIn.token);
    const styleClasses = 'ModalDeleteUserAccount ' + props.className;

    function closeThisModal() {
        props.deleteAccountModalToggler("close");
    }

    async function handleDeleteAccount(event) {
        event.preventDefault();
        dispatch(loaderOn())

        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        try {
            // Make the POST request to delete the account. Second argument is set to null since no request data needs to be sent.
            const response = await api.post(APIURL.DELETE_USER_ACCOUNT, null, config);

            if (response.status === 200) {
                // Logout the user if the account deletion is successful
                dispatch(logOut());
                navigate("/signup");
                toast.success(`Account deleted successfully!`);
            } else {
                // Handle any errors that occur during the account deletion
                dispatch(loaderOff())
                toast.error(`Error: not able to delete account.`);
                throw new Error("Account deletion failed");
            }
        } catch (error) {
            // Display an error message to the user
            dispatch(loaderOff())
            toast.error(`Error: not able to delete account. ${error}`);
        }
    }

    return (
        <ModalWrapper className={styleClasses}>
            <form className="Modal-Container">
                <div className="Modal-Heading">
                    <h2>Account Deletion</h2>
                    <div>
                        <img src={closeIcon} alt="close modal" className="Modal-CloseModalIcon" onClick={closeThisModal} />
                    </div>
                </div>
                <p><b>Are you sure you want to delete your account?</b></p>
                <p>Deleting your account will delete all information and workspaces you own.</p>
                <p>Consider transfering ownership of workspaces before account deletion.</p>
                <p><b>This action cannot be undone.</b></p>
                <button type="submit" className="Modal-PrimaryBtn Modal-DangerBtn" onClick={handleDeleteAccount}>Delete account</button>
            </form>
        </ModalWrapper>
    )
}

export default ModalDeleteUserAccount;