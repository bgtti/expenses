import React from "react";
import { useSelector } from "react-redux";
import WorkspaceInfo from "./A_WorkspaceInfo/WorkspaceInfo"
import Accounts from "./B_Accounts/Accounts"
import Groups from "./C_Groups/Groups"
import Subgroups from './D_Subgroups/Subgroups'
import Tags from './E_Tags/Tags'
import ExpenseCategories from './F_ExpenseCategories/ExpenseCategories'
import ExpenseNumbering from './G_ExpenseNumbering/ExpenseNumbering'
import "../../Assets/Styles/Common.css"

function WorkspaceSettings() {
    const selectedWorkspace = useSelector((state) => state.selectedWorkspace.selectedWorkspace);

    return (
        <section className={`WorkspaceSettings Common-padding Common-expand-flex-1`}>
            <h2>Workspace Settings</h2>
            {(!selectedWorkspace) ?
                (<section>
                    <h3>Oops, an error occurred.</h3>
                    <p>We could not find your workspace.</p>
                </section>)
                :
                (
                    <>
                        < WorkspaceInfo />
                        <hr />
                        <section>
                            <h3>General Workspace Settings</h3>
                            <Accounts />
                            <br />
                            <Groups />
                            <br />
                            <Subgroups />
                            <br />
                            <Tags />
                        </section>
                        <hr />
                        <section>
                            <h3>Expense Settings</h3>
                            <ExpenseCategories />
                            <br />
                            <ExpenseNumbering />
                        </section>
                    </>
                )
            }
        </section>
    )
}

export default WorkspaceSettings;