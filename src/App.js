import React, { Component } from 'react';
import { Router, Route } from 'react-router-dom';
import ReactGA from 'react-ga';

import './App.css';
import Header from './Components/HeaderBar/HeaderBar';
import HomePage from './Components/HomePage/HomePage';
import FooterBar from './Components/FooterBar/FooterBar';
import Register from './Components/Register/Register';
import RegisterFromInvite from './Components/Register/RegisterFromInvite';
import RegistrationRecieved from './Components/RegistrationRecieved/RegistrationRecieved';
import Login from './Components/Login/Login';
import Verified from './Components/Login/AccountVerified';
import ForgotPassword from './Components/ForgotPassword/ForgotPassword';
import ResetPassword from './Components/ForgotPassword/ResetPassword';
import Dashboard from './Components/Dashboard/Dashboard';
import CreateComp from './Components/CreateComp/CreateComp';
import ManageSubscriptions from './Components/ManageSubscriptions/ManageSubscriptions';
import PrivacyPolicy from './Components/PrivacyPolicy/PrivacyPolicy';
import AddCompByID from './Components/AddCompByID/AddCompByID';
import { MyProvider } from './Components/ContextProvider/ContextProvider';

import createHistory from 'history/createBrowserHistory';

const history = createHistory();
history.listen((location) => {
  ReactGA.set({ page: location.pathname });
  ReactGA.pageview(location.pathname);
});

class App extends Component {
  componentDidMount() {
    ReactGA.pageview(window.location.pathname);
  }

  render() {
    return (
      <Router history={history}>
        <MyProvider>
          <div className="App">
            <Header />
            <Route exact path="/" component={HomePage} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/forgotpassword" component={ForgotPassword} />
            <Route exact path="/resetpassword/:ID/:verificationString" component={ResetPassword} />
            <Route exact path="/verified" component={Verified} />
            <Route exact path="/register/" component={Register} />
            <Route exact path="/registrationrecieved" component={RegistrationRecieved} />
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/createcomp" component={CreateComp} />
            <Route exact path="/joinacompetition/:id" component={RegisterFromInvite} />
            <Route exact path="/privacy" component={PrivacyPolicy} />
            <Route exact path="/managesubscriptions" component={ManageSubscriptions} />
            <Route exact path="/addcompbyid" component={AddCompByID} />
            <FooterBar />
          </div>
        </MyProvider>
      </Router>
    );
  }
}

export default App;
