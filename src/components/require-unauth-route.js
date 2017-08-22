import React from 'react';
import { Route, Redirect } from 'react-router-dom' //bindings for declarative routing for React

const RequireUnauthRoute = ({component: Component, authenticated, ...rest}) => (
  <Route
    {...rest}
    render={props => {
      return authenticated ? ( // if was authenticated redirects to the start page
        <Redirect to={{
          pathname: '/',
          state: {from: props.location}
        }}/>
      ) : (
        <Component authenticated={authenticated} {...props}/> // otherwise makes user authentification and returns component
      )
    }}
/>
);

export default RequireUnauthRoute;