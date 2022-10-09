import "../../Styles/AddButton.css"
function AddButton(props) {
    const styleClasses = 'AddButton ' + props.className; //modals created with this wrapper can add classes here
    return (
        <button className={styleClasses} onClick={()=>{props.addExpenseModalToggler("open")}}>
            {props.name}
        </button>
    )
}
export default AddButton