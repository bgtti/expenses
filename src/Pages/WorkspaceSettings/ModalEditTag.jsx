import { useState, useEffect, useReducer } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editSelectedWorkspaceTag } from '../../general_redux/Workspace/actions';
import { toast } from 'react-toastify';
import Tag from "../../Components/Tag";
import ModalWrapper from "../../Components/ModalWrapper";
import closeIcon from "../../Assets/Images/close.png" //Source: Close icons created by Pixel perfect - Flaticon, available at https://www.flaticon.com/free-icons/close
import "../../Assets/Styles/Modal.css"

//We are only validating the form for Name, since 'Description' and 'Code' are not required fields
function ModalEditTag(props) {
 const nameFieldReducer = (state, action) => {
  if (action.type === 'USER_INPUT') {
   return { value: action.val, isValid: (action.val && action.val !== "" && action.val.trim().length > 0 && action.val.length < 31 ? true : false) }
  }
  if (action.type === 'INPUT_BLUR') {
   return { value: state.value, isValid: (state.value && state.value !== "" && state.value.trim().length > 0 && state.value.length < 31 ? true : false) }
  }
  if (action.type === 'CLEAR') {
   return { value: '', isValid: null }
  }
  return { value: '', isValid: false };
 };
 const dispatch = useDispatch();
 const styleClasses = props.className;
 const selectedWorkspace = useSelector((state) => state.selectedWorkspace.selectedWorkspace);
 const allTags = useSelector((state) => state.selectedWorkspace.selectedWorkspaceTags);
 const tagUuid = props.uuid;
 const theTag = allTags.find(tag => tag.uuid === tagUuid);
 const [formIsValid, setFormIsValid] = useState(false);
 const [nameFieldState, dispatchNameField] = useReducer(nameFieldReducer, { value: theTag.name, isValid: true });
 const { isValid: nameFieldIsValid } = nameFieldState;
 const [colourFieldState, setColourFieldState] = useState(theTag.colour);

 useEffect(() => {
  setFormIsValid(nameFieldIsValid);
 }, [nameFieldIsValid])

 const nameFieldChangeHandler = (event) => {
  dispatchNameField({ type: 'USER_INPUT', val: event.target.value });
 };
 const validateNameFieldHandler = () => {
  dispatchNameField({ type: 'INPUT_BLUR' });
 };
 const handleColourInput = (e) => {
  setColourFieldState(e.target.value);
 };

 const clearAllFields = () => {
  dispatchNameField({ type: 'CLEAR' });
  setColourFieldState("#595d66");
 };
 function closeThisModal() {
  props.editTagModalToggler("close"); ///PROPS
  setTimeout(() => {
   clearAllFields();
  }, 150);
 };
 const formSubmitHandlerAddTag = (event) => {
  event.preventDefault();
  let nameField = nameFieldState.value.trim();
  let colourField = event.target.addTagColour.value;
  if (!nameField) {
   return toast.error(`Error: name is a required field.`);
  }
  if (nameField.length < 1 || nameField.length > 30) {
   return toast.error(`Error: name invalid. Name should have between 1 and 30 characters.`);
  }

  dispatch(editSelectedWorkspaceTag(theTag.uuid, nameField, colourField));
 };

 return (
  <ModalWrapper className={styleClasses}>
   <form className="Modal-Container" onSubmit={formSubmitHandlerAddTag}>
    <div className="Modal-Heading">
     <h2>Edit Tag</h2>
     <div>
      <img src={closeIcon} alt="close modal" className="Modal-CloseModalIcon" onClick={closeThisModal} />
     </div>
    </div>
    <p className="Modal-SubHeading-Info">Workspace: {selectedWorkspace.abbreviation.toUpperCase()} | {selectedWorkspace.name}</p>
    <div className="Modal-InputContainer">
     <label htmlFor="addTagName">Name*:</label>
     <input value={nameFieldState.value} id="addTagName" name="addTagName" type="colour" minLength="1" maxLength="30"
      className={`${nameFieldState.isValid === false ? 'Modal-InputField-invalid' : ''}`}
      onChange={nameFieldChangeHandler} onBlur={validateNameFieldHandler} />
    </div>
    <div className="Modal-InputContainer">
     <label htmlFor="addTagDescription">Pick a colour:</label>
     <input id="addTagColour" name="addTagColour" value={colourFieldState} onChange={handleColourInput} type="color" className="Modal-InputColorPicker" />
    </div>
    <p>Preview:</p>
    <Tag colour={colourFieldState} name={nameFieldState.value}></Tag>
    <button type="submit" className="Modal-PrimaryBtn" onClick={closeThisModal} disabled={!formIsValid}>Edit tag</button>
   </form>
  </ModalWrapper>
 )
}

export default ModalEditTag;