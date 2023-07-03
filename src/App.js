import './App.css';
import store from './general_redux/store';
import { Provider } from 'react-redux';
import Routes from './config/Routes';


function App() {
  return (
    <div className="App">
        <Provider store={store}>
          <Routes />
        </Provider>
    </div>
  );
}

export default App;
