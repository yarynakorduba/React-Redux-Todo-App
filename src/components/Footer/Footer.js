//footer shows all the possible filter actions

import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';


const Footer = ({filter}) => (
  <p className="task-filters">
    Show:
    {' '}
    <NavLink isActive={() => !filter} to="/">
      All
    </NavLink>
    {', '}
    <NavLink isActive={() => filter='active'} to={{pathname: '/', search: '?filter=active'}}>
      Active
    </NavLink>
    {', '}
    <NavLink isActive={() => filter='completed'} to={{pathname: '/', search: '?filter=completed'}}>
      Completed
    </NavLink>
  </p>
)

Footer.PropTypes = {
  filter: PropTypes.string
};

export default Footer