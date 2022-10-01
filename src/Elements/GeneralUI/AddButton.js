import "../../Styles/AddButton.css"
function AddButton(props) {
    const styleClasses = 'AddButton ' + props.className; //modals created with this wrapper can add classes here
    return (
        <button className={styleClasses}>
            {props.name}
        </button>
    )
}
export default AddButton