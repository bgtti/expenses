import "./AddButton.css"

function AddButton(props) {
    const styleClasses = 'AddButton ' + props.className; //modals created with this wrapper can add classes here
    return (
        <button className={styleClasses} onClick={() => { props.onClickFunction() }}
        disabled={(props.disable && props.disable) === true ? true : false}>
            {props.children}
            {props.name}
        </button>
    )
}
export default AddButton

// onClick = {() => { props.onClickFunction(props.btnAction) }}