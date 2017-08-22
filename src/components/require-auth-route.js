import React from 'react';
import { Route, Redirect } from 'react-router-dom' //bindings for declarative routing for React

const RequireAuthRoute = ({component: Component, authenticated, ...rest}) => (
  <Route
    {...rest}
    render={props => {
      return authenticated ? (
        <Component authenticated={authenticated} {...props}/> // if authenticated returns normal component
      ) : (
        <Redirect to={{  //else redirects to /sign-in page
          pathname: '/SignIn',
          state: {from: props.location}
        }}/>
      )
    }}
  />
);

export default RequireAuthRoute;