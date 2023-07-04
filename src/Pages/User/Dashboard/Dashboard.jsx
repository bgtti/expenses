function Dashboard(props) {
    return (
        <div className={`Dashboard Common-padding Common-expand-flex-1 ${props.className}`}>
            <h2>Dashboard</h2>
            <hr />
            <p>display invites if they exist</p>
            <p>if no invites and no dashboard, lead user to create dashboard</p>
            <h3>Work space: XYZ</h3>
            <p>display favorite workspace or any workspace?</p>
            <p>this part still requires planning...</p>
        </div>
    )
}
export default Dashboard