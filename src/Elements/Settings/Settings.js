import "../../Styles/Settings.css";
import trashIcon from '../../Images/trash.png' // Source: Delete icons created by bqlqn - Flaticon, from https://www.flaticon.com/free-icons/delete
import editIcon from '../../Images/editing.png' // Modify icons created by Freepik - Flaticon, from https://www.flaticon.com/free-icons/modify


function Settings(props) {
    const styleClasses = 'Settings ' + props.className;
    return (
        <section className={styleClasses}>
            <h2>Settings</h2>
            <section>
                <h3>Group</h3>
                <p>You can group expenses by assigning them to a group.</p>
                <ul className="Settings-List">
                    <li className="Settings-ListItem">
                        <div className="Settings-ListBullet"></div>
                        <div>Project 1</div>
                        <img role="button" src={editIcon} alt="edit element" className="Settings-Icon" />
                        <img role="button" src={trashIcon} alt="delete element" className="Settings-Icon" />
                    </li>
                    <li className="Settings-ListItem">
                        <div className="Settings-ListBullet"></div>
                        <div>Project 2</div>
                        <img role="button" src={editIcon} alt="edit element" className="Settings-Icon" />
                        <img role="button" src={trashIcon} alt="delete element" className="Settings-Icon" />
                    </li>
                </ul>
            </section>
            <section>
                <h3>Type</h3>
                <p>You can assign a type of expense to each item.</p>
                <ul className="Settings-List">
                    <li className="Settings-ListItem">
                        <div className="Settings-ListBullet"></div>
                        <div>Utilities</div>
                        <img role="button" src={editIcon} alt="edit element" className="Settings-Icon" />
                        <img role="button" src={trashIcon} alt="delete element" className="Settings-Icon" />
                    </li>
                    <li className="Settings-ListItem">
                        <div className="Settings-ListBullet"></div>
                        <div>Marketing</div>
                        <img role="button" src={editIcon} alt="edit element" className="Settings-Icon" />
                        <img role="button" src={trashIcon} alt="delete element" className="Settings-Icon" />
                    </li>
                </ul>
            </section>
        </section>
    )
}

export default Settings;