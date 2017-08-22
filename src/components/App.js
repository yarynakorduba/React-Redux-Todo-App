//composes all together
import React from 'react';
// import Footer from './Footer';
import '../App.css';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
// import AddTodo from '../containers/AddTodo';
// import Button from './Button/Button';
import Header from './Header/Header';
// import VisibleTodoList from '../containers/VisibleTodoList';
// import TodoList from './TodoList';

import { authActions, getAuth } from '../auth'; // !!!!!!!!!!!!!!!!!!!!!!!!!!
import RequireAuthRoute from './require-auth-route';
import RequireUnauthRoute from './require-unauth-route';
import SignInPage from './SignIn/SignInPage';
import TasksPageViews from '../TasksPageViews';



const App = ({authenticated, signOut}) => (
  console.log("Auth " + authenticated),
  <div>
    <Header
      authenticated={authenticated}
      signOut={signOut}/>
  <div>
      <RequireAuthRoute authenticated={authenticated} exact path="/" component={TasksPageViews}/>
      <RequireUnauthRoute authenticated={authenticated} path="/SignIn" component={SignInPage}/>
  </div>

  </div> 


);

App.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  signOut: PropTypes.func.isRequired
};


const mapStateToProps = getAuth;

const mapDispatchToProps = {
  signOut: authActions.signOut
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);

//export default App