import { BrowserRouter as Router, Route} from 'react-router-dom';
// import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
// import Main from '../Layouts/Main/Main';
import Home from "../Pages/Website/Home"
import LogIn from "../Pages/Website/LogIn"
import SignUp from "../Pages/Website/SignUp"
import Expenses from "../Pages/Expenses/Expenses"
import Settings from "../Pages/Settings/Settings";

const Routes = () =>{
    return(
        <Router>
            {/* <Route exact path="/" component={Main}></Route> */}
            <Route exact path="/" component={Home}></Route>
            <Route exact path="/login" component={LogIn}></Route>
            <Route exact path="/signup" component={SignUp}></Route>
            <Route exact path="/expenses" component={Expenses}></Route>
            <Route exact path="/settings" component={Settings}></Route>
        </Router>
    )
}
export default Routes