import "./ModalWrapper.css"

function ModalWrapper(props) {
    const styleClasses = 'ModalWrapper ' + props.className; //modals created with this wrapper can add classes here
    return (
        <div className={styleClasses}>
            {props.children}
        </div>
    )
}

export default ModalWrapper;