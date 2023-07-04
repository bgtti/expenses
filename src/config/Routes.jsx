import { BrowserRouter as Router, Route, Routes as Switch } from 'react-router-dom';
// import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
// import Main from '../Layouts/Main/Main';
import NavBar from "../Layouts/Nav/NavBar";
import Footer from "../Layouts/Footer/Footer";
import Home from "../Pages/Website/Home"
import LogIn from "../Pages/Website/LogIn"
import SignUp from "../Pages/Website/SignUp"
import Dashboard from '../Pages/User/Dashboard/Dashboard';
import WorkSpace from '../Pages/WorkSpace/WorkSpace';
import Expenses from "../Pages/Expenses/Expenses"
import Settings from "../Pages/Settings/Settings";
import UserSettings from '../Pages/User/UserSettings/UserSettings';
import "../Assets/Styles/Main.css";
import "../Assets/Styles/Common.css";

const Routes = () =>{
    return(
        <Router>
            <div className="Main">
                <NavBar></NavBar>
                <Switch>
                    <Route exact path="/" element={<Home/>}></Route>
                    <Route exact path="/login" element={<LogIn/>}></Route>
                    <Route exact path="/signup" element={<SignUp/>}></Route>
                    <Route exact path="/workspace" element={<WorkSpace/>}></Route>
                    <Route exact path="/expenses" element={<Expenses/>}></Route>
                    <Route exact path="/settings" element={<Settings/>}></Route>
                    <Route exact path="/usersettings" element={<UserSettings/>}></Route>
                    <Route exact path="/dashboard" element={<Dashboard/>}></Route>
                </Switch>
                <Footer></Footer>
            </div>
            
        </Router>
    )
}
export default Routes