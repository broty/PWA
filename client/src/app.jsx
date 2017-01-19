import React from 'react';
import Router, {Route} from 'react-router';
import AuthenticatedApp from './components/AuthenticatedApp'
import Login from './components/Login';
import Signup from './components/Signup';
import Home from './components/Home';
import RouterContainer from './services/RouterContainer';
import LoginActions from './actions/LoginActions';
import Topic from './components/Topic';

//
import Forum from './components/Forum';

var routes = (
  <Route handler={AuthenticatedApp}>
    <Route name="login" handler={Login}/>
    <Route name="signup" handler={Signup}/>
    <Route name="home" path="/" handler={Home}/>
    //
    <Route name="forum" handler={Forum}/>
    <Route name="topic" path="/topic/:id" handler={Topic}/>

  </Route>
);

var router = Router.create({routes});
RouterContainer.set(router);

let jwt = localStorage.getItem('jwt');
if (jwt) {
  LoginActions.loginUser(jwt);
}

router.run(function (Handler) {
  React.render(<Handler />, document.getElementById('content'));
});
