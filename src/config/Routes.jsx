import { BrowserRouter as Router, Route, Routes as Switch } from 'react-router-dom';
// import { useState, useEffect, useReducer } from "react";
import {useSelector} from "react-redux"
// import { loaderOn, loaderOff } from "../general_redux/Loader/actions";
// import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
// import Main from '../Layouts/Main/Main';
import Loader from "../Components/Loader";
import NavBar from "../Layouts/Nav/NavBar";
import Footer from "../Layouts/Footer/Footer";
import Home from "../Pages/Website/Home"
import LogIn from "../Pages/Website/LogIn"
import SignUp from "../Pages/Website/SignUp"
import Dashboard from '../Pages/User/Dashboard/Dashboard';
import WorkSpace from '../Pages/WorkSpace/WorkSpace';
import Expenses from "../Pages/Expenses/Expenses"
import WorkspaceSettings from "../Pages/WorkspaceSettings/WorkspaceSettings";
import UserSettings from '../Pages/User/UserSettings/UserSettings';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../Assets/Styles/Main.css";
import "../Assets/Styles/Common.css";

const Routes = () =>{
    const loaderDisplay = useSelector((state) => state.loaderDisplay.loaderDisplayed);

    return(
        <Router>
            <div className="Main">
                {loaderDisplay ? <Loader></Loader> : ""}
                <ToastContainer autoClose={6000} theme="dark" toastStyle={{ backgroundColor: "#232F34" }}/>
                <NavBar></NavBar>
                <Switch>
                    <Route exact path="/" element={<Home/>}></Route>
                    <Route exact path="/login" element={<LogIn/>}></Route>
                    <Route exact path="/signup" element={<SignUp/>}></Route>
                    <Route exact path="/workspace" element={<WorkSpace/>}></Route>
                    <Route exact path="/expenses" element={<Expenses/>}></Route>
                    <Route exact path="/workspacesettings" element={<WorkspaceSettings/>}></Route>
                    <Route exact path="/usersettings" element={<UserSettings/>}></Route>
                    <Route exact path="/dashboard" element={<Dashboard/>}></Route>
                </Switch>
                <Footer></Footer>
            </div>
            
        </Router>
    )
}
export default Routes