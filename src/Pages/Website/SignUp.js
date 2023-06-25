import "../../Assets/Styles/Website.css";
function SignUp(props) {
    return (
        <div className={`Website-SignUp Common-padding Common-expand-flex-1 ${props.className}`}>
            <h2>Sign up</h2>
            <form action="" className="Website-SignAndLogForm">
                <div className="Website-SignAndLog-InputContainer">
                    <label htmlFor="signupName">Name:</label>
                    <input id="signupName" name="signupName" type="text" />
                </div>
                <div className="Website-SignAndLog-InputContainer">
                    <label htmlFor="signupEmail">Email:</label>
                    <input id="signupEmail" name="signupEmail" type="email" />
                </div>
                <div className="Website-SignAndLog-InputContainer">
                    <label htmlFor="signupPassword">Password:</label>
                    <input id="signupPassword" name="signupPassword" type="password" />
                </div>
                <div className="Website-SignAndLog-InputContainer">
                    <label htmlFor="signupPasswordRepeat">Repeat password:</label>
                    <input id="signupPasswordRepeat" name="signupPasswordRepeat" type="password" />
                </div>
                <button type="submit" className="Common-button-primary Website-SignAndLog-PrimaryBtn">Sign up</button>
            </form>
        </div>
    )
}
export default SignUp