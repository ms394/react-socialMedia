import React from 'react'
import {createStructuredSelector} from 'reselect'
import { auth } from "../../firebase/firebaseConfig";
import { connect } from "react-redux";
import './header.styles.css'
import { Link } from "react-router-dom";
import {selectCurrentUser} from '../../redux/users/user.selector'

const Header = ({currentUser})=>(
    <header>
        <div className="container">
            <div className="headerContent">
                <div className="logo">
                    <h1>SOCIAL</h1>
                </div>
                <nav>
                    <ul>
                        <li><a href="#">Notification</a></li>
                        <li><a href="#">My Account</a></li>
                        {currentUser ? (
                            <li ><a href="#"onClick={() => auth.signOut()}>Sign Out</a>
                            </li>
                        ) : (
                            <Link className="option" to="/signin">
                            SIGN IN
                            </Link>
                        )}
                    </ul>
                </nav>
            </div>
        </div>
    </header>
)

const mapStateToProps = (state) =>createStructuredSelector({
    currentUser: selectCurrentUser,
  
  });
  
  export default connect(mapStateToProps)(Header);