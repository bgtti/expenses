import './App.css';
import Main from './Layouts/Main/Main';
import store from './general_redux/store';
import { Provider } from 'react-redux';
import {BrowserRouter} from 'react-router-dom'
import Routes from './config/Routes';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Provider store={store}>
          <Main>
            <Routes />
          </Main>
        </Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
