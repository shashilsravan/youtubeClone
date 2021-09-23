import './App.css';
import {useState} from 'react'
import Header from './components/Header';
import Sidepanel from './components/Sidepanel'
import Homepage from './components/Homepage';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import UploadPage from './components/UploadPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Explore from './components/Explore';
import Signup from './user-management/Signup'
import {AuthProvider} from './user-management/AuthContext'
import Login from './user-management/Login';
import VideoScreen from './components/VideoScreen';
import SearchPage from './components/SearchPage';

function App() {
  const [sidebar, setSidebar] = useState(true)
  const handleSBClick = () => {
      setSidebar(!sidebar)
  }
  return (
    <div className="App">
      <AuthProvider>
        <Header handleSBClick={handleSBClick} />
        <br />
        <Sidepanel sidebar={sidebar} />
        <div className={sidebar ? "body full" : "body half"}>
        <ToastContainer
            position="top-right" autoClose={5000} pauseOnFocusLoss 
            hideProgressBar={false} newestOnTop={false} closeOnClick
            rtl={false} draggable pauseOnHover theme={'colored'} />
            <Router>
                <Switch>
                  <Route path='/' component={Homepage} exact />
                  <Route path='/upload' component={UploadPage} exact />
                  <Route path='/explore' component={Explore} exact />
                  <Route path='/register' component={Signup} exact />
                  <Route path='/login' component={Login} exact />
                  <Route path='/videos/:vstring' component={VideoScreen} exact />
                  <Route path='/search/:val' component={SearchPage} exact />
                </Switch>
            </Router>
        </div>
      </AuthProvider>
    </div>
  );
}

export default App;