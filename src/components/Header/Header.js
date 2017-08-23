import React from 'react';
import PropTypes from 'prop-types';
import Button from '../Button/Button';
import MaterialIcon from 'react-google-material-icons'
import './Header.css';



const Header = ({authenticated, signOut}) => ( //required types in braces
  <header id="header" className="header">
    <div className="g-row">
      <div className="g-col">
        <h1 className="header__title">Todo React Redux</h1></div>

        <div className="header__actions">
          {authenticated ? <div><Button className="signOut" onClick={signOut}>
          <MaterialIcon className="exit-icon" icon="exit_to_app" size={25}/>
          </Button></div> : 
          <div className="log__message"></div>}
        </div>
      
    </div>
  </header>
);

Header.propTypes = {  //checking types with prop-types 
  authenticated: PropTypes.bool.isRequired,
  signOut: PropTypes.func.isRequired
};



export default Header; //export to avoid using curly braces